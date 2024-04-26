import React, { useEffect, useState } from "react";
import "./SignIn.scss";
import { useRecoilState } from "recoil";
import { userState } from "../../../store/atoms/index";

/**-----------------------------------------------
 * 네이버 로그인 api 구현해보기
 * https://developers.naver.com/main/
 * 
 * 1. 네아로에 애플리케이션 등록
 * 2. 로그인 오픈 API 환경설정하기
 *      2-1. 서비스 URL :  네아로를 서비스 할 기본 주소. ex) http://localhost:3000
 *      2-2. Callback URL : 로그인 인증 과정에서 사용자 인증 결과를 전달받아 처리하기 위한 URL. ex) http://localhost:3000/signIn
 *      2-3. Client ID 발급 받았다면 준비완료!
 * 3. index.html 수정
 *      <script defer src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js" charset="utf-8"></script>
 * 4. config 작성
 * 5. 로그인 버튼 추가 (id 값이 아래와 같아야 함.)
 *      <div id="naverIdLogin"></div>
 -----------------------------------------------*/

/**-------------------------
 * 로그인 API config
 -------------------------*/
const { naver } = window;

function SignIn() {
    const naverLogin = new naver.LoginWithNaverId({
        clientId: "Gwx_NN3DlWzWz4HO0HxB",
        callbackUrl: "http://localhost:3000/signIn",
        isPopup: false,
        loginButton: {
            color: "green",
            type: 1,
            height: 30,
        },
    });

    /**--------------------------------
    * 로그인 API init, 유저정보 저장
    --------------------------------*/
    useEffect(() => {
        naverLogin.init();
        console.log("init!");
        getUser();
    }, []);

    /**--------------------------------
    * 로그인 API 유저정보 store 저장, redirect
    * 
    * recoil 썼지만, redirect하면 어차피 정보가 날아가서 맛보기로 써봄
    --------------------------------*/
    const [user, setUser] = useRecoilState(userState);
    const getUser = async () => {
        await naverLogin.getLoginStatus((status) => {
            console.log(`로그인: ${status}`);
            if (status) {
                // setUser({ ...naverLogin.user });

                const { email, name } = { ...naverLogin.user };
                setUser({ email, name }); // 이메일과 이름만 저장

                localStorage.setItem("name", name);

                window.location.href = "http://localhost:3000";
                // window.close();
            }
        });
    };

    useEffect(() => {
        console.log(user);
    }, [user]);

    return (
        <div className="login_container">
            <div className="login_wrap">
                {/* 제목 */}
                <div className="title">로그인</div>
                {/* 아직 회원이 아니신가요? */}
                <div className="login_util">
                    <div className="login_until_title">
                        아직 회원이 아니신가요?
                    </div>
                    <div className="login_until_dec">
                        지금 회원가입 하시면 <br /> 30% 할인쿠폰과 <br />
                        적립금 3천원이 자동 지급됩니다.
                    </div>
                    <div className="login_until_btn">회원가입</div>
                </div>
                {/* 간편 로그인 */}
                <div className="login_sns">
                    <div className="login_sns_title">간편로그인/간편가입</div>
                    <div className="login_sns_dec">
                        <div className="login_sns_btn">
                            <div id="naverIdLogin"></div>
                            네이버
                        </div>
                        <div className="login_sns_btn">
                            <img src="/images/kakao_icon.svg" alt="" />
                            카카오
                        </div>
                    </div>
                </div>

                <div></div>
            </div>
        </div>
    );
}

export default SignIn;
