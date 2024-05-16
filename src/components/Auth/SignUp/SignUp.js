import React, { useState } from "react";
import "./SignUp.scss";
import { signUp } from "../../../api/auth/signUp_api";
import { Link, useNavigate } from "react-router-dom";
import useInput from "../../../hooks/useInput";

function SignUp() {
    const navigate = useNavigate();

    // Input 훅 분리
    const { form, handleChange } = useInput({
        id: "",
        password: "",
        pw_confirm: "",
        name: "",
    });

    // 회원가입 버튼 클릭 시 실행되는 함수
    const handleSignUp = async (e) => {
        e.preventDefault();

        if (form.password !== form.pw_confirm) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            const response = await signUp(form);

            if (response.message === "duplicated") {
                alert("중복된 아이디입니다.");
            } else {
                alert("회원가입이 완료되었습니다.");
                navigate("/");
            }
        } catch (error) {
            console.error("회원가입 실패:", error);
        }
    };

    return (
        <div className="signup_container">
            <div className="signup_wrap">
                <div className="title">회원가입</div>

                <form onSubmit={handleSignUp}>
                    <div className="form_container">
                        <div className="id_container">
                            <div className="id">아이디</div>
                            <div className="id_input">
                                <input
                                    id="id"
                                    type="text"
                                    name="id"
                                    value={form.id}
                                    onChange={handleChange}
                                />
                                <div className="des">
                                    (영문소문자/숫자, 4~16자)
                                </div>
                            </div>
                        </div>

                        <div className="pw_container">
                            <div className="pw">비밀번호</div>
                            <div className="pw_input">
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                />
                                <div className="des">
                                    (영문 대소문자/숫자/특수문자 중 2가지 이상
                                    조합, 10자~16자)
                                </div>
                            </div>
                        </div>

                        <div className="pw_confirm_container">
                            <div className="pw_confirm">비밀번호 확인</div>
                            <div className="pw_confirm_input">
                                <input
                                    id="pw_confirm"
                                    type="password"
                                    name="pw_confirm"
                                    value={form.pw_confirm}
                                    onChange={handleChange}
                                />
                                {form.password !== form.pw_confirm && (
                                    <div className="des pw_des">
                                        비밀번호가 일치하지 않습니다.
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="name_container">
                            <div className="name">이름</div>
                            <div className="name_input">
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form_btn">
                        <Link
                            to={"/"}
                            style={{
                                textDecoration: "none",
                                color: "black",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                fontSize: 16,
                            }}
                            className="form_cancel"
                        >
                            취소
                        </Link>

                        <button className="form_submit">가입하기</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
