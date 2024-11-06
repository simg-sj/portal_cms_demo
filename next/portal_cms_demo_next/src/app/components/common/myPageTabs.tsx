"use client";
import React, {useState, useEffect} from "react";
import EditUser from "@/app/components/page/mypqge/editUser";
import Loading from "@/app/(Navigation-Group)/loading";
import UserList from "@/app/components/page/mypqge/userList";


interface UserParam {
    platform: string;
    type: string;
}

const tabs = {
    'user': [{'label': '마이페이지'}, {'label': '관리자 정보'}],
    'admin': [{'label': '마이페이지'}, {'label': '사용자 목록'}]
}

interface UserList {
    userId: string;
    name: string;
    email: string;
    phone: string;
}

// GetList 컴포넌트를 별도로 분리
function GetList({platform, type}: UserParam) {
    const [userList, setUserList] = useState<UserList[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                let listType = '';
                if (type === 'user') listType = 'userList';
                if (type === 'admin') listType = 'adminList';

                const response = await fetch(`https://center-api.simg.kr/api/portal/getUser`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({platform, listType}),
                });
                if (!response.ok) {
                    throw new Error('오류가 발생했습니다.');
                }
                const data = await response.json();
                setUserList(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [platform, type]);

    if (loading) {
        return <Loading/>;
    }

    if (error) {
        return <div>{error}</div>;
    }
    //관리자 로그인시 사용자 목록 tab
    if (type === 'admin') {
        return (
            <UserList></UserList>
        )
            ;
    }

    //기본값 : 사용자 로그인시 관리자정보 tab
    return (
        <div>
            {userList.map((item, index) => (
                    <div key={index} className='flex flex-col'>
                        <div className='flex flex-col text-xl mt-8'>
                            <h2 className='leading-[40px] text-gray-500 text-lg border-b mb-2'>
                                담당자 성함
                            </h2>
                            <h2>
                                {item.uName}
                            </h2>
                            <h2 className='leading-[40px] text-gray-500 text-lg border-b mb-2 mt-14'>
                                담당자 이메일
                            </h2>
                            <h2>
                                {item.uMail}
                            </h2>
                            <h2 className='leading-[40px] text-gray-500 text-lg border-b mb-2 mt-14'>
                                담당자 연락처
                            </h2>
                            <h2>
                                {item.uCell}
                            </h2>
                        </div>
                        <div className={'my-16 text-gray-700'}>* 홈페이지 관련 문의는 담당자 연락처 혹은 이메일로 문의 바랍니다.</div>
                    </div>
                )
            )}
        </div>
    )
        ;
}

export default function MyPageTabs({userInfo}: { userInfo: UserType }) {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="w-full">
            <div className="flex border-b">
                {tabs[userInfo.auth].map((tab, index) => (
                    <button
                        key={index}
                        className={`px-4 py-2 ${
                            activeTab === index
                                ? 'text-main font-semibold border-b-4 border-main'
                                : 'text-gray-700'
                        }`}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="p-4">
                {activeTab === 0 ? (
                    <EditUser
                        userInfo={userInfo}
                    />
                ) : (
                    <GetList platform={userInfo.platform} type={userInfo.auth}/>
                )}
            </div>
        </div>
    );
}
