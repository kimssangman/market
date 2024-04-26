import { useState } from "react";
import "./Header.scss";
import { CiDeliveryTruck } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";

function Header() {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <div className="header">
            <div className="header_wrap">
                <Link to={"/"} style={{ textDecoration: "none" }}>
                    <div className="logo">
                        <CiDeliveryTruck className="logo_img" />
                        <div>Fresh Marcket</div>
                    </div>
                </Link>

                {/* 햄버거 메뉴 */}
                <div className={`nav ${showMenu ? "show" : ""}`}>
                    <div className="nav_item">Home</div>
                    <div className="nav_item">Shop</div>
                    <div className="nav_item">About</div>
                    <div className="nav_item">Contact</div>
                </div>

                {/* 검색 */}
                <div className="search">
                    <input type="text" />
                    <CiSearch className="search_img" />
                </div>

                {/* 로그인 */}
                <Link to="/signIn" style={{ textDecoration: "none" }}>
                    <div className="auth">
                        <CiUser className="auth_img" />
                        <div className="auth_des">Log In</div>
                    </div>
                </Link>

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
