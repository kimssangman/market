// PositiveDialog.js

import React, { useEffect, useRef } from "react";
import "./PositiveDialog.scss";
import { dialogState } from "../../../store/atoms";
import { useRecoilState } from "recoil";

function PositiveDialog() {
    const [dialog, setDialog] = useRecoilState(dialogState);
    const modalRef = useRef(null);

    const handleConfirm = (result) => {
        dialog.callback(result);
        setDialog({ ...dialog, open: false }); // 다이얼로그 닫기
    };

    // 다이얼로그 닫기
    const handleCloseModal = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setDialog({ ...dialog, open: false });
        }
    };

    // 다른 곳 클릭하면 모달창 닫기
    useEffect(() => {
        document.addEventListener("mousedown", handleCloseModal);

        return () => {
            document.removeEventListener("mousedown", handleCloseModal);
        };
    }, []);

    if (!dialog.open) return null;

    return (
        <div className="modal-background">
            <div className="positiveDialog" ref={modalRef}>
                <p>{dialog.message}</p>
                <div className="positiveDialog_btn">
                    <button onClick={() => handleConfirm(true)}>예</button>
                    <button onClick={() => handleConfirm(false)}>아니오</button>
                </div>
            </div>
        </div>
    );
}

export default PositiveDialog;
