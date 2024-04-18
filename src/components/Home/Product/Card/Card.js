import React, { useEffect, useState } from "react";
import "./Card.scss";
import Products from "../../../../api/product/product_api"; // Products를 가져옵니다.
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import LazyLoad from "react-lazyload";

function Card() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1); // 페이지 번호를 관리합니다.
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        fetchData();
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const fetchData = () => {
        // 서버에서 데이터를 가져오는 비동기 호출을 수행합니다.
        // 예를 들어, fetch나 axios를 사용하여 서버에 요청을 보냅니다.
        // 실제로는 서버로부터 데이터를 가져와야 합니다.
        const newProducts = Products.slice((page - 1) * 10, page * 10);
        if (newProducts.length === 0) {
            setHasMore(false);
        }
        setProducts((prevProducts) => [...prevProducts, ...newProducts]);
        setIsLoading(false);
    };

    const handleScroll = () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop =
            window.pageYOffset || document.documentElement.scrollTop;
        if (
            windowHeight + scrollTop >= documentHeight - 100 &&
            hasMore &&
            !isLoading
        ) {
            setPage((prevPage) => prevPage + 1);
            fetchData();
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
            {isLoading && <h4>Loading...</h4>}
        </div>
    );
}

export default Card;
