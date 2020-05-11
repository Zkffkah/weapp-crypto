import * as ccxt from "ccxt";
import {Ticker} from "ccxt";
import {CCXTConnection, HUOBI_PRO} from "@/services/ccxt/ccxt-connections";

export type CandleInterval = '1m' | '3m' | '5m' | '10m' | '30m' | '1h' | '4h' | '12h' | '1d' | '3d' | '7d';

export async function fetchTickers(): Promise<Array<Ticker>> {
  let exchange = CCXTConnection.getInstance().getExchange(HUOBI_PRO)!
  await exchange.loadMarkets();

  const tickers = await exchange.fetchTickers();
  const symbols = ['BTC/USDT', 'ETH/USDT', 'LTC/USDT', 'XMR/USDT', 'DASH/USDT', 'NEO/USDT', 'ZEC/USDT', 'LSK/BTC', 'GNT/ETH'];

  let data:Array<Ticker> = [];
  symbols.map((symbol) => {
    data.push(tickers[symbol]);
  })

  return data;
}

export async function getSymbols(): Promise<string[]> {
  const exchange = new ccxt.huobipro({
    enableRateLimit: true,
  });
  await exchange.loadMarkets();
  const symbols: string[] = exchange.symbols;
  return symbols;
}

export async function fetchOHLCV(symbol: string, timeframe?: CandleInterval, since?: number, limit?: number, params?: any): Promise<ccxt.OHLCV[] | null> {
  console.log(symbol, timeframe, since, limit, params)
  let exchange = CCXTConnection.getInstance().getExchange(HUOBI_PRO)!
  let ohlcv = await exchange.fetchOHLCV(symbol, timeframe, since, limit, params);
  console.log(ohlcv)
  return ohlcv
}


