import Binance from "binance-api-node";
var RSI = require("technicalindicators").RSI;

const client = Binance();

//   const symbol = "BTCUSDT";
//   const interval = "5m";
//   const limit = 100;

export async function getRsiByPair(data: {
  symbol: string;
  interval: any;
  limit: number;
}) {
  const { symbol, interval, limit } = data;
  console.log(symbol, interval, limit);
  

  const period = 14;

  const candles = await client.candles({
    symbol: symbol,
    interval: interval,
    limit: limit,
  });

  const closes = candles.map((candle) => parseFloat(candle.close));

  const inputRSI = {
    values: closes,
    period: period,
  };

  const rsi = new RSI(inputRSI);

  const rsiValues = rsi.getResult();
  console.log(rsiValues);
  return rsiValues;
}
