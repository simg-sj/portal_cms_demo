import React, { useState, useCallback, useEffect } from 'react';
import Image from "next/image";
import NoneFile from "@/assets/images/icon/nonefile-icon.png";
import Upload from "@/assets/images/icon/upload-icon.png";
import { ImageType } from "@/@types/common";

interface ImageUploaderProps {
    initialImages: ImageType[];
    isEditing: boolean;
    onChange: (images: ImageType[]) => void;
}

const ImageUploader = ({ initialImages, isEditing, onChange }: ImageUploaderProps) => {
    const [images, setImages] = useState<ImageType[]>(initialImages);

    const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            // 선택된 모든 파일을 처리
            Array.from(files).forEach((file) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const newImage: ImageType = {
                        src: e.target?.result as string,
                        file,
                        location: e.target?.result as string
                    };
                    setImages(prevImages => {
                        const updatedImages = [...prevImages, newImage];
                        onChange(updatedImages);
                        return updatedImages;
                    });
                };
                reader.readAsDataURL(file);
            });
        }
        // 같은 파일을 다시 선택할 수 있도록 input 값을 초기화
        event.target.value = '';
    }, [onChange]);

    const handleDelete = useCallback((index: number) => {
        if (window.confirm('해당 이미지를 삭제 하시겠습니까?')) {
            setImages(prevImages => {
                const newImages = [...prevImages];
                newImages.splice(index, 1);
                onChange(newImages);
                return newImages;
            });
        }
    }, [onChange]);

    useEffect(() => {
        if (initialImages) {
            setImages(initialImages);
        }
    }, [initialImages]);

    if (!isEditing && images.length === 0) {
        return (
            <div className="flex items-center justify-center w-48 h-48 bg-[#fafafa]">
                <div className="text-center">
                    <Image src={NoneFile.src} alt={'첨부파일없음'} className="mx-auto mb-2" width={24} height={24} />
                    <p>첨부파일이 없습니다</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-wrap gap-4">
            {images.map((image, index) => (
                <div key={index} className="relative w-48 h-48">
                    <Image
                        src={image.location || image.src}
                        alt={`Uploaded ${index + 1}`}
                        className="w-full h-full object-cover"
                        width={200}
                        height={200}
                        quality={90}
                    />
                    {isEditing && (
                        <button
                            onClick={() => handleDelete(index)}
                            className="absolute top-2 right-2 bg-white text-red-500 border-2 border-red-500 rounded-full w-6 text-sm hover:bg-red-500 hover:text-white"
                        >
                            X
                        </button>
                    )}
                </div>
            ))}
            {isEditing && (
                <label className="flex items-center justify-center w-48 h-48 bg-[#fafafa] cursor-pointer hover:bg-gray-100">
                    <input
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        accept="image/*"
                        multiple // 다중 파일 선택 활성화
                    />
                    <div className="text-center">
                        <Image src={Upload.src} alt={'upload'} className="mx-auto mb-2" width={24} height={24} />
                        <p>파일 업로드</p>
                    </div>
                </label>
            )}
        </div>
    );
};

export default ImageUploader;