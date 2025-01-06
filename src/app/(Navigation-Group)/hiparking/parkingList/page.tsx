"use client"
import React, {useEffect, useRef, useState} from "react";
import Button from "@/app/components/common/ui/button";
import Image from "next/image";
import Excel from "@/assets/images/icon/excel-icon.png";
import Plus from "@/assets/images/icon/plus-icon.png";
import ExcelUpload from "@/assets/images/icon/upload-white-icon.png";
import SlidePopup from "@/app/components/popup/SlidePopup";
import ParkingDetailList from "@/app/components/pageComponents/parking/parkingDetail";
import Pagination from "@/app/components/common/ui/pagination";
import {addExcelParking, deleteClaimData, getClaim, getParking} from "@/app/(Navigation-Group)/action";
import {CheckboxContainer} from "@/app/components/common/ui/checkboxContainer";
import {ButtonConfig, ParamType, ParkingParamType, ParkingRowType, ParkingType} from "@/@types/common";
import CenterPopup from "@/app/components/popup/CenterPopup";
import AddBusiness, {AddBusinessRef} from "@/app/components/pageComponents/parking/add-business-hiparking";
import AddExcelUpload from "@/app/components/pageComponents/parking/add-excel-upload";

interface ColumnDefinition<T> {
    key: keyof T;
    header: string;
    defaultValue?: string;
    render?: (item: T) => string | number;
}


const itemsPerPage = 15;

