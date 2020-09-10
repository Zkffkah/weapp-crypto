import Taro, {Component, Config} from '@tarojs/taro';
import {ScrollView, Text, View} from '@tarojs/components';

import './news.scss';
import {connect} from "@tarojs/redux";
import {NewItem} from '@/services/defi'
import Tips from "@/utils/tips";
import model from './model'
import ExtendedContainer from "@/components/extendedContainer";

let namespace = model.namespace

interface IProps {
  news: [NewItem]
}

interface IState {
}

class News extends Component<IProps, IState> {
  config: Config = {
    navigationBarTitleText: '资讯',
    enablePullDownRefresh: true
  };

  constructor(props: IProps) {
    super(props);
    this.state = {}
  }

  async componentDidMount() {
    console.log('componentDidMount')
    Tips.loading('正在加载中...');
    await this.getData()
  }

  async getData() {
    await this.props.dispatch({
      type: `${namespace}/getNews`,
      callback: status => {
        Tips.loaded();
        Taro.stopPullDownRefresh()
        if (status === 'ok') {
          Tips.success('资讯信息已更新');
        }
      }
    })
  }

  render() {
    console.log(this.props)
    return (
      <View>
        <ScrollView scrollY className='list-item'>
          {
            this.props.news.map((data, k) => {
              return (
                <View className={`news-item`} key={data.id}>
                  <View className={`news-title`}>
                    <Text className={`news-title-text`}>
                      {data.content_prefix}
                    </Text>
                  </View>
                  <View className={`news-platform`}>
                    <Text className={`news-platform-text`}>
                      {data.platform}
                    </Text>
                  </View>
                  <View className={`news-content`}>

                  <ExtendedContainer maxLine={5} content={(data.content as string)} showSwitch={false} />
                  </View>

                </View>
              );
            })
          }
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (models) => {
  return {
    ...models[namespace]
  }
}
export default connect(mapStateToProps)(News);
