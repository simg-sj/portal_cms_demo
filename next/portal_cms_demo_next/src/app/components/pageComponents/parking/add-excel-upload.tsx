import React, { useState } from 'react';
import Image from "next/image";
import styled from "styled-components";
import Button from "@/app/components/common/ui/button";
import ExcelUpload from "@/assets/images/icon/upload-gray-icon.png";
import ExcelDown from "@/assets/images/icon/excel-down-icon.png";

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
    
    div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 5px;
    }
`;

const FileInfo = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
`;
const FileName = styled.span`
    width: 200px;
    font-weight: 600;
`;
const FileInfoLabel = styled.span`
    width: 150px;
`;

const FileInfoValue = styled.span`
    color: #666;
`;

const AddExcelUpload = () => {
    const [isActive, setActive] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);

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

    const handleFileUpload = (files) => {
        const newFiles = Array.from(files).filter(validateExcelFile);

        newFiles.forEach(file => {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const uploadedFile = {
                    name: file.name,
                    size: `${(file.size / 1024).toFixed(2)} KB`,
                    addedBusinessCount: 0, // Placeholder for future implementation
                    deletedBusinessCount: 0, // Placeholder for future implementation
                    errorCount: 0 // Placeholder for future implementation
                };

                setUploadedFiles(prev => [...prev, uploadedFile]);
            };
            fileReader.readAsArrayBuffer(file);
        });
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
            <div className={'flex justify-end space-x-4'}>
                <Button color={"green"} height={30} width={180} className={'ml-5'}>
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
                        <div>
                            <FileName>{file.name}</FileName>
                            <FileInfoValue>{file.size}</FileInfoValue>
                            <Button color={"red"} height={26} width={100} className={'ml-5'} onClick={() => handleRemoveFile(file)}>
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
                        <FileInfo>
                            <FileInfoLabel>에러 건수</FileInfoLabel>
                            <FileInfoValue>{file.errorCount}<span> 건</span></FileInfoValue>
                        </FileInfo>
                    </FileInfoSection>
                </FileListContainer>
            ))}
            </div>
        </>
    );
};

export default AddExcelUpload;