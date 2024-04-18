import "./Header.scss";

import { CiDeliveryTruck } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";

function Header() {
    return (
        <div className="header">
            <div className="header_wrap">
                <div className="logo">
                    <CiDeliveryTruck className="logo_img" />
                    <div>Fresh Marcket</div>
                </div>

                <div className="nav">
                    <div>Home</div>
                    <div>Shop</div>
                    <div>About</div>
                    <div>Contact</div>
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
            </div>
        </div>
    );
}

export default Header;
