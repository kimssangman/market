import axios from "axios";

export async function signUp(form) {
    const response = await axios.post("/api/v1/auth/signUp", form);
    return response.data;
}
