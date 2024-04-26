import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./App.css";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import SignInPage from "./pages/SignInPage/SignInPage";
import { RecoilRoot } from "recoil";

function App() {
    return (
        <div className="App">
            <RecoilRoot>
                <Header></Header>
                <Routes>
                    <Route
                        path="/"
                        element={<HomePage className="homePage"></HomePage>}
                    />
                    <Route
                        path="/signIn"
                        element={<SignInPage className="signIn"></SignInPage>}
                    />
                </Routes>
            </RecoilRoot>
        </div>
    );
}

export default App;
