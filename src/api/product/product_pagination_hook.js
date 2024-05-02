import { useEffect, useState } from "react";
import axios from "axios";

export default function useProductData(url, page) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        fetchData();
    }, [page]);

    async function fetchData() {
        try {
            const response = await axios.get(url, {
                params: { page, limit: 5 }, // 한 페이지당 5개의 데이터만 가져오도록 설정
            });
            const newData = response.data;

            if (newData.length === 0) {
                setHasMore(false);
            }

            setData((prevData) => [...prevData, ...newData]);
            setIsLoading(false); // 데이터를 받은 후에 로딩 상태를 false로 변경
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    return { data, isLoading, hasMore };
}
