import axios from "axios";

class ChartsService {
    async getCoinData(coin: string,byDate:string) {
        const url = `https://api.binance.com/api/v3/klines?symbol=${coin}&interval=${byDate}`;
        const response = await axios.get(url);
        const data = response.data.map((item: any) => ({
          time: new Date(item[0]),
          open: item[1],
          high: item[2],
          low: item[3],
          close: item[4],
          volume: item[5],
          closeTime: new Date(item[6]),
          assetVolume: item[7],
          trades: item[8],
          buyBaseVolume: item[9],
          buyAssetVolume: item[10],
          ignored: item[11],
        }));
        return {
            prices: data.map((item:any) => [
              item.time.getTime(),
              item.open,
              item.high,
              item.low,
              item.close,
              item.volume
            ]),
            market_caps: data.map((item:any) => [
              item.time.getTime(),
              item.assetVolume
            ]),
            total_volumes: data.map((item:any) => [
              item.time.getTime(),
              item.volume
            ]),
          };
      }
      
}

export const chartsService = new ChartsService();