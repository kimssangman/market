import React, { useState } from "react";
import "./SignUp.scss";

function SignUp() {
    const [form, setForm] = useState({
        id: "",
        password: "",
        name: "",
        phone: "",
        email: "",
    });

    // 입력값이 변경될 때 실행되는 함수
    const handleChange = (e) => {
        const { name, value } = e.target;
        // 기존의 form 상태를 복사한 후 해당 필드만 업데이트
        setForm({
            ...form,
            [name]: value,
        });
    };

    // 회원가입 버튼 클릭 시 실행되는 함수
    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            console.log(form);
            // axios를 사용하여 서버로 데이터를 보냅니다.
            // const response = await signUp(form);
            // console.log(response.message);
        } catch (error) {
            console.error("회원가입 실패:", error);
        }
    };

    return (
        <div className="signup_container">
            <div className="signup_wrap">
                {/* 제목 */}
                <div className="title">회원가입</div>

                <form onSubmit={handleSignUp}>
                    <div className="form_container">
                        {/* 아이디 */}
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

                        {/* 비밀번호 */}
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

                        {/* 비밀번호 확인 */}
                        <div className="pw_container">
                            <div className="pw">비밀번호 확인</div>
                            <div className="pw_input">
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                />
                                <div className="des">
                                    비밀번호가 일치하지 않습니다.
                                </div>
                            </div>
                        </div>

                        {/* 이름 */}
                        <div className="pw_container">
                            <div className="pw">이름</div>
                            <div className="pw_input">
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* 휴대전화 */}
                        <div className="pw_container">
                            <div className="pw">휴대전화</div>
                            <div className="pw_input">
                                <input
                                    id="phone"
                                    type="name"
                                    name="phone"
                                    onChange={handleChange}
                                />
                                <div className="des">
                                    휴대폰 번호를 입력하세요.
                                </div>
                            </div>
                        </div>

                        {/* 이메일 */}
                        <div className="pw_container">
                            <div className="pw">이메일</div>
                            <div className="pw_input">
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form_btn">
                        <button className="form_cancel">취소</button>
                        <button className="form_submit">가입하기</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
