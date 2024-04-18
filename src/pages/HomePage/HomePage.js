import React from "react";
import "./HomePage.scss";
import Banner from "../../components/Home/Banner/Banner";
import Product from "../../components/Home/Product/Product";

function HomePage() {
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
