import React, { useEffect } from "react";
import "./HomePage.scss";
import Banner from "../../components/Home/Banner/Banner";
import Product from "../../components/Home/Product/Product";
import { useLocation } from "react-router-dom";

function HomePage() {
    /**------------------------------------
     * 동적 타이틀 변경
     ------------------------------------*/
    const location = useLocation();

    useEffect(() => {
        // 홈페이지의 타이틀 설정
        document.title = "신선마켓";
    }, [location]);
    /**---------------------------------- */

    return (
        <div className="homePage">
            <div>
                <Banner></Banner>
            </div>
            <div>
                <Product></Product>
            </div>
        </div>
    );
}

export default HomePage;
