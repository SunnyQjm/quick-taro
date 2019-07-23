import Taro, {Component} from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import './index.scss'
import {
  QuickTaroFloatBtnMenu,
  QuickTaroEasyPage,
  QuickTaroCircleLoading
} from '../../components';
import {
  icon_close_black,
  logo_header
} from '../../images'

interface IndexProps {

}

interface IndexState {
  showLoading: boolean,
  headerHeight: number,
}

export default class Index extends Component<IndexProps, IndexState> {

  constructor(props) {
    super(props);
    this.handleOnMenuItemClick = this.handleOnMenuItemClick.bind(this);
    this.state = {
      showLoading: false,
      headerHeight: 0
    }
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
        this.setState({
          showLoading: true
        });
        setTimeout(() => {
          this.setState({
            showLoading: false
          })
        }, 3000);
        break;
      case 1:
        break;
      case 2:
        break;
    }
  }

  render() {

    const {
      showLoading,
    } = this.state;
    return (
      <View className='index'>
        <QuickTaroEasyPage
          navBarProps={{
            title: 'QuickTaroDemo',
            barBg: '#ccc',
          }}
          contentWrapperProps={{
            showLoading: showLoading,
          }
          }
        >
          <Text>Hello world!</Text>
          <QuickTaroCircleLoading customStyle={`margin: ${Taro.pxTransform(10)}`}/>
        </QuickTaroEasyPage>
        <QuickTaroFloatBtnMenu
          icon={logo_header}
          changeIcon={icon_close_black}
          onMenuItemClick={this.handleOnMenuItemClick}
          menuList={[
            'showLoading'
          ]}
        />
      </View>
    )
  }
}
