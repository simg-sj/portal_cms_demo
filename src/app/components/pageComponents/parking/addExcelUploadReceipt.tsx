import React, {useState} from 'react';
import Image from "next/image";
import styled from "styled-components";
import Button from "@/app/components/common/ui/button/button";
import ExcelUpload from "@/assets/images/icon/upload-gray-icon.png";
import ExcelDown from "@/assets/images/icon/excel-down-icon.png";
import {useSession} from "next-auth/react";
import {BSN_CODE} from "@/config/data";
import {uploadExcel} from "@/app/(Navigation-Group)/action";
import {dutyType} from "@/@types/common";
import Tooltip from "@/app/components/common/ui/tooltip";

const StyledFile = styled.label`
    width: 800px;
    height: 300px;
    margin: 0 0 0 400px;
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
    margin: 30px 100px 30px 400px;
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
    setExcelData: React.Dispatch<React.SetStateAction<dutyType[]>>;
}

const ExcelGuide = () => {
    return (
        <>
            <div className={'font-bold mb-3'}>엑셀업로드 가이드</div>
            <div className={'text-sm font-semibold my-3 text-gray-800'}>1 ) 엑셀샘플을 다운로드 합니다.</div>
            <div className={'text-sm font-semibold my-3 text-gray-800'}>2 ) 다운로드한 파일에 하단 예시를 참고하여 작성합니다.</div>
            <table className="colTable text-[14px]">
                <tbody>
                <tr className={'!h-[30px]'}>
                    <th className={'!py-2 !bg-gray-100'}>담당자 이름</th>
                    <td className={'!py-2'}>해당 접수 담당자 명 작성</td>
                </tr>
                <tr className={'!h-[30px]'}>
                    <th className={'!py-2 !bg-gray-100'}>담당자 전화번호</th>
                    <td className={'!py-2'}>- 없이 숫자만 작성</td>
                </tr>
                <tr className={'!h-[30px]'}>
                    <th className={'!py-2 !bg-gray-100'}>이륜차량 이름</th>
                    <td className={'!py-2'}>이륜차량 이름 작성</td>
                </tr>
                <tr className={'!h-[30px]'}>
                    <th className={'!py-2 !bg-gray-100'}>차량번호(선택)</th>
                    <td className={'!py-2'}>차량번호 작성</td>
                </tr>
                <tr className={'!h-[30px]'}>
                    <th className={'!py-2 !bg-gray-100'}>차대번호</th>
                    <td className={'!py-2'}>차대번호 작성</td>
                </tr>
                <tr className={'!h-[30px]'}>
                    <th className={'!py-2 !bg-gray-100'}>연료</th>
                    <td className={'!py-2'}>'휘발유/가솔린' 중 작성</td>
                </tr>
                <tr className={'!h-[30px]'}>
                    <th className={'!py-2 !bg-gray-100'}>배기량</th>
                    <td className={'!py-2'}></td>
                </tr>
                <tr className={'!h-[30px]'}>
                    <th className={'!py-2 !bg-gray-100'}>연식</th>
                    <td className={'!py-2'}>특수문자 제외 8자리 ex) 20250101</td>
                </tr>
                <tr className={'!h-[30px]'}>
                    <th className={'!py-2 !bg-gray-100'}>운전자범위</th>
                    <td className={'!py-2'}></td>
                </tr>
                <tr className={'!h-[30px]'}>
                    <th className={'!py-2 !bg-gray-100'}>연령범위</th>
                    <td className={'!py-2'}></td>
                </tr>
                <tr className={'!h-[30px]'}>
                    <th className={'!py-2 !bg-gray-100'}>담보</th>
                    <td className={'!py-2'}></td>
                </tr>
                <tr className={'!h-[30px]'}>
                    <th className={'!py-2 !bg-gray-100'}>기타 담보 조정사항(선택)</th>
                    <td className={'!py-2'}></td>
                </tr>
                <tr className={'!h-[30px]'}>
                    <th className={'!py-2 !bg-gray-100'}>결제수단</th>
                    <td className={'!py-2'}>'신용카드/자동이체' 중 작성</td>
                </tr>
                <tr className={'!h-[30px]'}>
                    <th className={'!py-2 !bg-gray-100'}>카드번호</th>
                    <td className={'!py-2'}>-없이 숫자만 작성</td>
                </tr>
                </tbody>
            </table>
            <div className={'text-sm font-semibold my-3 text-gray-800'}>3 ) 엑셀파일을 업로드한 후 확인을 눌러 업로드합니다.</div>
        </>
    )
}

const AddExcelUploadReceipt = ({setExcelData}: AddProps) => {
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
                if (countNew === 0 && countDel === 0) {
                    alert("데이터가 없습니다.");
                } else {
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
            <div className={'flex px-[100px] py-5'}>
                <div className={'font-medium w-[300px] mr-1 flex items-center'}>엑셀업로드 <span
                    className={'text-red-500'}>*</span>
                    <Tooltip content={<ExcelGuide/>} width={600}/>
                </div>
                <Button color={"green"} height={30} width={200} use={'down'} params={{bpk : "05", type : 'down'}} fileName={'다중 접수_sample'}>
                    <Image src={ExcelDown} alt={'다운로드'} width={17} height={17} className={'mr-2'}/>
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
            <div className={'max-h-[800px] overflow-y-auto'}>
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
                                <FileInfoLabel>접수건수</FileInfoLabel>
                                <FileInfoValue>00<span> 건</span></FileInfoValue>
                            </FileInfo>
                        </FileInfoSection>
                    </FileListContainer>
                ))}
            </div>
        </>
    );
};

export default AddExcelUploadReceipt;