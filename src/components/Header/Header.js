import { useState } from "react";
import "./Header.scss";
import { CiDeliveryTruck } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";

function Header() {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <div className="header">
            <div className="header_wrap">
                <div className="logo">
                    <CiDeliveryTruck className="logo_img" />
                    <div>Fresh Marcket</div>
                </div>

                {/* 햄버거 메뉴 */}
                <div className={`nav ${showMenu ? "show" : ""}`}>
                    <div className="nav_item">Home</div>
                    <div className="nav_item">Shop</div>
                    <div className="nav_item">About</div>
                    <div className="nav_item">Contact</div>
                </div>

                <div className="search">
                    <input type="text" />
                    <CiSearch className="search_img" />
                </div>

                <div className="auth">
                    <CiUser className="auth_img" />
                    <div className="auth_des">Log In</div>
                </div>
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
