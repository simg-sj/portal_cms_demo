/**
 * @Author: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @Date: 2024-10-02 14:43:44
 * @LastEditors: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @LastEditTime: 2024-10-04 11:23:20
 * @FilePath: portal_cms_demo_next/src/app/serverActions/auth.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

'use server'
import { auth, signIn, signOut} from "@/auth";
import {redirect} from "next/navigation";
import {router} from "next/client";

export const signInWithCredentials = async (formData : FormData) => {
    await signIn('credentials', {
        id : formData.get('userId') || '',
        password: formData.get('password') || '',
        redirectTo : '/'
    })
    
    
}

export const signOutWithForm = async () => {
    await signOut()
}