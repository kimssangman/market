import React, { useEffect, useState } from "react";
import "./Footer.scss";

function Footer() {
    return (
        <div className="footer_container">
            <div className="footer_wrap">
                <div className="footer_inner">
                    <div className="footer_top">
                        <div className="footer_left">
                            <div>
                                <span>(주) 신선마켓</span>
                            </div>
                            <div>
                                <span>대표자: 홍길동</span>
                                <span>서울특별시 마포구 올림픽대로 49</span>
                                <span>고객센터: 02-1234-5678</span>
                            </div>
                            <div>
                                <span>사업자번호: 12110-6588-303444</span>
                                <span>통신판매업신고: 2016-서울마포-1247 </span>
                                <span>개인정보관리자: 홍길동</span>
                            </div>
                        </div>
                        <div className="footer_right">
                            <div>
                                <span>고객센터</span>
                            </div>
                            <div>
                                <span>02-3132-1234</span>
                            </div>
                            <div>
                                <span>
                                    평일 10:00 ~ 17:00 (점심시간 11:30 ~ 13:00)
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="footer_bottom">
                        <div>
                            Copyright © 신선마켓. All Rights Reserved. Hosting
                            by Cafe24 Corp.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
