import axios from "axios";

export function getBanner() {
    return axios
        .get(
            "https://static.wixstatic.com/media/ad420a_01886647b6df44198b05bc86420472c0~mv2.jpg/v1/fill/w_1000,h_540,fp_0.73_0.29,q_90/ad420a_01886647b6df44198b05bc86420472c0~mv2.jpg"
        )
        .then((response) => {
            // 성공적으로 이미지를 가져왔을 때 이미지 데이터를 반환
            return response.data;
        })
        .catch((error) => {
            // 오류 발생시 실행
            console.error("Error fetching banner image:", error);
            throw error; // 에러를 다시 던져서 상위 호출자에게 전달
        });
}