export default function Page() {
    const [slideOpen, setSlideOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [excelOpen, setExcelOpen] = useState(false);
    const [excelData, setExcelData] = useState<ParkingType[]>([]);
    const businessRef = useRef<AddBusinessRef>(null);
    const [selectedRow, setSelectedRow] = useState<number | null>(null);
    const [data, setData] = useState<ParkingType[]>([]);
    const [rowData, setRowData] = useState<ParkingRowType>();
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [param, setParam] = useState<ParkingParamType>({
        bpk: 2,
        condition: "pklName",
        text: ''
    });

    //페이지
    const getPaginatedData = () => {
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return data.slice(startIndex, endIndex);
    }

    useEffect(() => {
        if (data.length > 0) {
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

    const slideSave = (data: ParkingRowType) => {
        if(window.confirm('저장하시겠습니까?')){
            console.log('수정된 데이터:', data);
            slideClose();
        }
    };

    const slideDelete = (data: ParkingRowType) => {
            console.log('삭제 데이터:', data);
            slideClose();
    };

    const SlideButtons: ButtonConfig[] =
        [
            {
                label: "편집",
                onClick: () => {
                },
                color: "blue",
                width: 100,
                height: 35,
            },
            {
                label: "삭제",
                onClick: () => {
                },
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
                        '옥내:': formData.indoor.checked ? formData.indoor.value : '',
                        '옥외:': formData.outdoor.checked ? formData.outdoor.value : '',
                        '기계식:': formData.mechanical.checked ? formData.mechanical.value : '',
                        '카리프트:': formData.carLift.checked ? formData.carLift.value : '',
                        '면수': formData.pkArea,
                        '세부내역': formData.pkDetail,
                        '메모': formData.pkMemo
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
                    bpk: 4, // bpk 컬럼 추가 및 값 설정
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
            console.log(selectedItems);
            console.log('삭제할 항목 인덱스:', Array.from(selectedItems));
            return;
        }
    };


    const onSearchClick = async () => {
        const result = await getParking(param);
        setData(result);
        setCurrentPage(0);
    }

    // 사고접수 리스트 컬럼
    const columns: ColumnDefinition<ParkingType>[] = [
        {
            key: 'pklName',
            header: '사업장명',
        },
        {
            key: 'pklAddress',
            header: '사업장주소'
        },
        {
            key: 'form',
            header: '형태',
        },
        {
            key: 'faceCount',
            header: '면수',
        },
        {
            key: 'indoor',
            header: '옥외(㎡)'
        },
        {
            key: 'outdoor',
            header: '옥내(㎡)'
        },
        {
            key: 'mechanical',
            header: '기계식(면)'
        },
        {
            key: 'carLift',
            header: '카리프트(대)'
        },
    ];
    useEffect(() => {
        onSearchClick();
    }, []);
    return (
        <>
            <div className={'border border-gray-100 p-6 rounded-lg bg-white flex items-center justify-between'}>
                <div className={'flex items-center'}>
                    <div className={'text-gray-700 font-medium pt-1 ml-2 mr-5'}>검색조건</div>
                    <select
                        className={'w-[200px]'}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            setParam((prev: ParkingParamType) => ({
                                ...prev,
                                condition: e.target.value,
                            }))
                        }
                        }
                    >
                        <option value={'pkName'}>주차장명</option>
                        <option value={'pklAddress'}>주차장주소</option>
                    </select>
                    <input
                        type={'text'}
                        placeholder={'검색조건 설정 후 검색해주세요'}
                        className={'w-[300px] h-[35px] rounded-tr-none rounded-br-none ml-5'}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
                <Button color={"green"} height={36} use={'down'} width={120} className={'ml-5'} params={{bpk : "02", type : 'down'}} fileName={'하이파킹_sample'}>
                    <Image src={Excel.src} alt={'다운로드'} width={17} height={17} className={'mr-2'}/>
                    엑셀다운
                </Button>
            </div>

            <div className={'border border-gray-100 p-6 rounded-lg bg-white mt-5'}>
                <div className={'flex justify-between'}>
                    <div className={'text-xl font-light mb-6'}>사업장관리</div>
                    <div className={'flex justify-end space-x-4'}>
                        <Button color={"red"} fill={false} height={36} width={120} onClick={handleDeleteGroup}>
                            삭제
                        </Button>
                        <Button color={"green"} fill height={36} width={120} onClick={() => setExcelOpen(true)}>
                            <Image src={ExcelUpload.src} alt={'업로드'} width={15} height={15} className={'mr-2'}/>
                            엑셀업로드
                        </Button>
                        <Button color={"main"} fill height={36} width={120} onClick={() => setAddOpen(true)}>
                            <Image src={Plus.src} alt={'추가'} width={16} height={16} className={'mr-1'}/>
                            사업장추가
                        </Button>
                    </div>
                </div>

                <CenterPopup
                    isOpen={addOpen}
                    onClose={addClose}
                    title="사업장 추가"
                    Content={() => <AddBusiness ref={businessRef}/>}
                    buttons={AddButtons}
                />
                <CenterPopup
                    isOpen={excelOpen}
                    onClose={excelClose}
                    title="엑셀업로드"
                    setExcelData={setExcelData}
                    Content={AddExcelUpload}
                    contentProps={{ setExcelData }}
                    buttons={ExcelButton}
                />
                <SlidePopup
                    isOpen={slideOpen}
                    onClose={slideClose}
                    title={"상세보기"}
                    rowData={rowData}
                    onDelete={slideDelete}
                    Content={(props) => <ParkingDetailList {...props} rowData={rowData} onSave={slideSave}/>}
                    buttons={SlideButtons}
                />
                <div className={'mt-4'}>
                    <CheckboxContainer
                        items={getPaginatedData()}
                        getItemId={(item) => item.pklpk}
                        columns={columns}
                        selectedItems={selectedItems}
                        selectedRow={selectedRow}
                        onSelectionChange={setSelectedItems}
                        onRowClick={(item) => {
                            console.log(item)
                            setSelectedRow(item.pklpk);
                            setSlideOpen(true);
                            setRowData(item);
                            document.body.style.overflow = 'hidden';
                        }}
                    />
                    {totalPages > 0 && (
                        <Pagination
                            maxNumber={totalPages}
                            onChange={handlePageChange}
                        />
                    )}
                </div>
            </div>
        </>
    )
}