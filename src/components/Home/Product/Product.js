import React from "react";
import "./Product.scss";
import Card from "./Card/Card";

function Product() {
    return (
        <div className="product">
            <div className="title">
                <div>
                    <h4>상품 목록</h4>
                </div>
                <div>
                    <p>항상 신선한 제품만 제공하도록 약속하겠습니다.</p>
                </div>
            </div>

            <div>
                <Card></Card>
            </div>
        </div>
    );
}

export default Product;
