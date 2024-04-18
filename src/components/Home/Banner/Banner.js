import { useEffect, useState } from "react";
import "./Banner.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Banner() {
    const [isLoading, setIsLoading] = useState(true); // 이미지 로딩 상태

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    }, []);

    return (
        <div>
            {isLoading ? (
                <div className="banner">
                    <Skeleton width="1000px" height="540px" />
                </div>
            ) : (
                <div
                    className="banner"
                    style={{
                        backgroundImage: "url(/images/banner.jpg",
                        backgroundSize: "100%",
                    }}
                >
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
                </div>
            )}
        </div>
    );
}

export default Banner;
