import React, { useEffect } from "react";
import "./ProductDetail.scss";
import useData from "../../../../api/product/product_api";
import { useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";

import useImage from "../Scanner&ZoomView/useImage";
import Scanner from "../Scanner&ZoomView/Scanner";
import ZoomView from "../Scanner&ZoomView/ZoomView";

import useCartHook from "./useCartHook/useCartHook";

function ProductDetail() {
    let { _id } = useParams();

    // 이미지 상세정보 가져오기 훅
    const { data, loading, error } = useData(
        "/api/v1/product/getProductDetail",
        _id
    );

    // 이미지 스캐너, 뷰어 훅
    const {
        onMouseMove,
        onMouseLeave,
        imageRect,
        setImageRectRef,
        isMouseOverImage,
        setIsMouseOverImage,
        scannerPosition,
        viewPosition,
    } = useImage(); // useImage 훅을 사용하여 이미지 관련 로직을 가져옵니다.

    // 장바구니 훅
    const { stock, minusStock, plusStock } = useCartHook(data);

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
                <div
                    className="productDetail_left"
                    onMouseMove={onMouseMove}
                    onMouseLeave={onMouseLeave}
                    onMouseOver={() => setIsMouseOverImage(true)}
                >
                    <img
                        className="productDetail_image"
                        src={data?.image}
                        alt={data?.name}
                        ref={setImageRectRef}
                    />
                    {isMouseOverImage && imageRect && scannerPosition && (
                        <Scanner position={scannerPosition} />
                    )}
                    {/* isMouseOverImage가 true일 때만 ZoomView 표시 */}
                    {isMouseOverImage && imageRect && (
                        <ZoomView
                            position={viewPosition}
                            img={data?.image}
                            left={imageRect.width + 480}
                        />
                    )}
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
                            <button
                                className="productdetail_cart_calc_minus"
                                onClick={minusStock}
                            >
                                -
                            </button>
                            <div className="productdetail_cart_calc_stock">
                                <span>{stock.count}</span>
                            </div>
                            <button
                                className="productdetail_cart_calc_plus"
                                onClick={plusStock}
                            >
                                +
                            </button>
                        </div>
                        <div className="productDetail_cart_price">
                            <span>{stock.price} 원</span>
                        </div>
                    </div>
                    <div className="productDetail_total">
                        <div>TOTAL(QUANTITY)</div>
                        <div className="productDetail_total_price">
                            {stock.price} 원 ({stock.count}개)
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
