import React, { useEffect, useState } from "react";
import "./Card.scss";
// import Products from "../../../../api/product/product_api"; // Products를 가져옵니다.
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import LazyLoad from "react-lazyload";
import useData from "../../../../api/custom_hook/useData_api";

function Card() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1); // 페이지 번호를 관리합니다.
    const [hasMore, setHasMore] = useState(true);

    /**---------------------------------
     * 커스텀 훅 테스트
     ---------------------------------*/
    const { data, loading, error } = useData("/api/v1/product/getProduct");

    /**---------------------------------
     * 무한 스크롤 시 스크롤 이벤트 등록
     ---------------------------------*/
    useEffect(() => {
        fetchData(); // 처음에 한 번만 호출
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    /**---------------------------------
     * 스크롤 이벤트 핸들러
     * 
     * 현재 window의 높이와 element의 높이를 비교하여 스크롤 위치를 감지
     * 스크롤이 문서의 끝에 도달하고 더 많은 데이터가 있는 경우 페이지 번호를 증가
     ---------------------------------*/
    const handleScroll = () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop =
            window.pageYOffset || document.documentElement.scrollTop;

        if (windowHeight + scrollTop >= documentHeight - 100 && hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    /**---------------------------------
     * 데이터 가져오기 함수
     * 
     * 데이터가 로드되지 않았을 경우 함수를 종료
     * 페이지당 5개씩 데이터를 가져와서 상태를 업데이트
     * 가져온 데이터가 없는 경우 더 이상 데이터를 가져올 수 없음을 표시
     * 상품 목록과 로딩 상태를 업데이트
     ---------------------------------*/
    const fetchData = () => {
        if (!data) {
            return; // 데이터가 아직 로드되지 않았으면 함수 종료
        }

        const startIndex = (page - 1) * 5; // 페이지당 5개씩 데이터를 가져오기 위한 시작 인덱스 계산
        const newProducts = data.slice(startIndex, startIndex + 5); // 현재 페이지에 해당하는 데이터를 추출
        if (newProducts.length === 0) {
            setHasMore(false); // 가져온 데이터가 없는 경우 더 이상 데이터를 가져올 수 없음을 표시
        }
        setProducts((prevProducts) => [...prevProducts, ...newProducts]); // 상품 목록 상태 업데이트
        setIsLoading(false); // 로딩 상태 업데이트
    };

    useEffect(() => {
        fetchData(); // 데이터가 변경될 때마다 fetchData 함수 호출
    }, [data, page]); // data가 변경될 때마다 fetchData 함수 호출

    return (
        <div className="card_container">
            {products.map((product, index) => (
                <LazyLoad key={index} height={200} once>
                    <div className="card" key={index}>
                        {isLoading ? (
                            <Skeleton width={210} height={210}></Skeleton>
                        ) : (
                            <img
                                className="card_image"
                                src={product.image}
                                alt={product.name}
                            />
                        )}

                        <div className="card_body">
                            {isLoading ? (
                                <Skeleton></Skeleton>
                            ) : (
                                <h5 className="card_title">{product.name}</h5>
                            )}
                            {isLoading ? (
                                <Skeleton></Skeleton>
                            ) : (
                                <p className="card_text">
                                    {product.description}
                                </p>
                            )}
                            {isLoading ? (
                                <Skeleton></Skeleton>
                            ) : (
                                <p className="card_price">${product.price}</p>
                            )}
                            {isLoading ? (
                                <Skeleton></Skeleton>
                            ) : (
                                <button className="btn btn_primary">
                                    Add to Cart
                                </button>
                            )}
                        </div>
                    </div>
                </LazyLoad>
            ))}
            {!hasMore ? <h4>더이상 상품이 없습니다.</h4> : <></>}
        </div>
    );
}

export default Card;
