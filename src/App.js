import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./App.css";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import SignInPage from "./pages/SignInPage/SignInPage";
import { RecoilRoot } from "recoil";
import NotFound from "./components/NotFound/NotFound";

function App() {
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
                        element={<SignInPage className="signIn" />}
                    />
                    <Route path="*" element={<NotFound />} replace={true} />
                </Routes>
            </RecoilRoot>
        </div>
    );
}

export default App;
