import axios from "axios";

class ChartsService {
    async getCoinData(coin: string , currency: any, days: any, interval: any) {
        const results = (await axios.get(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${currency}d&days=${days}&interval=${interval}`)).data;
        return results;
    }
}

export const chartsService = new ChartsService();