import Taro, {Component, Config} from '@tarojs/taro'
import {ScrollView, View, Text} from '@tarojs/components'
import Chart from 'taro-echarts';

import './symbolDetail.scss'
import {connect} from "@tarojs/redux";
import model from './model'
import {Ticker} from "ccxt";
import {getOption} from "@/pages/symbolDetail/kline";
import Tips from "@/utils/tips";

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
      payload:{
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
  config: Config = {
    navigationBarTitleText: '详情'
  }

  render() {
    return (
      this.state.ticker &&
      <View className={"chart-container"}>
        <Chart
          height="70vh"
          chartId={'1'}
          option={
            getOption(this.state.ticker, this.props.ohlc)
          }
        />
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
