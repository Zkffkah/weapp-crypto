import Taro, {Component, Config} from '@tarojs/taro';
import {View} from '@tarojs/components';

import './news.scss';

interface IProps {
}

interface IState {
  // index: Array<ITicker>
}

class News extends Component<IProps, IState> {
  config: Config = {
    navigationBarTitleText: '资讯',
  };

  constructor(props: IProps) {
    super(props);
  }

  componentWillMount() {
  }

  render() {
    return (
      <View>
        资讯，todo。
      </View>
    );
  }
}

export default News;
