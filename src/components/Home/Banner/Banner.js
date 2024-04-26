import React, { useEffect, useState } from "react";
import "./Banner.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Banner() {
    const [isLoading, setIsLoading] = useState(true); // 이미지 로딩 상태
    const [currentImageIndex, setCurrentImageIndex] = useState(0); // 현재 이미지 인덱스
    const images = [
        "/images/banner1.jpg",
        "/images/banner2.jpg",
        "/images/banner3.jpg",
    ]; // 이미지 배열

    // 이미지 로딩 후 로딩 상태 변경
    useEffect(() => {
        setIsLoading(false);
    }, []);

    // 다음 이미지로 이동하는 함수
    const nextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    // 일정한 시간 간격으로 이미지 변경
    useEffect(() => {
        const intervalId = setInterval(nextImage, 5000); // 5초마다 이미지 변경
        return () => clearInterval(intervalId); // 컴포넌트가 언마운트될 때 인터벌 해제
    }, []);

    // 특정 인덱스의 이미지로 이동하는 함수
    const goToImage = (index) => {
        setCurrentImageIndex(index);
    };

    return (
        <div>
            {isLoading ? (
                <div className="banner">
                    <Skeleton width="1000px" height="540px" />
                </div>
            ) : (
                <div className="banner">
                    <img
                        src={images[currentImageIndex]}
                        alt={`Banner ${currentImageIndex + 1}`}
                        className="banner_image"
                    />
                    <div className="banner_des">
                        <p className="banner_text ">
                            <strong>FRESH MARKET</strong>
                        </p>
                        <p className="banner_text banner_text_des">
                            We'll Deliver
                        </p>
                        <p className="banner_text banner_text_des">
                            Everything
                        </p>
                        <p className="banner_text banner_text_des">You Need</p>

                        <button className="banner_btn">SHOP ONLINE</button>
                    </div>

                    <div className="banner_footer_wrap">
                        {images.map((image, index) => (
                            <button
                                key={index}
                                className={`banner_footer_btn ${
                                    currentImageIndex === index ? "active" : ""
                                }`}
                                onClick={() => goToImage(index)}
                            ></button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Banner;
