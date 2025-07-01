'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import cn from 'classnames';
import RefreshIcon from '../../../../../public/images/icon/refresh-icon.png';

type RefreshButtonProps = {
  onClick: () => any | Promise<any>;
  size?: number; // 기본 사이즈는 18px
  className?: string;
};

export default function RefreshButton({ onClick, size = 18, className }: RefreshButtonProps) {
  const [isSpinning, setIsSpinning] = useState(false);

  const handleClick = async () => {
    try {
      setIsSpinning(true);
      await Promise.resolve(onClick());
    } finally {
      setTimeout(() => setIsSpinning(false), 1000); // 1초 후 애니메이션 제거
    }
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      <Image
        src={RefreshIcon}
        alt="새로고침"
        width={size}
        height={size}
        className={cn({ 'animate-spin': isSpinning })}
      />
    </button>
  );
}
