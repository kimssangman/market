import React from "react";
import "./ProductDetail.scss";
import useData from "../../../../api/product/product_api";
import { useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";

function ProductDetail() {
    let { _id } = useParams();

    const { data, loading, error } = useData(
        "/api/v1/product/getProductDetail",
        _id
    );

    console.log(data);

    if (loading) {
        return (
            <div className="spinner_wrap">
                <BeatLoader color="#36d7b7" size={20} className="spinner" />
            </div>
        );
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="productDetail_container">
            <div className="productDetail_wrap">
                <div className="productDetail_left">
                    <img
                        className="productDetail_image"
                        src={data?.image}
                        alt={data?.name}
                    />
                </div>
                <div className="productDetail_right">
                    <div className="productDetail_dec_wrap">
                        <div className="productDetail_dec_title">
                            <span>{data?.name}</span>
                        </div>
                        <div className="productDetail_dec_contents">
                            <div className="productDetail_dec_content">
                                <div className="productDetail_dec_content_left">
                                    <strong>
                                        <span>판매가</span>
                                    </strong>
                                </div>
                                <div className="productDetail_dec_content_right">
                                    <strong>
                                        <span>{data?.price} 원</span>
                                    </strong>
                                </div>
                            </div>
                            <div className="productDetail_dec_content">
                                <div className="productDetail_dec_content_left">
                                    <span>배송방법</span>
                                </div>
                                <div className="productDetail_dec_content_right">
                                    <span>택배</span>
                                </div>
                            </div>
                            <div className="productDetail_dec_content">
                                <div className="productDetail_dec_content_left">
                                    <span>배송비</span>
                                </div>
                                <div className="productDetail_dec_content_right">
                                    <span>
                                        2,500원 (50,000원 이상 구매시 무료)
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="productDetail_cart">
                        <div className="productDetail_cart_name">
                            <span>{data?.name}</span>
                        </div>
                        <div className="productDetail_cart_calc">
                            <button className="productdetail_cart_calc_minus">
                                -
                            </button>
                            <div className="productdetail_cart_calc_stock">
                                <span>1</span>
                            </div>
                            <button className="productdetail_cart_calc_plus">
                                +
                            </button>
                        </div>
                        <div className="productDetail_cart_price">
                            <span>{data?.price} 원</span>
                        </div>
                    </div>
                    <div className="productDetail_total">
                        <div>TOTAL(QUANTITY)</div>
                        <div className="productDetail_total_price">
                            {data?.price} 원 (1개)
                        </div>
                    </div>
                    <div className="productDetail_btn">
                        <div className="productDetail_btn_buy">BUY IT NOW</div>
                        <div className="productDetail_btn_cart">CART</div>
                        <div className="productDetail_btn_wish">WISH LIST</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
