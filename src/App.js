import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./App.css";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import SignInPage from "./pages/SignInPage/SignInPage";
import { RecoilRoot } from "recoil";
import NotFound from "./components/NotFound/NotFound";
import SignUpPage from "./pages/SignUpPage/SignUpPage";

import { getToken } from "./api/auth/jwt_api";
import IsTokenRoute from "./pages/IsTokenRoute"; // 토큰이 존재하면 라우팅
import PrivateRoute from "./pages/PrivateRoute"; // 토큰이 존재하지 않으면 라우팅

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
                    <Route path="*" element={<NotFound />} replace={true} />
                </Routes>
            </RecoilRoot>
        </div>
    );
}

export default App;
