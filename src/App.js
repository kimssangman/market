// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import SignInPage from "./pages/SignInPage/SignInPage";
import { RecoilRoot } from "recoil";
import NotFound from "./components/NotFound/NotFound";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import { getToken } from "./api/auth/jwt_api";
import IsTokenRoute from "./pages/IsTokenRoute";
import PrivateRoute from "./pages/PrivateRoute";
import Footer from "./components/Footer/Footer";
import ProductDetailPage from "./pages/ProductDetailPage/ProductDetailPage";
import CartPage from "./pages/CartPage/CartPage";
import PositiveDialog from "./components/Modal/PositiveDialog/PositiveDialog";
import ChatBotIcon from "./components/ChatModal/ChatBotIcon/ChatBotIcon";

function App() {
    const token = getToken();

    return (
        <div className="App">
            <RecoilRoot>
                <Header />
                <Routes>
                    <Route
                        path="/"
                        element={<HomePage className="homePage" />}
                    />
                    <Route
                        path="/signIn"
                        element={
                            <IsTokenRoute
                                component={<SignInPage className="signIn" />}
                                authenticated={token}
                            />
                        }
                    />
                    <Route
                        path="/signUp"
                        element={
                            <IsTokenRoute
                                component={<SignUpPage className="signIn" />}
                                authenticated={token}
                            />
                        }
                    />

                    <Route
                        path="/product/:_id"
                        element={
                            <ProductDetailPage className="productDetailPage" />
                        }
                    />

                    <Route
                        path="/cart"
                        element={
                            <PrivateRoute
                                component={<CartPage />}
                                authenticated={token}
                            />
                        }
                    />

                    <Route path="*" element={<NotFound />} replace={true} />
                </Routes>

                {/* 챗 모달 */}
                <ChatBotIcon />

                {/* 모달 */}
                <PositiveDialog />
                <Footer />
            </RecoilRoot>
        </div>
    );
}

export default App;
