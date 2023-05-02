import axios from "axios";

const BASE_URL = 'http://localhost:3010/api'

class TradesService {
    async sendTradesHistoryAndQuery(data: any) {
        const results = await (await axios.post(`${BASE_URL}/trades`, data)).data;
        return results;
    }
}

export const tradesService = new TradesService();