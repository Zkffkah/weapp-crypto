import {fetchTickers} from "@/services/ccxt";

export default {
  namespace: 'home',
  state: {
    tickers: [],
  },

  effects: {
    * getTickers({callback}, {call, put}) {
      console.log('getTickers')
      try {
        let res = yield call(fetchTickers)
        yield put({
          type: 'updateTickers',
          payload: {
            tickers: res,
          }
        })
        if (callback && typeof callback === 'function') {
          yield callback({status: 'ok'});
        }
      } catch (e) {
        console.log(e)
      }
    }
  },

  reducers: {
    updateTickers(state, {payload}) {
      return {
        ...state,
        tickers: payload.tickers
      };
    },
  }
};
