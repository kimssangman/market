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
                    <div>
                        <div>
                            <span>이름</span>
                        </div>
                        <div>
                            <div>
                                <span>판매가</span>
                                <span>판매가</span>
                            </div>
                            <div>
                                <span>배송방법</span>
                                <span>택배</span>
                            </div>
                            <div>
                                <span>배송비</span>
                                <span>2,500원 (50,000원 이상 구매시 무료)</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>이름</div>
                        <div>버튼</div>
                        <div>10000원</div>
                    </div>
                    <div>
                        <div>TOTAL(QUANTITY)</div>
                        <div>10000원(1개)</div>
                    </div>
                    <div>
                        <div>BUY IT NOW</div>
                        <div>CART</div>
                        <div>WISH LIST</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
