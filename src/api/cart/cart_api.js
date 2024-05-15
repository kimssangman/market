import axios from "axios";

export async function addCart(url, item) {
    try {
        // console.log(item);
        const response = await axios.post(url, item);
    } catch (error) {
        console.log(error);
    }
}

export async function getCarts(url, _id) {
    try {
        const response = await axios.get(url, { params: { _id } });
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch carts data");
    }
}
