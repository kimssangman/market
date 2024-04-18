import React, { useEffect, useState } from "react";
import "./Card.scss";
import Product from "../../../../api/product/product_api";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import LazyLoad from "react-lazyload";
import InfiniteScroll from "react-infinite-scroll-component";

function Card() {
    const [product, setProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // 이미지 로딩 상태

    useEffect(() => {
        setProduct(Product);

        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    }, []);

    return (
        <div className="card_container">
            {product.map((product, index) => (
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
        </div>
    );
}

export default Card;
