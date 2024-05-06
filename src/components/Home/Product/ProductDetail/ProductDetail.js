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

    const [scannerPosition, setScannerPosition] = useState({
        left: null,
        top: null,
    });
    const [viewPosition, setViewPosition] = useState({ left: null, top: null });

    const scannerWidth = 100; // 스캐너의 너비 설정
    const scannerHeight = 100; // 스캐너의 높이 설정

    const onMouseMove = (e) => {
        if (!isMouseOverImage || !imageRect) {
            setScannerPosition({ left: null, top: null }); // 마우스가 이미지를 벗어나면 스캐너 위치를 초기화합니다.
            setViewPosition({ left: null, top: null }); // 뷰어 위치도 초기화합니다.
            return;
        }

        // 마우스 위치에 따라 스캐너 및 뷰어 위치를 설정합니다.
        const scannerPosLeft = e.clientX - scannerWidth / 2 - 80;
        const scannerPosTop = e.clientY - scannerHeight / 2 - 80;

        // 스캐너 위치 허용 값 계산
        const allowedPosLeft =
            scannerPosLeft >= imageRect.x &&
            scannerPosLeft <=
                imageRect.x + imageRect.width - scannerWidth - 150;
        const allowedPosTop =
            scannerPosTop >= imageRect.y &&
            scannerPosTop <=
                imageRect.y + imageRect.height - scannerHeight - 150;

        // 스캐너 이미지 벗어날 때 위치 값 설정
        if (allowedPosLeft) {
            scannerPosition.left = Math.max(
                imageRect.x,
                Math.min(
                    imageRect.x + imageRect.width - scannerWidth,
                    scannerPosLeft
                )
            );
        }
        if (allowedPosTop) {
            scannerPosition.top = Math.max(
                imageRect.y,
                Math.min(
                    imageRect.y + imageRect.height - scannerHeight,
                    scannerPosTop
                )
            );
        }

        // 스캐너 위치 값 설정
        setScannerPosition({ ...scannerPosition });

        // 뷰어 위치 값 설정
        setViewPosition({
            left: -((scannerPosition.left - imageRect.x) * 2),
            top: -((scannerPosition.top - imageRect.y) * 2),
        });
    };

    const onMouseLeave = () => {
        setIsMouseOverImage(false); // 이미지를 벗어나면 마우스 상태 업데이트
        setScannerPosition({ left: null, top: null }); // 스캐너 위치 초기화
        setViewPosition({ left: null, top: null }); // 뷰어 위치 초기화
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
