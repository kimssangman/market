import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./App.css";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import SignInPage from "./pages/SignInPage/SignInPage";

function App() {
    /**************************************************/
    /**----------------------------
     * 로그인, 회원가입 화면일 때 header 가리기
     ----------------------------*/

    // // 현재 경로를 가져오는 hook
    // const location = useLocation();

    // // signIn 경로인지 확인하는 함수
    // const isSignInPage = location.pathname === "/signIn";

    // // Header를 조건부로 렌더링
    // const renderHeader = () => {
    //     if (isSignInPage) {
    //         return null; // signIn 페이지라면 Header를 렌더링하지 않음
    //     }
    //     return <Header />;
    // };
    /**************************************************/

    return (
        <div className="App">
            {/* {renderHeader()} 조건부 Header 렌더링 */}
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
        </div>
    );
}

export default App;
