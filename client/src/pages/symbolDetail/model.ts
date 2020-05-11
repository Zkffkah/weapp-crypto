import {fetchOHLCV} from "@/services/ccxt";

export default {
  namespace: 'symbolDetail',
  state: {
    ohlc: [],
  },
  effects: {
    *getOHLCV({payload,callback}, {call, put }) {
      console.log('getOHLCV')
      try {
        let res = yield call(fetchOHLCV,payload.symbol, '1d')
        if (res) {
          yield put({
            type: 'updateOhlc',
            payload: {
              ohlc: res,
            }
          })
        }
        if (callback && typeof callback === 'function') {
          yield callback({status: 'ok'});
        }
      } catch (e) {
        console.log(e)
      }
    }
  },

  reducers: {
    updateOhlc(state, {payload}) {
      return {
        ...state,
        ohlc: payload.ohlc
      };
    },
  }
};
