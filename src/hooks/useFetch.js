/**--------------------------
 * get fetch 커스텀 훅
 * 
 * 이거 참조해라 상민아.
 --------------------------*/

import { useState, useEffect } from "react";
import axios from "axios";

function useFetch(url, _id) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get(url, { params: { _id } });
            setData(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [url, _id]);

    return { data, loading, error, fetchData };
}

export default useFetch;
