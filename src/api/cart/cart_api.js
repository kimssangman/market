import axios from "axios";

export async function addCart(url, item) {
    try {
        // console.log(item);
        const response = await axios.post(url, item);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}
