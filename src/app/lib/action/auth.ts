/**
 * @Author: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @Date: 2024-10-02 14:43:44
 * @LastEditors: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @LastEditTime: 2025-03-18 14:04:03
 * @FilePath: src/app/lib/action/auth.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

'use server'
import { signIn, signOut} from "@/auth";
import {AuthError} from "@auth/core/errors";


export const signInWithCredentials = async (formData) => {
    try {
        const userId = formData.get('userId');
        const password = formData.get('password');
        
        
        if (!userId || !password) {
            return {
                success: false,
                message: "아이디와 비밀번호를 모두 입력해주세요."
            };
        }

        // signIn 함수 호출 방식 수정
        await signIn('credentials', {
            redirect: false,
            userId : userId,
            userPwd : password
        });

        return {success : true}
    } catch (error) {
        if (error instanceof AuthError) {
            if (error.cause?.err instanceof Error) {
                return {
                    success: false,
                    message : error.cause.err.message
                } // return "custom error"
            }
            switch (error.type) {
                case 'CredentialsSignin':
                    return '잘못된 정보입니다.';
                default:
                    return '로그인 오류입니다.';
            }
        }
        throw error;
    }
};


