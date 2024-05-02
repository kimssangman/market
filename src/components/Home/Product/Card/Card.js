import React, { useEffect, useState } from "react";
import "./Card.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import LazyLoad from "react-lazyload";
import useProductData from "../../../../api/product/product_pagination_hook";
import { useNavigate } from "react-router-dom";

function Card() {
    let navigate = useNavigate();

    const [page, setPage] = useState(1);

    const {
        data: products,
        isLoading,
        hasMore,
    } = useProductData("/api/v1/product/getProduct", page);

    const handleScroll = () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop =
            window.pageYOffset || document.documentElement.scrollTop;

        if (windowHeight + scrollTop >= documentHeight && hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [hasMore]);

    return (
        <div className="card_container">
            {isLoading
                ? Array.from({ length: 5 }).map((_, index) => (
                      <div className="card" key={index}>
                          <Skeleton width={210} height={210} />
                          <div className="card_body">
                              <Skeleton />
                              <Skeleton />
                              <Skeleton />
                              <Skeleton />
                          </div>
                      </div>
                  ))
                : products.map((product, index) => (
                      <LazyLoad key={index} height={200} once>
                          <div
                              className="card"
                              key={index}
                              onClick={() =>
                                  navigate(`/product/${product._id}`)
                              }
                          >
                              <img
                                  className="card_image"
                                  src={product.image}
                                  alt={product.name}
                              />
                              <div className="card_body">
                                  <h5 className="card_title">{product.name}</h5>
                                  <p className="card_text">
                                      {product.description}
                                  </p>
                                  <p className="card_price">
                                      {product.price} 원
                                  </p>
                                  <button className="btn btn_primary">
                                      Add to Cart
                                  </button>
                              </div>
                          </div>
                      </LazyLoad>
                  ))}
            {!hasMore && <h4 className="no_more">더 이상 상품이 없습니다.</h4>}
        </div>
    );
}

export default Card;
