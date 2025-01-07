import React, {useEffect, useState} from 'react';
import Image from "next/image";
import styled from "styled-components";
import Button from "@/app/components/common/ui/button/button";
import ExcelUpload from "@/assets/images/icon/upload-gray-icon.png";
import ExcelDown from "@/assets/images/icon/excel-down-icon.png";
import {useSession} from "next-auth/react";
import {BSN_CODE} from "@/config/data";
import {uploadExcel} from "@/app/(Navigation-Group)/action";
import {ParkingType} from "@/@types/common";
import fileUpload from "@/app/components/common/ui/input/fileUpload";
import Tooltip from "@/app/components/common/ui/tooltip";

const StyledFile = styled.label`
    width: 430px;
    height: 150px;
    margin: 15px auto;
    background-color: #fff;
    border-radius: 5px;
    border: 3px dashed #eee;
    padding: 70px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &.active {
        background-color: #f1f1f1;
    }

    :hover {
        border-color: #111;
    }

    .file {
        display: none;
    }
`;

const FileListContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px auto;
    padding: 10px 20px;
    background-color: #f9f9f9;
    border-radius: 5px;
`;

const FileInfoSection = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const FileInfo = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
`;
const FileName = styled.span`
    font-weight: 600;
    margin-bottom: 5px;
`;
const FileInfoLabel = styled.span`
    width: 150px;
`;

const FileInfoValue = styled.span`
    color: #666;
`;
interface AddProps {
    setExcelData: React.Dispatch<React.SetStateAction<ParkingType[]>>;
}

const ExcelGuide = () => {
    return(
        <>
            <div className={'font-bold mb-3'}>엑셀업로드 가이드</div>
            <div className={'text-sm font-semibold my-3 text-gray-800'}>1 ) 엑셀샘플을 다운로드 합니다.</div>
            <div className={'text-sm font-semibold my-3 text-gray-800'}>2 ) 다운로드한 파일에 하단 예시를 참고하여 작성합니다.</div>
            <table className="colTable text-[14px]">
                <tbody>
                <tr className={'!h-[30px]'}>
                    <th className={'!py-2 !bg-gray-100'}>No</th>
                    <td className={'!py-2'}>상단부터 1,2,3 순서로 작성</td>
                </tr>
                <tr className={'!h-[30px]'}>
                    <th className={'!py-2 !bg-gray-100'}>구분</th>
                    <td className={'!py-2'}>추가일 경우 'NEW' 삭제일 경우 'EXP' 작성</td>
                </tr>
                <tr className={'!h-[30px]'}>
                    <th className={'!py-2 !bg-gray-100'}>물건명</th>
                    <td className={'!py-2'}>사업장명 작성</td>
                </tr>
                <tr className={'!h-[30px]'}>
                    <th className={'!py-2 !bg-gray-100'}>소재지</th>
                    <td className={'!py-2'}>사업장주소 작성</td>
                </tr>
                <tr className={'!h-[30px]'}>
                    <th className={'!py-2 !bg-gray-100'}>형태</th>
                    <td className={'!py-2'}>옥내,옥외 등 건물형태 작성</td>
                </tr>
                <tr className={'!h-[30px]'}>
                    <th className={'!py-2 !bg-gray-100'}>면수/옥외/옥내/기계식/카리프트</th>
                    <td className={'!py-2'}>숫자 입력</td>
                </tr>
                <tr className={'!h-[30px]'}>
                    <th className={'!py-2 !bg-gray-100'}>세부내역</th>
                    <td className={'!py-2'}>건물에 대한 기타 세부내역 작성</td>
                </tr>
                <tr className={'!h-[30px]'}>
                    <th className={'!py-2 !bg-gray-100'}>공동피보험자</th>
                    <td className={'!py-2'}>공동피보험자 사업장, 사업자번호 작성</td>
                </tr>
                </tbody>
            </table>
            <div className={'text-sm font-semibold my-3 text-gray-800'}>3 ) 엑셀파일을 업로드한 후 확인을 눌러 업로드합니다.</div>
        </>
    )
}

