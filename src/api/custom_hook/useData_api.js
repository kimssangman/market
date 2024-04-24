/**-------------------------------------
 * 커스텀 훅 (custom hook)
 * 
 * get 요청 시 api url만 보내 값을 받는다.
 -------------------------------------*/

import { useState, useEffect } from "react";
import axios from "axios";

function useData(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                setData(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();

        return () => {
            // Cleanup if needed
        };
    }, [url]);

    return { data, loading, error };
}

export default useData;
