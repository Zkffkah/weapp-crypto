import * as ccxt from 'ccxt';

export const HUOBI_PRO = 'huobipro'
export const BINANCE = 'binance'
import {reverseReq} from "@/utils/reverseReq";
import Taro from '@tarojs/taro';

function fetch(url, params) {
  return new Promise((resolve, reject) => {
    let promise = process.env.TARO_ENV === 'weapp' ? reverseReq({
      url: url,
      method: params.method,
      // header:params.headers,
      header: {
        "x-requested-with": "weapp.test.com"
      },
      timeout: params.timeout,
      data: params.body
    }) : Taro.request({
      url: url,
      method: params.method,
      // header:params.headers,
      header: {
        "x-requested-with": "weapp.test.com"
      },
      timeout: params.timeout,
      data: params.body
    })
    promise.then((res) => {
      console.log(Object.keys(res.header).reduce((result, key) => {
        result[key] = res.header[key]
        return result;
      }, new Map()))
      const object = {
        text: function () {
          return Promise.resolve(res.data)
        },
        status: res.statusCode,
        headers: Object.keys(res.header).reduce((result, key) => {
          result[key] = res.header[key]
          return result;
        }, new Map())
      }
      return resolve(object)
    }).catch(error => {
      console.log(error)
      reject(error)
    })
  })
}

export class CCXTConnection {
  public static instance: CCXTConnection;
  private connectionMap: Map<string, ccxt.Exchange> = new Map();
  private exchanges = [HUOBI_PRO, BINANCE]

  constructor() {
    for (let exchange of this.exchanges) {
      const ExchangeClass: typeof ccxt.Exchange = ccxt[exchange];
      if (void (0) == ExchangeClass) {
        throw new Error(`exchange: [${exchange}] was not found!`);
      }

      const exchangeInstance: ccxt.Exchange = new ExchangeClass({
        enableRateLimit: true,
        //https://github.com/ccxt/ccxt/pull/3439
        fetchImplementation: fetch
      });
      //reverse proxy
      if (process.env.TARO_ENV !== 'weapp' ){
        //no cors in weapp
        exchangeInstance.proxy = 'https://corsreverse.herokuapp.com/';
      }
      this.connectionMap.set(exchange, exchangeInstance);
    }
  }

  public static getInstance(): CCXTConnection {
    if (!CCXTConnection.instance) {
      CCXTConnection.instance = new CCXTConnection();
    }
    return CCXTConnection.instance;
  }


  public getExchange(exchangeType: string): ccxt.Exchange | undefined {
    return this.connectionMap.get(exchangeType);
  }

}
