import axios from "axios";

export async function signIn(form) {
    const response = await axios.post("/api/v1/auth/signIn", form);
    localStorage.setItem("token", response.data.token);

    return response.data;
}
