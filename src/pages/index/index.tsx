import Taro, {Component, Config} from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import './index.scss'
import {
  QuickTaroNavBar,
  QuickTaroFloatBtnMenu,
  QuickTaroContentWrapper
} from '../../components';
import {
  icon_close_black,
  logo_header
} from '../../images'

export default class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  };

  constructor(props) {
    super(props);
    this.handleOnMenuItemClick = this.handleOnMenuItemClick.bind(this);
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  handleOnMenuItemClick(index: number) {
    switch (index) {
      case 0:
        break;
      case 1:
        break;
      case 2:
        break;
    }
  }

  render() {
    return (
      <View className='index'>
        <QuickTaroNavBar
          title='QuickTaroDemo'
          barBg='#ccc'
        />
        <QuickTaroContentWrapper>
          <Text>Hello world!</Text>
        </QuickTaroContentWrapper>
        <QuickTaroFloatBtnMenu
          icon={logo_header}
          changeIcon={icon_close_black}
          onMenuItemClick={this.handleOnMenuItemClick}/>
      </View>
    )
  }
}
