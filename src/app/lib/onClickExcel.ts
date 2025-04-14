import * as XLSX from 'xlsx';
import dayjs from 'dayjs';

// 숫자 값을 파싱하는 유틸리티 함수
const parseNumericValue = (value: any): number => {
    if (typeof value === 'string') {
        return parseFloat(value.replace(/,/g, '')) || 0;
    } else if (typeof value !== 'number') {
        return 0;
    }
    return value;
};

// 마지막 행(합계) 생성 함수
const createLastRow = (columns: any[], totals: Record<string, number>, type: string, totalInsuranceAmount: number) => {
    const lastRow: Record<string, string> = {};
    if (type === 'policy' || 'month') {
        columns.forEach((col, index) => {
            if (index === 0) {
                lastRow[col.title] = '합계';
            } else if (totals[col.title] !== undefined) {
                lastRow[col.title] = totals[col.title].toLocaleString(); // 숫자 포맷 적용
            } else {
                lastRow[col.title] = '';
            }
        });
    }



    if (type === 'accident') {
        columns.forEach((col) => {
            if (col.col === 'row') {
                lastRow[col.title] = '합계';
            } else if (col.col === 'total') {
                lastRow[col.title] = totalInsuranceAmount.toLocaleString(); // 보험금 총합
            } else {
                lastRow[col.title] = '';
            }
        });
    }
    return lastRow;
};

// 엑셀 파일 생성 함수
export const onClickExcel = (columns: any[], type: string, data: any[], fileName: string) => {
    try {
        console.log(data)
        if (!data || data.length === 0) {
            alert("데이터가 없습니다.");
            return;
        }
        let totalInsuranceAmount = 0;
        let totals: Record<string, number> = {}; // 합계 저장 객체
        const formattedData = data.map((row, index) => {
            let calcValue = 0;
            const newRow: Record<string, any> = {};
            columns.forEach((col) => {
                let value: any = row[col.col] || 0;
                // 숫자 변환 처리
                if (col.col === 'total' || col.col === 'closingAmt' || col.col === 'repairCost') {
                    value = parseNumericValue(row[col.col]);
                } else if (typeof value === 'string') {
                    value = parseNumericValue(value);
                }

                // 개별 컬럼 로직 처리
                if (col.col === 'row') {
                    newRow[col.title] = index + 1; // 순번 자동 추가
                } else if (col.col === 'year') {
                    newRow['연도'] = row.requestDate ? dayjs(row.requestDate).format('YYYY') : '';
                } else if (col.col === 'month') {
                    newRow['접수 월'] = row.requestDate ? dayjs(row.requestDate).format('MM') : '';
                }else if (col.col === 'changeDay') {
                    newRow['연도'] = row.changeDay ? dayjs(row.changeDay).format('YYYY') : '';
                    newRow['월'] = row.changeDay ? dayjs(row.changeDay).format('MM') : '';
                } else if (col.col === 'insuTerm') {
                    newRow['보험기간'] = `${row.sDay || ''}~${row.eDay || ''}`;
                } else if (col.col === 'total') {
                    if(type === 'month') {
                        newRow['지급 보험금(추산+종결)'] = value.toLocaleString();
                        if (!isNaN(value)) {
                            totals['지급 보험금(추산+종결)'] = (totals['지급 보험금(추산+종결)'] || 0) + value;
                        }
                    }else {
                        newRow['보험금'] = value.toLocaleString();
                        totalInsuranceAmount += value;
                    }
                } else if (col.col === 'closingAmt') {
                    newRow['지급 보험금(추산+종결)'] = value.toLocaleString();
                    calcValue += value
                    if (!isNaN(value)) {
                        totals['지급 보험금(추산+종결)'] = (totals['지급 보험금(추산+종결)'] || 0) + value;
                    }
                } else if (col.col === 'repairCost') {
                    newRow['손조비용'] = value.toLocaleString();
                    calcValue += value
                    if (!isNaN(value)) {
                        totals['손조비용'] = (totals['손조비용'] || 0) + value;
                    }
                }else if (col.col === 'clrc') {
                    newRow['보험금 + 손조비용'] = calcValue.toLocaleString() || 0;

                    if (!isNaN(value)) {
                        totals['보험금 + 손조비용'] = (totals['보험금 + 손조비용'] || 0) + calcValue;
                    }

                } else {
                    newRow[col.title] = row[col.col] || '-';
                    if ((type === 'policy' || type === 'month') && !isNaN(value)) {
                        totals[col.title] = (totals[col.title] || 0) + value;
                    }
                }
            });

            return newRow;
        });

        if(type !== 'parking'){
            // 마지막 행(합계) 추가
            const lastRow = createLastRow(columns, totals, type, totalInsuranceAmount);
            formattedData.push(lastRow);
        }

        // 엑셀 데이터 변환
        const worksheet = XLSX.utils.json_to_sheet(formattedData);

        // 각 열의 최대 문자열 길이에 따라 열 너비 설정
        const calculateColumnWidths = (data: any[], columns: any[]) => {
            const widths = columns.map((col) => {
                const titleLength = col.title.length; // 컬럼 제목 길이
                const maxContentLength = data
                    .map((row) => (row[col.title] ? row[col.title].toString().length : 0)) // 각 열의 데이터 길이 계산
                    .reduce((max, curr) => Math.max(max, curr), 0);

                // 문자열 길이에 가중치(1.5) 적용 후, 추가 여백 5를 더함
                return Math.ceil(Math.max(titleLength, maxContentLength) * 1.5) + 5;
            });

            return widths.map((wch) => ({ wch })); // 열 너비의 형식으로 반환
        };

        worksheet['!cols'] = calculateColumnWidths(formattedData, columns); // 열 너비 설정

        // 첫 행의 스타일 설정
        const range = XLSX.utils.decode_range(worksheet['!ref']!);
        for (let C = range.s.c; C <= range.e.c; ++C) {
            const cellAddress = XLSX.utils.encode_cell({ r: 0, c: C });
            if (worksheet[cellAddress]) {
                worksheet[cellAddress].s = { alignment: { horizontal: 'center' } };
            }
        }

        worksheet['!merges'] = worksheet['!merges'] || [];
        if (type === 'accident') {
            worksheet['!merges'].push({ s: { r: formattedData.length , c: 0 }, e: { r: formattedData.length , c: 8 } });
        } else if (type === 'policy' || type === 'month') {
            worksheet['!merges'].push({
                s: { r: formattedData.length, c: 0 },
                e: { r: formattedData.length, c: 1 },
            });
        }

        // 엑셀 파일 생성 및 다운로드
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        XLSX.writeFile(workbook, fileName);
    } catch (error) {
        console.error('엑셀 파일 생성 중 에러 발생:', error);
        alert('파일 생성에 실패했습니다.');
    }
};