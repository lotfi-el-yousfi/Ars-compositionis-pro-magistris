import axios from "../../config/AxiosConfiguration";

export const API_login = async (username: string, password: string) => {
    const response = await axios.post('/auth/login', {username, password})
    return response.data.token;
}