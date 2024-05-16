/**--------------------------
 * input 커스텀 훅
 --------------------------*/

import { useState } from "react";

function useInput(data) {
    const [form, setForm] = useState(data);

    // 입력값이 변경될 때 실행되는 함수
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return { form, handleChange };
}

export default useInput;
