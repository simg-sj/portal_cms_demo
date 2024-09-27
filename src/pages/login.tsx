import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import RoundLogo from "../assets/images/logo/simg-round-logo.png";

// 임시 사용자 데이터 (나중에 데이터베이스로 대체)
const users: UserData[] = [
    { userId: 'test', password: '1234', affiliation: 'hiparking' },
    { userId: 'simgTest', password: '1234', affiliation: 'simg' },
];

export default function Login() {
    const [userInfo, setUserInfo] = useState<UserInfo>({
        userId: '',
        password: ''
    });
    const navigate = useNavigate();
    const errorDiv = useRef<HTMLDivElement | null>(null);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserInfo((prev: UserInfo) => ({ ...prev, [name]: value }));
    };

    const onClickHandler = (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
        e.preventDefault();

        const user = users.find(u => u.userId === userInfo.userId && u.password === userInfo.password);

        if (user) {
            // 사용자 인증 성공
            localStorage.setItem('theme', user.affiliation);
            navigate('/hiparking/dashboard');
        } else {
            // 사용자 인증 실패
            if (errorDiv.current) {
                errorDiv.current.style.display = "block";
            }
        }
    };

    return (
        <div className={'w-screen h-screen relative flex justify-center items-center bg-gray-50'}>
            <div className={'w-[670px] px-12 py-36 bg-white flex flex-col items-center absolute shadow-md'}>
                <img src={RoundLogo} alt={'SIMG 로고'} width={80} className={'mb-10'}/>
                <div className={'text-gray-500 text-center py-3'}>에스아이엠지 업체 관리자 페이지 입니다. <br/> 회원가입 및 아이디 비밀번호 찾기는 관리자에게 문의해주세요.</div>
                <div className={'w-[80%] my-5'}>
                    <div className={'text-lg mt-3'}>ID</div>
                    <input type={'text'} className={'px-3 w-full h-10'} placeholder={'아이디를 입력해주세요'} name='userId'
                           onChange={onChangeHandler}/>
                    <div className={'text-lg mt-3'}>Password</div>
                    <input type={'password'} className={'px-3 w-full h-10'} placeholder={'비밀번호를 입력해주세요'}
                           name='password' onChange={onChangeHandler}/>
                </div>
                <div ref={errorDiv} className={'text-red-500 mt-2 hidden'}>아이디 혹은 비밀번호가 틀립니다. 다시 입력 해주세요</div>
                <button className={'text-xl text-white px-10 py-3 rounded-xl bg-[#5C7DED] mt-5 w-[80%] font-medium'}
                        onClick={onClickHandler}>Login
                </button>
            </div>
        </div>
    );
}