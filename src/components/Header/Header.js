import { useState, useEffect, useRef } from "react";
import "./Header.scss";
import { CiDeliveryTruck } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../store/atoms/index";
import { DecodingInfo, isExpired } from "../../api/auth/jwt_api";
import { useQuery } from "react-query";
import { getCarts } from "../../api/cart/cart_index.js";
import eventBus from "../../eventBus/eventBus.js";
import useFetch from "../../hooks/useFetch.js";
import axios from "axios";

function Header() {
    const [showMenu, setShowMenu] = useState(false);
    const currentUserState = useRecoilValue(userState);
    const [userName, setUserName] = useState(null); // 사용자 이름 상태 추가
    const dropdownRef = useRef(null);
    const token = localStorage.getItem("token");
    const decodedToken = DecodingInfo(token);
    const navigate = useNavigate();

    /**-------------------------------
     * JWT에서 사용자 정보 가져오기
     * 토큰 만료 확인
     -------------------------------*/
    useEffect(() => {
        const name = localStorage.getItem("name");

        const fetchUserInfo = async () => {
            try {
                /**-------------------------------
                * JWT에서 토큰 만료됐는지 확인
                -------------------------------*/
                const token_isExpired = isExpired(decodedToken?.exp);
                if (token_isExpired) {
                    alert("로그인 토큰 만료!");
                    localStorage.removeItem("token");
                    window.location.href = "http://localhost:3000"; // 리다이렉트
                }

                if (decodedToken && decodedToken.name) {
                    setUserName(decodedToken.name); // 디코딩된 토큰에서 사용자 이름 설정
                } else {
                    setUserName(name);
                }
            } catch (error) {
                console.error("토큰 정보를 가져오는 중 오류 발생:", error);
            }
        };

        fetchUserInfo();
    }, [currentUserState]); // currentUserState가 변경될 때마다 실행

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    /**--------------------------------
     * 클릭 이벤트 핸들러 추가
     * 
     * 어디를 눌러도 dropbox가 닫히게
     * 
     * useRef 사용
     * ref={dropdownRef} 해야 함
     --------------------------------*/
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setShowMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    /**--------------------------------
     * 로그아웃 핸들러
     --------------------------------*/
    const handleLogout = () => {
        // 로그아웃 처리 로직
        localStorage.removeItem("name");
        localStorage.removeItem("com.naver.nid.access_token");
        window.location.reload();
        localStorage.removeItem("token");
    };

    /**--------------------------------
     * 장바구니 갯수 업데이트
     * 
     * Fetch 커스텀 훅을 사용해서 데이터를 가져오고 장바구니의 갯수를 바로 업데이트 하고 싶다.
     * 
     * 1. addCart로 성공적으로 담았을 때 eventBus로 emit해줬음.
     * 2. Header.js에서 eventBus on으로 이벤트를 성공적으로 받았음.
     * 3. 다시 Fetch를 이용해서 장바구니 갯수를 업데이트 해야함.
     * 4. 하지만 그게 안됐음. 
     * 5. useFetch 커스텀 훅에서 return 값에 fetchData(axios.get하는 함수) 함수 자체를 같이 보냄
     * 6. 굳이 data를 새로 업데이트 시키지 않아도 커스텀훅의 api를 다시 쏘게 됨.
     --------------------------------*/
    const { data, loading, error, fetchData } = useFetch(
        "/api/v1/cart/getCarts",
        token._id
    );

    useEffect(() => {
        const handleMyEvent = async (message) => {
            // 보내준 값(메시지) 출력하기
            console.log(`Received: ${message}`);
            fetchData(); // 데이터 업데이트
        };
        // 이벤트 수신하기
        eventBus.on("addCart", handleMyEvent);
        return () => {
            // 컴포넌트가 사라질 때에는 이벤트 수신 종료
            eventBus.off("addCart", handleMyEvent);
        };
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching data</div>;
    }

    function goCart() {
        navigate("/cart");
    }

    return (
        <div className="header" ref={dropdownRef}>
            <div className="header_wrap">
                <Link to={"/"} style={{ textDecoration: "none" }}>
                    <div className="logo">
                        <CiDeliveryTruck className="logo_img" />
                        <div>신선마켓</div>
                    </div>
                </Link>

                {/* 햄버거 메뉴 */}
                <div className={`nav ${showMenu ? "show" : ""}`}>
                    <div className="nav_item">NEW</div>
                    <div className="nav_item">BEST</div>
                    <div className="nav_item">SALE</div>
                    <div className="nav_item">EVENT</div>
                </div>

                {/* 검색 */}
                <div className="search">
                    <input type="text" />
                    <CiSearch className="search_img" />
                </div>

                {/* 로그인 */}
                {/* 사용자 정보 및 로그아웃 드롭다운 */}
                <div className="user_dropdown">
                    {userName ? ( // 사용자 이름이 있으면 표시
                        <div className="user_info" onClick={toggleMenu}>
                            {userName} 님
                        </div>
                    ) : (
                        <Link to="/signIn" style={{ textDecoration: "none" }}>
                            <div className="auth">
                                <CiUser className="auth_img" />
                                <div className="auth_des">로그인</div>
                            </div>
                        </Link>
                    )}
                    {showMenu && (
                        <div className="dropdown_menu">
                            <Link
                                to="/myAccount"
                                className="menu_item"
                                style={{
                                    textDecoration: "none",
                                    color: "black",
                                }}
                            >
                                내 정보
                            </Link>
                            <div className="menu_item" onClick={handleLogout}>
                                로그아웃
                            </div>
                        </div>
                    )}
                </div>

                {/* 장바구니 */}
                <div className="cart" onClick={() => goCart()}>
                    <CiShoppingCart className="cart_img" />
                    {data?.carts == null || 0 ? null : (
                        <div className="cart_count">{data?.carts.length}</div>
                    )}
                </div>
                <div className="hamburger_menu" onClick={toggleMenu}>
                    <RxHamburgerMenu className="hamburger_icon" />
                </div>
            </div>
        </div>
    );
}

export default Header;
