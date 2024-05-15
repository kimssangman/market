import React from "react";
import "./Cart.scss";
import useFetch from "../../../hooks/useFetch";
import { decodedToken } from "../../../api/auth/jwt_api";
import { BeatLoader } from "react-spinners";

function Cart() {
    // 토큰 정보 가져오기
    const token = decodedToken();

    /**--------------------------------
     * 장바구니 리스트
     --------------------------------*/
    const { data, loading, error } = useFetch(
        "/api/v1/cart/getCarts",
        token._id
    );

    if (loading) {
        return (
            <div className="spinner_wrap">
                <BeatLoader color="#36d7b7" size={20} className="spinner" />
            </div>
        );
    }

    if (error) {
        return <div>Error fetching data</div>;
    }

    return (
        <div className="cart_container">
            <div className="cart_wrap">
                <div className="cart_summary">
                    <div>
                        <p className="total_price">
                            총 수량: {data.carts.length}개
                        </p>
                        <p className="total_price">
                            총 결제 금액: {data?.total[0].total} 원
                        </p>
                    </div>

                    <button className="checkout_button">구매하기</button>
                </div>
                {data.carts?.map((product, index) => (
                    <div className="cart_item" key={index}>
                        <img
                            src={product.image}
                            alt={product.name}
                            className="cart_item_image"
                        />
                        <div className="cart_item_details">
                            <h3 className="cart_item_name">{product.name}</h3>
                            <p className="cart_item_quantity">
                                수량: {product.count} 개
                            </p>
                            <p className="cart_item_price">
                                가격: {product.total} 원
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Cart;
