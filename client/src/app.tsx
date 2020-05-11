import Taro, { Component, Config } from '@tarojs/taro';
import Home from '@/pages/home/home';
import dva from '@/utils/dva';
import models from '@/models';
import './app.scss';
import { Provider } from '@tarojs/redux';
import fetch from 'ccxt/js/static_dependencies/node-fetch'
fetch.Promise = Promise
const dvaApp = dva.createApp({
  initialState: {},
  models: models
});

const store = dvaApp.getStore();

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  public componentDidShow() {}

  public componentDidHide() {}

  public componentDidCatchError() {}

  async componentDidMount() {
    // 初始化云开发
    if (process.env.TARO_ENV === 'weapp') {
      Taro.cloud.init({
        env: 'weapp-crypto-9ki2o',
        traceUser: true
      });
    }
  }

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/home/home',
      'pages/news/news',
      'pages/symbolDetail/symbolDetail',
    ],
    tabBar: {
      color: '#8a8a8a',
      selectedColor: '#000',
      list: [
        {
          pagePath: 'pages/home/home',
          text: '行情',
          iconPath: 'assets/home-grey.png',
          selectedIconPath: 'assets/home-black.png'
        },
        {
          pagePath: 'pages/news/news',
          text: '资讯',
          iconPath: 'assets/news-grey.png',
          selectedIconPath: 'assets/news-black.png'
        }
      ]
    },
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
    },
  };

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  public render() {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById('app'));
