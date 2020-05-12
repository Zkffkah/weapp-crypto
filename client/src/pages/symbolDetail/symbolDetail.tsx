import Taro, {Component, Config} from '@tarojs/taro'
import {ScrollView, View, Text} from '@tarojs/components'
import Chart from 'taro-echarts';

import './symbolDetail.scss'
import {connect} from "@tarojs/redux";
import model from './model'
import {Ticker} from "ccxt";
import {getOption} from "@/pages/symbolDetail/kline";
import Tips from "@/utils/tips";
import symbolDetail from "../../../.temp/pages/symbolDetail/symbolDetail";
import {tranNumber} from "@/utils/quantity";

let namespace = model.namespace

interface IProps {
}

interface IState {
  ticker: Ticker
}

class SymbolDetail extends Component<IProps, IState> {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const ticker = JSON.parse(decodeURIComponent(this.$router.params.symbolData))
    Taro.setNavigationBarTitle({
      title: ticker.symbol
    })
    this.setState({
      ticker
    })
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
    this.props.dispatch({
      type: `${namespace}/getOHLCV`,
      payload: {
        symbol: this.state.ticker.symbol
      },
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
  config: Config = {}

  render() {
    return (
      this.state.ticker &&
      <View className={"symbol-detail"}>
        <View className={"symbol-detail-header"}>
          <View className={"symbol-detail-header-left"}>
            <Text className={`symbol-detail-header-left-big-item ${this.state.ticker.last > this.state.ticker.close ? "symbol-detail-price-up" : "symbol-detail-price-down"}`}>
              {this.state.ticker.last}
            </Text>
            <View className={"symbol-detail-header-left-bottom"}>

              <Text className={`symbol-detail-header-left-bottom-first ${this.state.ticker.change > 0 ? "symbol-detail-price-up" : "symbol-detail-price-down"}`}>
                {this.state.ticker.change && this.state.ticker.change.toFixed(2)}
              </Text>
              <Text className={`${this.state.ticker.percentage > 0 ? "symbol-detail-price-up" : "symbol-detail-price-down"}`}>
                {this.state.ticker.percentage && this.state.ticker.percentage.toFixed(2)}%
              </Text>
            </View>

          </View>
          <View className={"symbol-detail-header-right"}>
            <View className={"symbol-detail-header-right-first"}>
              <View>
                最高:
                <Text className={`symbol-detail-header-right-number-item ${this.state.ticker.high > this.state.ticker.close ? "symbol-detail-price-up" : "symbol-detail-price-down"}`}>
                   {this.state.ticker.high}
                </Text>
              </View>
              <View>
                最低:
                <Text className={`symbol-detail-header-right-number-item ${this.state.ticker.low > this.state.ticker.close ? "symbol-detail-price-up" : "symbol-detail-price-down"}`}>
                  {this.state.ticker.low}
                </Text>
              </View>
              <Text className={"symbol-detail-header-right-number-item"}>
                成交量: {tranNumber(this.state.ticker.baseVolume, 2)}
              </Text>
            </View>
            <View className={"symbol-detail-header-right-second"}>
              <Text className={"symbol-detail-header-right-number-item"}>
                今开: {this.state.ticker.open}
              </Text>
              <Text className={"symbol-detail-header-right-number-item"}>
                昨收: {this.state.ticker.close && this.state.ticker.close.toFixed(2)}
              </Text>
              <Text className={"symbol-detail-header-right-number-item"}>
                成交额: {tranNumber(this.state.ticker.quoteVolume, 2)}
              </Text>
            </View>
          </View>

        </View>
        <View className={"symbol-detail-chart-container"}>
          <Chart
            height="500px"
            width="100%"
            chartId={'1'}
            option={
              getOption(this.state.ticker, this.props.ohlc)
            }
          />
        </View>
      </View>
    )
  }
}

const mapStateToProps = (models) => {
  return {
    ...models[namespace]
  }
}
export default connect(mapStateToProps)(SymbolDetail)
