import { useState, useEffect, useRef } from "react";
import "./Header.scss";
import { CiDeliveryTruck } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../store/atoms/index";

function Header() {
    const [showMenu, setShowMenu] = useState(false);
    // const currentUserState = useRecoilValue(userState);
    const [currentUserState, setCurrentUserState] = useState(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        // localStorage에서 현재 사용자 정보 가져오기
        const user = localStorage.getItem("name");
        setCurrentUserState(user);
    }, []);

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
    };

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
                    {currentUserState !== null ? (
                        <div className="user_info" onClick={toggleMenu}>
                            {currentUserState} 님
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
                <div className="cart">
                    <CiShoppingCart className="cart_img" />
                </div>
                <div className="hamburger_menu" onClick={toggleMenu}>
                    <RxHamburgerMenu className="hamburger_icon" />
                </div>
            </div>
        </div>
    );
}

export default Header;
