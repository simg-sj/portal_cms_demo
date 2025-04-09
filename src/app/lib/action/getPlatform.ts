/**
 * @Author: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @Date: 2024-10-02 17:57:22
 * @LastEditors: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @LastEditTime: 2024-10-02 17:58:09
 * @FilePath: portal_cms_demo_next/src/app/serverActions/getPlatform.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */


'use server'

import {auth} from "@/auth";

export default async function getPlatform() {
    return await auth();
}