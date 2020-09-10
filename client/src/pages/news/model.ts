import getNews from "@/services/defi";


export default {
  namespace: 'news',
  state: {
    news: [],
  },

  effects: {
    * getNews({callback}, {call, put}) {
      console.log('getNews')
      try {
        let res = yield call(getNews)
        console.log(res)
        yield put({
          type: 'updateNews',
          payload: {
            news: res.data.data.find_live,
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
    updateNews(state, {payload}) {
      return {
        ...state,
        news: payload.news
      };
    },
  }
};
