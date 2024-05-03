import React, { useState } from "react";
import "./ProductDetail.scss";
import useData from "../../../../api/product/product_api";
import { useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import Scanner from "../Scanner&ZoomView/Scanner";
import useClientRect from "../Scanner&ZoomView/useClientReact";
import ZoomView from "../Scanner&ZoomView/ZoomView";

function ProductDetail() {
    let { _id } = useParams();

    const { data, loading, error } = useData(
        "/api/v1/product/getProductDetail",
        _id
    );

    /**-------------------------------------------------------------------------------------
     * 이미지 확대 기능
     ------------------------------------*/
    const [imageRect, setImageRectRef] = useClientRect();
    const [isMouseOverImage, setIsMouseOverImage] = useState(false); // 이미지 위에 마우스가 있는지 여부를 상태로 관리

    const [scannerPosition, setScannerPosition] = useState({ left: 0, top: 0 });
    const [viewPosition, setViewPosition] = useState({ left: 0, top: 0 });

    const scannerWidth = 100; // 스캐너의 너비 설정
    const scannerHeight = 100; // 스캐너의 높이 설정

    const onMouseMove = (e) => {
        if (!isMouseOverImage || !imageRect) {
            return; // 이미지가 로딩되지 않았거나 마우스가 이미지 위에 없는 경우 함수 종료
        }

        // 마우스 위치 계산 및 스캐너 위치 설정
        const scannerLeft = e.pageX - scannerWidth / 2 - 80;
        const scannerTop = e.pageY - scannerHeight / 2 - 80;

        // 스캐너가 이미지 영역을 벗어나지 않도록 조정
        const left = Math.max(
            0,
            Math.min(imageRect.width - scannerWidth, scannerLeft)
        );
        const top = Math.max(
            0,
            Math.min(imageRect.height - scannerHeight, scannerTop)
        );

        setScannerPosition({ left, top });

        setViewPosition({
            left: scannerPosition.left * -1,
            top: scannerPosition.top * -1,
        });
    };

    const onMouseLeave = () => {
        setIsMouseOverImage(false); // 이미지를 벗어나면 마우스 상태 업데이트
        setScannerPosition({ left: 0, top: 0 }); // 스캐너 위치 초기화
        setViewPosition({ left: 0, top: 0 }); // 스캐너 위치 초기화
    };
    /**------------------------------------------------------------------------------------- */

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
                            left={imageRect.width + 20}
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
