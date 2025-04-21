import { useState, useEffect } from 'react';
import {getPolicyList} from "@/app/(Navigation-Group)/action";

const useFetchPnoList = (bpk: number) => {
    const [pNoList, setPnoList] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);


    const fetchData = async () => {
        try {

            setLoading(true);
            const result = await getPolicyList(bpk);


            setPnoList(result);

        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);



    return {
        pNoList,
        loading,
        error,
    };
};

export default useFetchPnoList;
