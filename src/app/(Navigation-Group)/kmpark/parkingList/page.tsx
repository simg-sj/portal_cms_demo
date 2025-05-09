"use client"
import React, {useEffect, useRef, useState} from "react";
import DayTerm from "@/app/components/common/ui/calender/dayTerm";
import Button from "@/app/components/common/ui/button/button";
import Image from "next/image";
import Excel from "@/assets/images/icon/excel-icon.png";
import Plus from "@/assets/images/icon/plus-icon.png";
import ExcelUpload from "@/assets/images/icon/upload-white-icon.png";
import SlidePopup from "@/app/components/popup/SlidePopup";
import List from "@/app/components/pageComponents/parking/parkingDetail";
import Pagination from "@/app/components/common/ui/pagination";
import {addExcelParking, deleteClaimData, getParking, updateCommon} from "@/app/(Navigation-Group)/action";
import {CheckboxContainer} from "@/app/components/common/ui/input/checkboxContainer";
import {
    ButtonConfig,
    ClaimRowType,
    ParkingParamType,
    ParkingRowType,
    ParkingType,
    ParkingTypeKm,
    UptParking
} from "@/@types/common";
import CenterPopup from "@/app/components/popup/CenterPopup";
import AddBusiness, {AddBusinessRef} from "@/app/components/pageComponents/parking/addBusiness-kmpark";
import AddExcelUpload from "@/app/components/pageComponents/parking/addExcelUpload";

interface ColumnDefinition<T> {
    key: keyof T;
    header: string;
    defaultValue?: string;
    render?: (item: T) => string | number;
}

interface ParamType {
    bpk: number;
    condition: string;
    endDate: string;
    startDate: string;
    text: string;
}

const itemsPerPage = 15;

