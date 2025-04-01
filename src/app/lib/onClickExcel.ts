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
    if (type === 'policy' || type === 'month') {
        columns.forEach((col, index) => {
            if (index === 0) {
                lastRow[col.title] = '합계';
            } else if (totals[col.title] !== undefined) {
                console.log(col.title)
                console.log(totals[col.title]);
                lastRow[col.title] = totals[col.title].toLocaleString(); // 숫자 포맷 적용
            } else {
                lastRow[col.title] = '';
            }
        });
    } else if (type === 'accident') {
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
        if (!data || data.length === 0) {
            alert("데이터가 없습니다.");
            return;
        }

        let totals: Record<string, number> = {}; // 합계 저장 객체
        const formattedData = data.map((row, index) => {
            const newRow: Record<string, any> = {};
            columns.forEach((col) => {
                let value: any = row[col.col] || 0;

                // 숫자 변환 처리
                if (col.col === 'total' || col.col === 'closingAmt') {
                    value = parseNumericValue(row.total);
                } else if (typeof value === 'string') {
                    value = parseNumericValue(value);
                }

                // 개별 컬럼 로직 처리
                if (col.col === 'row') {
                    newRow[col.title] = index + 1; // 순번 자동 추가
                } else if (col.col === 'reqestDate') {
                    newRow['연도'] = row.reqestDate ? dayjs(row.reqestDate).format('YYYY') : '';
                    newRow['접수 월'] = row.reqestDate ? dayjs(row.reqestDate).format('MM') : '';
                } else if (col.col === 'changeDay') {
                    newRow['연도'] = row.changeDay ? dayjs(row.changeDay).format('YYYY') : '';
                    newRow['월'] = row.changeDay ? dayjs(row.changeDay).format('MM') : '';
                } else if (col.col === 'insuTerm') {
                    newRow['보험기간'] = `${row.sDay || ''}~${row.eDay || ''}`;
                } else if (col.col === 'total') {
                    newRow['총 보험료'] = value.toLocaleString();
                } else if (col.col === 'closingAmt') {
                    newRow['지급 보험금(추산+종결)'] = value.toLocaleString();
                    if (!isNaN(value)) {
                        totals['지급 보험금(추산+종결)'] = (totals['지급 보험금(추산+종결)'] || 0) + value;
                    }
                }else if (col.col === 'clrc') {
                    newRow['보험금 + 손조비용'] = value.toLocaleString();
                    if (!isNaN(value)) {
                        totals['보험금 + 손조비용'] = (totals['지급 보험금(추산+종결)'] + totals['손조비용'] || 0) + value;
                    }
                } else {
                    newRow[col.title] = row[col.col] || '';
                    if (type === 'policy' && !isNaN(value)) {
                        totals[col.title] = (totals[col.title] || 0) + value;
                    }
                }
            });

            return newRow;
        });
        console.log(totals);

        // 보험금 총합 계산
        const totalInsuranceAmount = formattedData.reduce(
            (sum, row) => sum + parseNumericValue(row['보험금']),
            0
        );

        // 마지막 행(합계) 추가
        const lastRow = createLastRow(columns, totals, type, totalInsuranceAmount);
        formattedData.push(lastRow);

        // 엑셀 데이터 변환
        const worksheet = XLSX.utils.json_to_sheet(formattedData);

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
        //XLSX.writeFile(workbook, fileName);
    } catch (error) {
        console.error('엑셀 파일 생성 중 에러 발생:', error);
        alert('파일 생성에 실패했습니다.');
    }
};