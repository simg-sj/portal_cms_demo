'use client'
import Image from "next/image";
import ChargeIcon from "@/assets/images/icon/charge-icon.png";
import CheckChargeIcon from "@/assets/images/icon/checckCharge-icon.png";
import CancelChargeIcon from "@/assets/images/icon/cancelCharge-icon.png";
import AlarmIcon from "@/assets/images/icon/alarm-icon.png";
import Button from "@/app/components/common/ui/button/button";
import Tooltip from "@/app/components/common/ui/tooltip"
import Plus from "@/assets/images/icon/plus-icon.png";
import React, {useState} from "react";
import CountCard from "@/app/components/common/CountCard";
import InsuCard from "@/app/components/common/InsuCard";

const insuranceDataArray = [
    {
        insuName: '생명보험',
        insuNumber: '123-456-789',
        insuranceCompany: '보험사 A',
        managementCompany: '관리사 B',
        startDate: new Date('2023-01-01'),
        endDate: new Date('2024-01-01'),
        insuranceCost: 50000,
    },
    {
        insuName: '자동차보험',
        insuNumber: '987-654-321',
        insuranceCompany: '보험사 C',
        managementCompany: '관리사 D',
        startDate: new Date('2024-05-15'),
        endDate: new Date('2025-05-15'), // 만료된 보험
        insuranceCost: 30000,
    },
    {
        insuName: '화재보험',
        insuNumber: '456-123-789',
        insuranceCompany: '보험사 E',
        managementCompany: '관리사 F',
        startDate: new Date('2023-03-01'),
        endDate: new Date('2024-03-01'),
        insuranceCost: 25000,
    },
    {
        insuName: '주차장배상책임보험',
        insuNumber: '123-456-55',
        insuranceCompany: '보험사 A',
        managementCompany: '관리사 B',
        startDate: new Date('2023-12-13'),
        endDate: new Date('2024-12-28'),
        insuranceCost: 7777777,
    },
];

export default function Page() {

    const [insuranceData, setInsuranceData] = useState(insuranceDataArray);

    const handleDelete = (insuNumber: string) => {
        setInsuranceData(prevData => prevData.filter(item => item.insuNumber !== insuNumber));
    };

    const handleAddInsurance = () => {
        const newInsuranceData = {
            insuName: '',
            insuNumber: '',
            insuranceCompany: '',
            managementCompany: '',
            startDate: new Date(),
            endDate: new Date(2050,12,31),
            insuranceCost: 0,
            isEditing: true,
        };
        setInsuranceData(prevData => [newInsuranceData, ...prevData]);
    };

    // 총 보험료 계산
    const totalInsuranceCost = insuranceData.reduce((total, item) => total + item.insuranceCost, 0);

    // 만료된 보험 수 계산
    const expiredInsuranceCount = insuranceData.filter(item => new Date() > item.endDate).length;

    // 갱신 예정 보험 수 계산
    const renewalSoonCount = insuranceData.filter(item => {
        const dday = Math.ceil((item.endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
        return dday <= 30 && dday > 0;
    }).length;

    //만료일 기준 보험리스트 정렬
    const listArray = [...insuranceData].sort((a, b) => b.endDate.getTime() - a.endDate.getTime());

    return (
        <>
            <div className={'p-6 rounded-lg bg-white'}>
                <div className={'flex items-center mb-6'}>
                    <div className={'text-lg font-light'}>보험관리</div>
                    <Tooltip content={"보험관리 추가 버튼으로 현재 가입되어 있는 보험을 추가하여 해당 페이지에서 모든 보험을 관리할 수 있으며, 갱신 예정인 보험을 1달전에 알림으로 알려드립니다. 갱신 정보는 보험관리추가 버튼을 통해 추가할 수 있습니다."}/>
                </div>
                <div className={'flex justify-between space-x-10'}>
                    <CountCard
                        icon={AlarmIcon.src}
                        title={'갱신예정 보험'}
                        value={renewalSoonCount}
                        unit={"건"}
                    />
                    <CountCard
                        icon={CheckChargeIcon.src}
                        title={'가입 보험'}
                        value={insuranceData.length}
                        unit={"건"}
                    />
                    <CountCard
                        icon={ChargeIcon.src}
                        title={'총 보험료'}
                        value={totalInsuranceCost}
                        unit={"원"}
                    />
                </div>
            </div>
            {/* 보험리스트 */}
            <div className={'p-6 rounded-lg bg-white my-5'}>
                <div className={'flex justify-between'}>
                    <div className={'text-lg font-light mb-6'}>보험리스트</div>
                    <Button color={"main"} fill height={32} width={132} onClick={handleAddInsurance}>
                        <Image src={Plus.src} alt={'추가'} width={14} height={14} className={'mr-1'}/>
                        보험관리추가
                    </Button>
                </div>
                <div className={'max-h-[calc(100vh-500px)] overflow-y-auto'}>
                    {listArray.map((insuranceData) => (
                        <InsuCard
                            key={insuranceData.insuNumber} // 각 카드에 고유한 키 부여
                            insuName={insuranceData.insuName}
                            insuNumber={insuranceData.insuNumber}
                            insuranceCompany={insuranceData.insuranceCompany}
                            managementCompany={insuranceData.managementCompany}
                            startDate={insuranceData.startDate}
                            endDate={insuranceData.endDate}
                            insuranceCost={insuranceData.insuranceCost}
                            onDelete={handleDelete}
                            isEditing={insuranceData.isEditing}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}