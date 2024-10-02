import {adminBulk, pitinApi} from "./axiosInstans";


/*export const sendMsg = async (cell : string | undefined, msg : string) => {
    try {
        let param = {
            gubun : 'S',
            msg : msg,
            cell : cell,
            upk : 6
        }
        const { data } = await pitinApi.post('/sendMsg', param);
        if (!data || data.length === 0) {
            alert('메시지가 전송되었습니다.');
            return [];
        }

        return data;
    } catch (e) {
        alert('서비스 오류입니다(조회). \n본사에 문의주시기 바랍니다. \n');
        throw e;
    }
}




export const updateUser = async<T = ResEdit> (param : EreqParam) : Promise<T>  => {
    try {
        const { data } = await pitinApi.post<T>('/sendMsg', param);
        return data;
    } catch (e) {
        alert('서비스 오류입니다(조회). \n본사에 문의주시기 바랍니다. \n');
        throw e;
    }
}

export const newUser = async<T = ResEdit> (param : EreqParam) : Promise<T> => {
    try {
        const { data } = await pitinApi.post<T>('/reservation', param);
        return data;
    } catch (e) {
        alert('서비스 오류입니다(조회). \n본사에 문의주시기 바랍니다. \n');
        throw e;
    }
}


export const memoService = async <T = Memo>(param : memoParam) : Promise<T[]> => {
    try{
        let {data} = await pitinApi.post<T[]>('/memoService', param);

        return data;
    }catch (e) {
        alert('서비스 오류입니다(조회). \n본사에 문의주시기 바랍니다. \n');
        throw e;
    }
}

export const deleteUser = async <T = ResEdit> (param : EreqParam) : Promise<T> => {
    try {
        const { data } = await pitinApi.post<T>('/deleteUser', param);
        return data;
    } catch (e) {
        alert('서비스 오류입니다(조회). \n본사에 문의주시기 바랍니다. \n');
        throw e;
    }
}

export const login = async <T = ResEdit> (param : EreqParam) : Promise<T> => {
    try {
        const { data } = await pitinApi.post<T>('/deleteUser', param);
        return data;
    } catch (e) {
        alert('서비스 오류입니다(조회). \n본사에 문의주시기 바랍니다. \n');
        throw e;
    }
}




export const convertToMemoType = (data: Memo[]): MemoType[] => {
    return data.map(memo => ({
        bopk: memo.bopk,
        title: memo.title,
        group_depth : memo.group_depth,
        contents: memo.contents,
        created_ymd: dayjs(memo.created_ymd).format('YYYY-MM-DD HH:mm:ss'),
    }));
}


export const fetchData = async<T = Person> (param : reParam) : Promise<T[] | undefined> => {
        const { data } = await adminBulk.post<T[]>('/searchData',param);
        if(data.length <= 0 ){
            alert("데이터가 없습니다.")
        }else {
            return data;
        }
};*/
