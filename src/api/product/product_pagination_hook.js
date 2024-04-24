/**---------------------------------
 * 커스텀 훅 (custom hook)
 ---------------------------------*/
import { useEffect, useState } from "react";
import axios from "axios";

export default function useProductData(url, page) {
    const [data, setData] = useState([]); // 데이터 배열
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태
    const [hasMore, setHasMore] = useState(true); // 데이터가 더 존재하는지 여부 파악

    /**----------------------------------------------------------
     * 5)
     * 페이지가 변경될 때마다 데이터를 다시 가져오기 위해 useEffect 사용
     ----------------------------------------------------------*/
    useEffect(() => {
        fetchData();
    }, [page]);

    /**-----------------------------------
     * 6)
     * 데이터를 가져오는 비동기 함수
     -----------------------------------*/
    async function fetchData() {
        try {
            const response = await axios.get(url, { params: { page } });
            const newData = response.data;

            /**-----------------------------------
            * 받아온 데이터가 없는 경우, 
            * 더 이상 데이터가 없다고 표시하기 위해 hasMore 상태 변경
            -----------------------------------*/
            if (newData.length === 0) {
                setHasMore(false);
            }

            /**-----------------------------------
            * 기존 데이터와 새로운 데이터 합치기
            -----------------------------------*/
            setData((prevData) => [...prevData, ...newData]);
            setIsLoading(false); // 로딩 상태 변경
        } catch (error) {
            console.error("Error fetching data:", error); // 데이터를 가져오는 중 오류 발생 시 콘솔에 로그 출력
        }
    }

    /**-----------------------------------------------------------
    * 데이터, 로딩 상태, 데이터가 더 존재하는지 여부 파악 반환하는 훅
    -----------------------------------------------------------*/
    return { data, isLoading, hasMore };
}
