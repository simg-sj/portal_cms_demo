import React, { useState } from "react";
import EditUser from "@/app/components/pageComponents/mypqge/editUser";
import {PlatformList, SearchParams, UserListType, UserType} from "@/@types/common";
import { tabs } from "@/config/data";
import UserList from '@/app/components/pageComponents/mypqge/userList';

// GetList 컴포넌트
function GetList({ userList }: { userList: UserListType[] }) {
    if (!userList || userList.length === 0) {
        return <div className="text-gray-500">담당자 정보가 없습니다.</div>;
    }

    return (
        <div>
            {userList.map((item, index) => (
                <div key={index} className="flex flex-col">
                    <div className="flex flex-col text-xl mt-8">
                        <h2 className="leading-[40px] text-gray-500 text-lg border-b mb-2">
                            담당자 성함
                        </h2>
                        <h2>{item.uName}</h2>
                        <h2 className="leading-[40px] text-gray-500 text-lg border-b mb-2 mt-14">
                            담당자 이메일
                        </h2>
                        <h2>{item.uMail}</h2>
                        <h2 className="leading-[40px] text-gray-500 text-lg border-b mb-2 mt-14">
                            담당자 연락처
                        </h2>
                        <h2>{item.uCell}</h2>
                    </div>
                    <div className="my-16 text-gray-700">
                        * 홈페이지 관련 문의는 담당자 연락처 혹은 이메일로 문의 바랍니다.
                    </div>
                </div>
            ))}
        </div>
    );
}

interface MypageType {
    userInfo: UserType;
    userList: UserListType[]; // userList 기본값을 빈 배열로 설정
    platformList : PlatformList[];
    onSearchClick : (param : any) => void;
    onReload : (pk : number, infoId : string) => Promise<void>;
    setUserInfo : React.Dispatch<React.SetStateAction<UserType>>;
}

export default function MyPageTabs({ userInfo, userList = [], onSearchClick, setUserInfo, onReload, platformList }: MypageType) {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="w-full">
            <div className="flex border-b">
                {tabs[userInfo.auth]
                    ?.filter((tab) => tab.Yn === "Y") // 'Yn' 값이 "Y"인 것만 필터링
                    .map((tab, index) => (
                        <button
                            key={index}
                            className={`px-4 py-2 ${
                                activeTab === index
                                    ? "text-main font-semibold border-b-4 border-main"
                                    : "text-gray-700"
                            }`}
                            onClick={() => setActiveTab(index)}
                        >
                            {tab.label}
                        </button>
                    ))}
            </div>
            <div className="p-4">
                {
                    activeTab === 0 ?
                        <EditUser userInfo={userInfo} setUserInfo={setUserInfo} onReload={onReload}/>
                        :
                        userInfo.auth === 'admin' ? <UserList userList={userList}  onSearch={onSearchClick} platformList={platformList}/>  : <GetList userList={userList} />
                }
            </div>
        </div>
    );
}
