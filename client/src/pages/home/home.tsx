import Taro, {Component, Config} from '@tarojs/taro'
import {ScrollView, View, Text} from '@tarojs/components'

import './home.scss'
import {connect} from "@tarojs/redux";
import model from './model'
import {Ticker} from "ccxt";
import Tips from "@/utils/tips";

let namespace = model.namespace

interface IProps {
  tickers: [Ticker]
}

interface IState {
}

class Home extends Component<IProps, IState> {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {
  }

  async componentDidMount() {
    await this.getData()
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  async getData() {
    Tips.loading('正在加载中...');
    await this.props.dispatch({
      type: `${namespace}/getTickers`,
      callback: status => {
        Tips.loaded();
        if (status === 'ok') {
          Tips.success('行情信息已更新');
        }
      }
    })
  }

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '行情'
  }

  navigateTo(item: Ticker) {
    Taro.navigateTo({url: `/pages/symbolDetail/symbolDetail?symbolData=${encodeURIComponent(JSON.stringify(item))}`})
  }

  render() {
    console.log(this.props.tickers)
    return (
      <ScrollView className="ticker-scroll-view" scrollY={true}>
        {this.props.tickers.map((item, index) => {
          return (
            <View className="ticker-item" onClick={this.navigateTo.bind(this, item)} key={item.symbol}>
              <Text className="ticker-item-symbol">
                {item.symbol}
              </Text>
              <View className="ticker-item-right-container">
                <Text className="ticker-item-price">
                  {item.last.toFixed(6)}
                </Text>
                <View
                  className={`ticker-item-percentage-item ${item.percentage > 0 ? "ticker-item-percentage-up" : "ticker-item-percentage-down"}`}>
                  <Text className="ticker-item-percentage-text">
                    {item.percentage.toFixed(2)}%
                  </Text>
                </View>

              </View>
            </View>

          )
        })}
      </ScrollView>
    )
  }
}

const mapStateToProps = (models) => {
  return {
    ...models[namespace]
  }
}
export default connect(mapStateToProps)(Home)
