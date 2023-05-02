import axios from "axios";

const BASE_URL = "http://localhost:3010/api";

class IndicatorsService {
  async getRsiByPair(symbol: string, interval: any, limit: number ) {
    const data = {
        symbol: symbol,
        interval: interval,
        limit: limit,
    }
    const results = (await axios.post(`${BASE_URL}/indicators/rsi`, data)).data;
    return results;
  }
}

export const indicatorsService = new IndicatorsService();
