/**
 * @Author: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @Date: 2024-10-08 13:19:02
 * @LastEditors: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @LastEditTime: 2024-10-08 13:23:23
 * @FilePath: portal_cms_demo_next/src/app/lib/customHook/inputChange.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */


import { useState } from 'react';

interface CounselData {
    [key: string]: any;
}

interface ChangeCounselData {
    [key: string]: any;
}

interface Data {
    counselData: CounselData[];
    changeData: ChangeCounselData[];
}

const useInputChange = (initialData: Data) => {
    const [data, setData] = useState<Data>(initialData);

    const handleInputChange = (
        index: number,
        field: keyof CounselData | keyof ChangeCounselData,
        value: string
    ) => {
        const updatedData = { ...data };

        if (field in updatedData.counselData[index]) {
            updatedData.counselData[index] = {
                ...updatedData.counselData[index],
                [field]: value.replace(/,/g, ''),
            };
        } else {
            updatedData.changeData[index] = {
                ...updatedData.changeData[index],
                [field]: value.replace(/,/g, ''),
            };
        }

        setData(updatedData);
    };

    return {
        data,
        handleInputChange,
        setData,
    };
};

export default useInputChange;
