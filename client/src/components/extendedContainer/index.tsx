import Taro, {Component} from '@tarojs/taro'
import {Text, View} from '@tarojs/components';
import {CSSProperties} from 'react'


import './index.scss'

interface InProps {
  content: string;
  maxLine: number;
  showSwitch?: boolean;
}

class ExtendedContainer extends Component<InProps, {
  extend: boolean;
  needSwitch: boolean
}> {

  static defaultProps = {
    content: '',
    maxLine: 5,
    showSwitch: true,
  }

  constructor(props: InProps) {
    super(props)
    this.state = {
      extend: false,
      needSwitch: true,
    }
  }

  componentDidMount() {
    if (!this.props.showSwitch) {
      return
    }
    const query = Taro.createSelectorQuery().in(this.$scope)
    query.select('#switch').boundingClientRect()
    query.select('#content').boundingClientRect().exec(res => {
      const [switchDom, contentDom] = res
      if ((contentDom.height / switchDom.height) < this.props.maxLine) {
        this.setState({needSwitch: false})
      }
    })
  }

  genStyle = () => {
    const {maxLine} = this.props
    const {extend} = this.state

    if (maxLine && !extend) {
      let margeStyle: string = "";
      margeStyle += "-webkit-line-clamp:" + maxLine + ";";
      margeStyle += "overflow:hidden;";
      margeStyle += "-webkit-box-orient:vertical;";
      margeStyle += "display:-webkit-box;";
      margeStyle += "text-overflow:ellipsis;";
      return margeStyle
    }
    return ""
  }

  toggle = () => {
    const {extend, needSwitch} = this.state
    if (!needSwitch) {
      return
    }
    this.setState({extend: !extend})
  }

  render() {
    const style = this.genStyle()
    const {content, showSwitch} = this.props
    const {extend, needSwitch} = this.state
    return (
      <View className="extend-container">
        <View className="content" style={style as CSSProperties} onClick={this.toggle}>
          <Text id="content">{content}</Text>
        </View>
        {
          showSwitch && needSwitch ? (
            <Text id="switch" className="switch" onClick={this.toggle}>{extend ? '收起' : '展开'}</Text>
          ) : null
        }
      </View>
    )
  }
}


export default ExtendedContainer
