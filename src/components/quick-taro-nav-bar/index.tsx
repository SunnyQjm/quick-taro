import Taro from '@tarojs/taro';
import {View, Text, Image} from '@tarojs/components';
// eslint-disable-next-line no-unused-vars
import {CSSProperties} from 'react';
import BaseComponent from '../quick-taro-base-component';

import './index.scss';

export interface QuickTaroNavBarProps {
  title?: string,
  titleStyle?: string | CSSProperties,
  leftIconVisible?: boolean,
  rightIconVisible?: boolean,
  showTitleDropDownIcon?: boolean,
  leftIcon?: string,
  rightIcon?: string,
  preventBack?: boolean,
  barBg?: string,
  dropDownImage?: string,
  onLeftIconClick?: () => void,
  onTitleClick?: () => void,
  onRightIconClick?: () => void,
  onHeightChange?: (height: number) => void
}

interface QuickTaroNavBarState {
  statusBarHeight: number
}

/**
 * 这是一个自定义的NavBar，可以自定义标题，左右icon（微信小程序端只有左icon，右icon被遮挡），标题栏的颜色（状态栏的颜色也会随之改变，沉浸式）
 *
 * 使用说明： 使用的时候Taro的配置 => app.tsx -> config -> window -> navigationStyle: 'custom'
 *          这样才能取消默认的NavBar，使用这个自定义的NavBar
 *
 */
class QuickTaroNavBar extends BaseComponent<QuickTaroNavBarProps, QuickTaroNavBarState> {

  static defaultProps = {
    title: 'Title',
    titleStyle: '',
    leftIconVisible: false,
    showTitleDropDownIcon: false,
    leftIcon: '',
    rightIcon: '',
    rightIconVisible: false,
    preventBack: false,
    barBg: '#fff',
    dropDownImage: '',
    onLeftIconClick: function () {
      console.log('default on Left icon click');
    },
    onRightIconClick: () => {
    },
    onTitleClick: () => {
    },
    onHeightChange: () => {

    }
  };

  constructor(props) {
    super(props);
    this.state = {
      statusBarHeight: 0
    };
    this.onBack = this.onBack.bind(this);
    this.onTitleClick = this.onTitleClick.bind(this);
    this.rightIconClick = this.rightIconClick.bind(this);
  }

  componentWillMount(): void {
    // 自动获取状态栏高度并设置
    if (this.isWeapp()) {
      this.setState({
        statusBarHeight: Taro.getSystemInfoSync().statusBarHeight
      })
    }
  }

  componentDidMount(): void {
    this.getRectInfo('.quick-taro-nav-bar-body')
      .then((res: any) => {
        this.props.onHeightChange && this.props.onHeightChange(res.height)
      })
  }

  onBack() {
    this.props.onLeftIconClick && this.props.onLeftIconClick();
    if (!this.props.preventBack) {
      //默认返回
      Taro.navigateBack({});
    }
  };

  onTitleClick() {
    this.props.onTitleClick && this.props.onTitleClick();
  }

  rightIconClick() {
    this.props.onRightIconClick && this.props.onRightIconClick();
  }


  render(): any {
    const {
      title,
      leftIconVisible,
      showTitleDropDownIcon,
      leftIcon,
      barBg,
      rightIcon,
      rightIconVisible,
      dropDownImage,
      titleStyle
    } = this.props;
    let {statusBarHeight} = this.state;
    if (this.isH5()) {
      statusBarHeight = 0;
    }

    let _rightIconVisible = rightIconVisible;
    if (!this.isH5()) {
      _rightIconVisible = false
    }

    return (
      <View
        className='quick-taro-nav-bar-body'
        style={
          'padding-top: ' + statusBarHeight + 'px; background: ' + barBg + ';'
        }
      >
        <View className='quick-taro-nav-bar-title'>
          <View className='quick-taro-nav-bar-title-content' onClick={this.onTitleClick}>
            <Text style={titleStyle}>{title}</Text>
            {showTitleDropDownIcon && (
              <Image
                src={dropDownImage ? dropDownImage : ""}
                style={`margin-left: ${Taro.pxTransform(10)}; width: ${Taro.pxTransform(28)}; height: ${Taro.pxTransform(22)};`}
                mode='aspectFit'
              />
            )}
          </View>
        </View>
        {leftIconVisible && (
          <Image
            className='quick-taro-nav-bar-back-icon'
            src={leftIcon ? leftIcon : ""}
            mode='aspectFit'
            onClick={this.onBack}
          />
        )}
        {_rightIconVisible && (
          <Image
            className='quick-taro-nav-bar-right-icon'
            src={rightIcon ? rightIcon : ""}
            mode='aspectFit'
            onClick={this.rightIconClick}
          />
        )}
      </View>
    );
  }
}

export default QuickTaroNavBar;