const AddExcelUpload = ({setExcelData}: AddProps) => {
    const [isActive, setActive] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const {data, status} = useSession();


    const handleDragStart = (e) => {
        e.preventDefault();
        setActive(true);
    };

    const handleDragEnd = (e) => {
        e.preventDefault();
        setActive(false);
    };

    const validateExcelFile = (file) => {
        const validTypes = [
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
            'application/vnd.ms-excel' // .xls
        ];
        return validTypes.includes(file.type);
    };

    const handleFileUpload = async (files) => {
        try {
            const formData = new FormData();
            const uploadedFileDetails = [];
            Array.from(files).forEach((file, index) => {
                formData.append("files", file);
                uploadedFileDetails.push({
                    id: `${file.name}-${index}`, // 고유 ID 추가
                    name: file.name,
                    size: `${(file.size / 1024).toFixed(2)} KB`,
                    addedBusinessCount: 0,
                    deletedBusinessCount: 0,
                    errorCount: 0,
                });
            });

            formData.append("bpk", BSN_CODE[data.user.bName].bpk);
            formData.append("type", "up");
            const res = await uploadExcel(formData);
            console.log(res)
            if (res.status === "200") {
                const countNew = res.data.filter((item) => item.status === "NEW").length;
                const countDel = res.data.filter((item) => item.status === "EXP").length;

                // 응답 데이터를 기반으로 업데이트
                if(countNew === 0 && countDel === 0) {
                    alert("데이터가 없습니다.");
                }else {
                    uploadedFileDetails.forEach((file) => {
                        file.addedBusinessCount = countNew;
                        file.deletedBusinessCount = countDel;
                    });
                    setUploadedFiles((prev) => [...prev, ...uploadedFileDetails]);
                    setExcelData(res.data);
                }
            } else {
                alert(res.msg);
            }
        } catch (e) {
            console.error("파일 업로드 실패:", e);
        }
    };


    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    const handleDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setActive(false);
        handleFileUpload(event.dataTransfer.files);
    };

    const handleFileInputChange = (event) => {

        handleFileUpload(event.target.files);
    };

    const handleRemoveFile = (fileToRemove) => {
        setUploadedFiles(prev =>
            prev.filter(file => file.name !== fileToRemove.name)
        );
    };


    return (
        <>
            <div className={'flex justify-between space-x-4'}>
                <div className={'flex items-center'}>
                    간편 엑셀업로드
                    <Tooltip content={<ExcelGuide/>} width={600}/>
                </div>
                <Button color={"green"} height={30} width={180} className={'ml-5'}
                        params={{bpk: BSN_CODE[data.user.bName].bpk, type: 'down'}}
                        fileName={BSN_CODE[data.user.bName].fileName} use={'down'}>
                    <Image src={ExcelDown.src} alt={'다운로드'} width={17} height={17} className={'mr-2'}/>
                    엑셀 샘플 다운로드
                </Button>
            </div>

            <StyledFile
                className={`preview${isActive ? ' active' : ''}`}
                onDragEnter={handleDragStart}
                onDragLeave={handleDragEnd}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    className="file"
                    accept=".xlsx, .xls"
                    multiple
                    onChange={handleFileInputChange}
                />
                <Image src={ExcelUpload.src} alt={'엑셀업로드'} width={40} height={40}/>
                <p className="mt-3 text-gray-800">클릭 혹은 엑셀파일을 이곳에 드롭하세요.</p>
            </StyledFile>
            <div className={'max-h-[500px] overflow-y-auto'}>
                {uploadedFiles.map((file, index) => (
                    <FileListContainer key={index}>
                        <FileInfoSection>
                            <FileName>{file.name}</FileName>
                            <div className={'flex items-center justify-end mb-3'}>
                                <FileInfoValue>{file.size}</FileInfoValue>
                                <Button color={"red"} height={26} width={100} className={'ml-5'}
                                        onClick={() => handleRemoveFile(file)}>
                                    파일삭제
                                </Button>
                            </div>
                            <FileInfo>
                                <FileInfoLabel>추가 사업장</FileInfoLabel>
                                <FileInfoValue>{file.addedBusinessCount}<span> 건</span></FileInfoValue>
                            </FileInfo>
                            <FileInfo>
                                <FileInfoLabel>삭제 사업장</FileInfoLabel>
                                <FileInfoValue>{file.deletedBusinessCount}<span> 건</span></FileInfoValue>
                            </FileInfo>
                        </FileInfoSection>
                    </FileListContainer>
                ))}
            </div>
        </>
    );
};

export default AddExcelUpload;