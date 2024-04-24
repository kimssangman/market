// 커스텀 훅 예제

import { useState, useEffect } from "react";
import axios from "axios";

function useAxios(url) {
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

export default useAxios;
