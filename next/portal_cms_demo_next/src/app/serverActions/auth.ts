/**
 * @Author: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @Date: 2024-10-02 14:43:44
 * @LastEditors: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @LastEditTime: 2024-10-02 16:55:50
 * @FilePath: portal_cms_demo_next/src/app/serverActions/auth.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

'use server'
import { auth, signIn, signOut} from "@/auth";

export const signInWithCredentials = async (formData : FormData) => {
    console.log(formData)
    await signIn('credentials', {
        email: formData.get('userId') || '',
        password: formData.get('password') || '',
    })
}

export const signOutWithForm = async (userId: string, password: string) => {
    await signOut()
}