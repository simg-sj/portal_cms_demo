"use client"
import {useEffect} from "react";
import Login from "@/app/components/login";


export default function Home() {
    useEffect(() => {
        const platform = localStorage.getItem('theme');

        console.log(platform);
    }, [])

    return (
        <div>
            <Login/>
        </div>
  );
}
