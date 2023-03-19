import axios from "axios";

const BASE_URL = 'http://localhost:3010/api'

class UserService {
    async login(user: UserService) {
        const results = await axios.post(`${BASE_URL}/login`, user);
        return results;
    }
    async register(user: UserService) {
        const results = await axios.post(`${BASE_URL}/register`, user);
        return results;
    }
}

export const userService = new UserService();