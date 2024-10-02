"use client"
import {useEffect, useRef, useState} from "react";
import Login from "@/app/components/login";

// 임시 사용자 데이터 (나중에 데이터베이스로 대체)
const users: UserData[] = [
    { userId: 'test', password: '1234', affiliation: 'hiparking' },
    { userId: 'simgTest', password: '1234', affiliation: 'simg' },
];
export default function Home() {
    useEffect(() => {
        let platform = localStorage.getItem('theme');

        console.log(platform);
    }, [])

    return (
        <div>
            <Login/>
        </div>
  );
}