export default function Page() {
    const [slideOpen, setSlideOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [excelOpen, setExcelOpen] = useState(false);
    const [excelData, setExcelData] = useState<ParkingType[]>([]);
    const businessRef = useRef<AddBusinessRef>(null);
    const [selectedRow, setSelectedRow] = useState<number | null>(null);
    const [data, setData] = useState<ParkingRowType[]>([]);
    const [rowData, setRowData] = useState<ParkingRowType | undefined>();
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [param, setParam] = useState<ParkingParamType>({
        bpk : 1,
        condition: "pklName",
        text : '',
        status : 'ALL'
    });

    //페이지
    const getPaginatedData = () => {
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return data.slice(startIndex, endIndex);
    }

    useEffect(() => {
        if(data.length > 0) {
            setTotalPages(Math.ceil(data.length / itemsPerPage));
        }
    }, [data]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    }

    //슬라이드팝업
    const slideClose = () => {
        setSlideOpen(false);
        setSelectedRow(null);
        document.body.style.removeProperty('overflow');
    };

    const slideSave = async (data: UptParking) => {
        if(window.confirm('저장하시겠습니까?')){
            let result = await updateCommon(data);
            if (result.code === '200') {
                let reload = await getParking(param);
                setData(reload || []);
                alert(result.msg);
                slideClose();
            } else {
                alert('서비스 오류')
            }
        }else {
            return;
        }
    };

    async function slideDelete<T extends UptParking>(rowData: T): Promise<void> {
        try {
            if (window.confirm('삭제하시겠습니까?')) {
                rowData.table = 'parkinglot';

                let result = await deleteClaimData(rowData);
                if(result.code === '200'){
                    let reload = await getParking(param);
                    setData(reload);
                    alert(result.msg);
                    slideClose();
                }else {
                    alert("서비스 오류입니다.");
                }
            }
        } catch (e) {
            console.log(e);
        }
    };

    const SlideButtons: ButtonConfig[] =
        [
            {
                label: "편집",
                onClick: () => {},
                color: "blue",
                width: 100,
                height: 35,
            },
            {
                label: "삭제",
                onClick: () => {},
                color: "red",
                width: 100,
                height: 35,
            },
            {
                label: "닫기",
                onClick: slideClose,
                color: "gray",
                width: 100,
                height: 35,
            },
        ];

    //센터팝업(사업장추가)
    const addSave = async () => {
        if (businessRef.current) {
            const isValid = await businessRef.current.validateForm();

            if (isValid) {
                const formData = businessRef.current.getFormData();
                if (window.confirm(`${formData.pkName}사업장을 추가하시겠습니까?`)) {
                    const param = {
                        '주차장명': formData.pkName,
                        '주차장주소:': formData.pkAddress,
                        '주차장코드': formData.PJTcode,
                        '옥내': formData.indoor,
                        '옥외': formData.outdoor,
                        '기계식': formData.mechanical,
                        '카리프트': formData.carLift,
                        '기타': formData.form,
                        '면적': formData.faceCount
                    };
                    console.log(param);
                    setAddOpen(false);
                } else {
                    setAddOpen(true);
                }
            }
        }
    };

    const addClose = () => {
        if (businessRef.current) {
            businessRef.current.clearForm();
        }
        setAddOpen(false);
    };

    const AddButtons = [
        {
            label: "확인",
            onClick: addSave,
            color: "main" as const,
            fill: true,
            width: 130,
            height: 40
        },
        {
            label: "취소",
            onClick: addClose,
            color: "gray" as const,
            width: 130,
            height: 40
        }
    ];

    //센터팝업(엑셀업로드)
    const excelClose = () => {
        setExcelOpen(false);
    };

    const excelSave = async () => {
        try{
            const countNew = excelData.filter((item) => item.status === "NEW").length;
            const countDel = excelData.filter((item) => item.status === "EXP").length;
            if (window.confirm(`추가: ${countNew} 삭제: ${countDel} 엑셀을 업로드 하시겠습니까?`)) {
                // bpk 컬럼 추가
                const addBpkData = excelData.map((row) => ({
                    ...row,
                    bpk: 1, // bpk 컬럼 추가 및 값 설정
                }));
                let res = await addExcelParking(addBpkData);
                if(res.status ==='200'){
                    alert('저장완료');
                    excelClose();
                }else {
                    alert('서비스 오류입니다.');
                }
            } else {
                return;
            }
        }catch (e){
            console.log(e);
        }
    };

    const ExcelButton: ButtonConfig[] =
        [
            {
                label: "확인",
                onClick: excelSave,
                color: "main" as const,
                fill: true,
                width: 130,
                height: 40
            },
            {
                label: "취소",
                onClick: excelClose,
                color: "gray" as const,
                width: 130,
                height: 40
            }
        ];

    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    const handleDeleteGroup = () => {
        if (selectedItems.length === 0) {
            alert('삭제할 항목을 선택해주세요.');
            return;
        }
        if (window.confirm(`선택한 ${selectedItems.length}개의 항목을 삭제하시겠습니까?`)) {
            console.log('삭제할 항목 인덱스:', Array.from(selectedItems));
            return;
        }
    };



    const onSearchClick = async () => {
        const result = await getParking(param);
        setData(result);
        setCurrentPage(0);
    }

    useEffect(()=>{
        onSearchClick();
    },[])

    // 사고접수 리스트 컬럼
    const columns: ColumnDefinition<ParkingTypeKm>[] = [
        {
            key: 'pklName',
            header: '사업장명',
            defaultValue: '-'
        },
        {
            key: 'PJTcode',
            header: '주차장코드'
        },
        {
            key: 'pklAddress',
            header: '사업장주소'
        },
        {
            key: 'insuType',
            header: '보험적용',
        },
        {
            key: 'form',
            header: '형태',
        },
        {
            key: 'area',
            header: '면적',
        },
    ];

    return (
        <>
            <div className={'border border-gray-100 p-6 rounded-lg bg-white flex items-center justify-between'}>
                <div className={'flex items-center'}>
                    <div className={'text-gray-700 font-medium pt-1 ml-2 mr-5'}>상태</div>
                    <select
                        className={'w-[200px] mr-5'}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            setParam((prev: ParkingParamType) => ({
                                ...prev,
                                status: e.target.value,
                            }))
                        }
                        }
                    >
                        <option value={'all'}>전체</option>
                        <option value={'NORMAL'}>정상</option>
                        <option value={'NEW'}>신규</option>
                        <option value={'EXPIRED'}>종료</option>
                    </select>
                    <div className={'text-gray-700 font-medium pt-1 ml-2 mr-5'}>검색조건</div>
                    <select
                        className={'w-[200px]'}
                        onChange={(e : React.ChangeEvent<HTMLSelectElement>) => {
                            setParam((prev: ParkingParamType) => ({
                                ...prev,
                                condition: e.target.value,
                            }))}
                        }
                    >
                        <option value={'pkName'}>주차장명</option>
                        <option value={'pkAddress'}>주차장주소</option>
                    </select>
                    <input
                        type={'text'}
                        placeholder={'검색조건 설정 후 검색해주세요'}
                        className={'w-[300px] h-[35px] rounded-tr-none rounded-br-none ml-5'}
                        onChange={(e : React.ChangeEvent<HTMLInputElement>) => {
                            setParam((prev: ParkingParamType) => ({
                                ...prev,
                                text: e.target.value,
                            }))
                        }}
                    />
                    <Button
                        color={'main'}
                        width={100}
                        height={35}
                        fill
                        className={'rounded-tl-none rounded-bl-none'}
                        onClick={onSearchClick}
                    >
                        조회
                    </Button>
                </div>
                <Button color={"green"} use={'down'} height={32} width={120} className={'ml-5'} params={{bpk : "01", type : 'down'}} fileName={'Kmpark_sample'}>
                    <Image src={Excel.src} alt={'다운로드'} width={17} height={17} className={'mr-2'}/>
                    엑셀다운
                </Button>
            </div>

            <div className={'border border-gray-100 p-6 rounded-lg bg-white mt-5'}>
                <div className={'flex justify-end space-x-4'}>
                    <Button color={"red"} fill={false} height={32} width={120} onClick={handleDeleteGroup}>
                        삭제
                    </Button>
                    <Button color={"green"} fill height={32} width={120} onClick={() => setExcelOpen(true)}>
                        <Image src={ExcelUpload.src} alt={'업로드'} width={15} height={15} className={'mr-2'}/>
                        엑셀업로드
                    </Button>
                    <Button color={"main"} fill height={32} width={120} onClick={() => setAddOpen(true)}>
                        <Image src={Plus.src} alt={'추가'} width={16} height={16} className={'mr-1'}/>
                        사업장추가
                    </Button>
                </div>
                <CenterPopup
                    isOpen={addOpen}
                    onClose={addClose}
                    title="사업장 추가"
                    Content={() => <AddBusiness ref={businessRef} />}
                    buttons={AddButtons}
                />
                <CenterPopup
                    isOpen={excelOpen}
                    onClose={excelClose}
                    title="엑셀업로드"
                    Content={AddExcelUpload}
                    buttons={ExcelButton}
                />
                <SlidePopup
                    isOpen={slideOpen}
                    onClose={slideClose}
                    title={"상세보기"}
                    rowData={rowData}
                    onDelete={slideDelete}
                    Content={(props) => <List {...props} rowData={rowData} onSave={slideSave} />}
                    buttons={SlideButtons.map(button => ({ ...button}))}
                />
                <div className={'mt-4'}>
                    <CheckboxContainer
                        items={getPaginatedData()}
                        getItemId={(item) => item.irpk}
                        columns={columns}
                        selectedItems={selectedItems}
                        selectedRow={selectedRow}
                        onSelectionChange={setSelectedItems}
                        onRowClick={(item) => {
                            setSelectedRow(item.irpk);
                            setSlideOpen(true);
                            setRowData(item);
                            document.body.style.overflow = 'hidden';
                        }}
                    />
                    {totalPages > 0 && (
                        <Pagination
                            maxNumber={totalPages}
                            currentPage={currentPage + 1}
                            onChange={(page) => {setCurrentPage(page);}}
                        />
                    )}
                </div>
            </div>
        </>
    )
}