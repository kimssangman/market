import { useState, useEffect } from "react";
import axios from "axios";

function useData(url, _id) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url, { params: { _id } });
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
