// Card.js
import React, { useEffect, useState } from "react";
import "./Card.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import LazyLoad from "react-lazyload";
import useProductData from "../../../../api/product/product_pagination_hook";

function Card() {
    /**-----------------------------
     * 페이지 번호 상태 관리
     -----------------------------*/
    const [page, setPage] = useState(1);

    /**-----------------------------
     * 페이지에 따른 데이터를 가져오기 위한 커스텀 훅 사용
     * 
     * 커스텀 훅 내부에 useEffect의 의존성 배열에 page가 들어있기 때문에, 
     * page 값이 변경될 때마다 fetchData 함수가 실행되어 새로운 데이터를 가져오게 된다.
     * 
     * 이것이 React 훅을 사용하는 이유
     -----------------------------*/
    const {
        data: products,
        isLoading,
        hasMore,
    } = useProductData("/api/v1/product/getProduct", page);

    /**-----------------------------
     * 페이지가 변경될 때마다 스크롤 이벤트 등록/해제
     -----------------------------*/
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [page]);

    /**-----------------------------
     * 스크롤 이벤트 핸들러
     * 
     * 여기서 스크롤에 따른 페이지를 업데이트 시켜준다.
     * 
     * product_pagination_hook에서 useEffect로 page를 바라보고 있기 때문에
     * 업데이트 되면 product_pagination_hook에서 axios를 처리하고 새로운 data를 반환한다.
     -----------------------------*/
    const handleScroll = () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop =
            window.pageYOffset || document.documentElement.scrollTop;

        if (windowHeight + scrollTop >= documentHeight - 100 && hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    };

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
