/**
 * @Author: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @Date: 2024-10-02 14:43:44
 * @LastEditors: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @LastEditTime: 2024-10-04 18:00:05
 * @FilePath: portal_cms_demo_next/src/app/serverActions/auth.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

'use server'
import { auth, signIn, signOut} from "@/auth";
import {redirect} from "next/navigation";
import {router} from "next/client";

export const signInWithCredentials = async (formData : FormData) => {
    try {
        const userId = formData.get('userId');
        const password = formData.get('password');
        
        
        if (!userId || !password) {
            return {
                success: false,
                error: "아이디와 비밀번호를 모두 입력해주세요."
            };
        }

        // signIn 함수 호출 방식 수정
        const result = await signIn('credentials', {
            redirect: false,
            userId : userId,
            password : password
        });

        console.log('SignIn Result:', result); // 디버깅용 로그

        if (result?.error) {
            return {
                success: false,
                error: result.error
            };
        }else {
            return {
                success: true,
            }
        }

    } catch (error) {
        console.error('Login error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다."
        };
    }
};


export const signOutWithForm = async () => {
    try {
        let result = await signOut();
        console.log("result ::::", result);
        if(result) return {
            success: true,
        }
    } catch (error) {
        return {
            success: false,
            error: "로그아웃 중 오류가 발생했습니다."
        };
    }
}