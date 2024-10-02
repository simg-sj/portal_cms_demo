import axios, {InternalAxiosRequestConfig, AxiosResponse, AxiosInstance, AxiosError} from 'axios';
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {loadingActions} from "../redux/slice/authSlice";


// Axios 인스턴스를 생성하는 함수
const createApiInstance = (baseURL: string, headers: Record<string, string>): AxiosInstance => {
    return axios.create({
        baseURL,
        headers,
        timeout: 5000,
    });
};
// 인스턴스 생성
const centerAPi = createApiInstance("https://center-api.simg.kr/api/v1/prod/", {
    "Content-Type": "application/json",
    "X-API-SECRET": 'B9452A8B-C7A4-4712-A823-77EB5BC647F2',
});


const pitinApi = createApiInstance('https://pitin-ev.simg.kr/api/v1/prod/', {
    "Content-Type": "application/json",
    'X-API-SECRET': '40078030-F15D-11EE-8CAD-550F9CAFDA95'
});

const useAxiosInterceptors = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const setUpInterceptors = (apiInstance: AxiosInstance) => {
            apiInstance.interceptors.request.use(
                (config: InternalAxiosRequestConfig) => {
                    let token = localStorage.getItem("token");
                    if(token) config.headers['X-ACCESS-TOKEN'] = token;
                    dispatch(loadingActions.GLOBAL_LOADING());
                    return config;
                },
                (error: AxiosError) => {
                    dispatch(loadingActions.GLOBAL_LOADED());
                    return Promise.reject(error);
                }
            );

            apiInstance.interceptors.response.use(
                (response: AxiosResponse) => {
                    let token = response.data.accessToken;
                    if(token){
                        localStorage.setItem('token', response.data.accessToken);
                    }
                    dispatch(loadingActions.GLOBAL_LOADED());
                    return response;
                },
                async (error: AxiosError) => {
                    const {response} = error;
                    // @ts-ignore
                    if (response.status === 401) {
                        alert('세션 유효기간 만료');
                        localStorage.clear();
                        window.location.reload();
                    }
                    dispatch(loadingActions.GLOBAL_LOADED());
                    return Promise.reject(error);
                }
            );
        };

        // 두 인스턴스에 동일한 인터셉터 설정
        setUpInterceptors(adminBulk);
        setUpInterceptors(pitinApi);
    }, [dispatch]);
};

// 응답 인터셉터


export {useAxiosInterceptors, adminBulk,pitinApi } ;
