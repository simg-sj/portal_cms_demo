'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { UseFormSetValue } from 'react-hook-form';
import Image from 'next/image';

const DaumPostcode = dynamic(() => import('react-daum-postcode'), { ssr: false });

interface PostcodeModalProps {
  setValue: UseFormSetValue<any>;
  onClose: () => void;
}

export default function PostcodeModal({ setValue, onClose }: PostcodeModalProps) {
  const handleComplete = (data: any) => {
    const fullAddress = data.address;
    const extraAddress = data.addressType === 'R' ? (data.bname || '') + (data.buildingName ? `, ${data.buildingName}` : '') : '';
    setValue('address' ,extraAddress ? `${fullAddress} (${extraAddress})` : fullAddress);
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);

    // 스크롤 방지
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = ''; // 원복
    };
  }, [onClose]);


  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg max-w-[600px] max-h-[500px] w-full relative">
        <button type='button' className="absolute top-2 right-2 text-gray-500" onClick={()=>onClose()}>
          <Image src={'/images/icon/close-icon.png'} alt={'닫기 아이콘'} width={15} height={15}/>
        </button>
        <DaumPostcode  style={{ width: '100%',height: '450px'}} onComplete={handleComplete} autoClose/>
      </div>
    </div>
  );
}
