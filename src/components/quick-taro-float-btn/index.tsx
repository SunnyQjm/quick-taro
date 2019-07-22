// eslint-disable-next-line no-unused-vars
import Taro, {Animation} from '@tarojs/taro';
import {View, Image} from '@tarojs/components';
// eslint-disable-next-line no-unused-vars
import {ITouchEvent} from '@tarojs/components/types/common';

import BaseComponent from '../quick-taro-base-component';

import './index.scss';

interface XbFloatBtnProps {
  btnSize: number,
  position: 'left-top' | 'left-bottom' | 'right-top' | 'right-bottom',
  verticalMargin: number,
  horizontalMargin: number,
  icon: string,
  iconSize: number,
  backgroundColor: string,
  shadowColor: string,
  hide: boolean,
  duration: number,
  changeIcon: string,
  onClick: (e: ITouchEvent) => void
}

interface XbFloatBtnState {
  left: number,
  right: number,
  bottom: number,
  top: number,
  animationData: any,
  currentIcon: string,
  _hide: boolean
}

/**
 * 这是一个放置在界面四角的圆形按钮组件
 */
class XbFloatBtn extends BaseComponent<XbFloatBtnProps, XbFloatBtnState> {


  static defaultProps = {
    btnSize: 80,
    position: 'right-bottom',
    verticalMargin: 40,
    horizontalMargin: 40,
    iconSize: 40,
    backgroundColor: '#fff',
    shadowColor: '#0f0',
    hide: false,
    duration: 500,
    changeIcon: '',
    onclick: () => {
    }
  };

  animation: Animation;

  constructor(props) {
    super(props);
    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);
    this.change = this.change.bind(this);
    this.updateHideThreshold = this.updateHideThreshold.bind(this);
    this.onFloatBtnClick = this.onFloatBtnClick.bind(this);
  }

  componentWillMount(): void {
    let hide = this.props.hide;
    this.btn_status = hide ? 'hided' : 'showed';
    let p = {
      _hide: hide
    };
    switch (this.props.position) {
      case 'left-top':
        p['left'] = hide ? '-' + Taro.pxTransform(this.props.btnSize) : Taro.pxTransform(this.props.horizontalMargin);
        p['top'] = Taro.pxTransform(this.props.verticalMargin);
        break;
      case 'left-bottom':
        p['left'] = hide ? '-' + Taro.pxTransform(this.props.btnSize) : Taro.pxTransform(this.props.horizontalMargin);
        p['bottom'] = Taro.pxTransform(this.props.verticalMargin);
        break;
      case 'right-top':
        p['right'] = hide ? '-' + Taro.pxTransform(this.props.btnSize) : Taro.pxTransform(this.props.horizontalMargin);
        p['top'] = Taro.pxTransform(this.props.verticalMargin);
        break;
      case 'right-bottom':
        p['right'] = hide ? '-' + Taro.pxTransform(this.props.btnSize) : Taro.pxTransform(this.props.horizontalMargin);
        p['bottom'] = Taro.pxTransform(this.props.verticalMargin);
        break;
    }

    p['currentIcon'] = this.props.icon;
    this.setState(p);
    this.animation = Taro.createAnimation({
      duration: this.props.duration,
      timingFunction: 'ease'
    });
  }


  ////////////////////////////////////////////////////////////
  ////////// 事件处理函数
  ////////////////////////////////////////////////////////////
  onFloatBtnClick(e: ITouchEvent) {
    this.props.onClick(e);
  }


  btn_status: 'hiding' | 'showing' | 'showed' | 'hided' = 'showed';

  /**
   * 指定一个阈值，和当前值，组件自行判断是否隐藏
   * @param threshold
   * @param value
   */
  updateHideThreshold(threshold: number, value: number) {
    if (value >= threshold && this.btn_status === 'hided') {
      this.show();
    } else if (value < threshold && this.btn_status === 'showed') {
      this.hide();
    }
  }


  /**
   * 隐藏按钮（如果是显示状态切换成隐藏，则向右侧划出）
   */
  hide() {
    if (!this.state._hide && this.btn_status === 'showed') {
      this.btn_status = 'hiding';
      //未隐藏则执行隐藏功能
      if (this.props.position.startsWith('right'))
        this.animation.right(`-${Taro.pxTransform(this.props.btnSize + this.props.horizontalMargin)}`).step();
      else if (this.props.position.startsWith('left')) {
        this.animation.left(`-${Taro.pxTransform(this.props.btnSize + this.props.horizontalMargin)}`).step();
      }
      this.setState({
        _hide: true,
        animationData: this.animation.export()
      }, () => {
        this.btn_status = 'hided';
      });
    }
  }

  /**
   * 显示按钮（如果是隐藏状态切换成显示，则从右侧划出）
   */
  show = () => {
    if (this.state._hide && this.btn_status === 'hided') {
      this.btn_status = 'showing';
      //隐藏则执行显示功能
      if (this.props.position.startsWith('right'))
        this.animation.right(`${Taro.pxTransform(this.props.btnSize + this.props.horizontalMargin)}`).step();
      else if (this.props.position.startsWith('left')) {
        this.animation.left(`${Taro.pxTransform(this.props.btnSize + this.props.horizontalMargin)}`).step();
      }
      this.setState({
        _hide: false,
        animationData: this.animation.export()
      }, () => {
        this.btn_status = 'showed';
      });
    }
  };

  /**
   * 返回按钮当前是否处于隐藏状态
   */
  isHide = () => {
    return this.state._hide;
  };

  /**
   * 调用chang进行按钮翻转
   * @param open
   */
  change = open => {
    if (open) {
      this.animation.rotateY(180).step();
      this.setState({
        animationData: this.animation.export()
      });
      setTimeout(() => {
        this.setState({
          currentIcon: this.props.changeIcon
        });
      }, this.props.duration / 2);
    } else {
      this.animation.rotateY(-180).step();
      this.setState({
        animationData: this.animation.export()
      });
      setTimeout(() => {
        this.setState({
          currentIcon: this.props.icon
        });
      }, this.props.duration / 2);
    }
  };

  render() {
    const {
      btnSize: btnSize,
      iconSize: iconSize,
      backgroundColor: backgroundColor,
      shadowColor: shadowColor
    } = this.props;
    const {
      left: left,
      right: right,
      top: top,
      bottom: bottom,
      animationData: animationData,
      currentIcon: currentIcon
    } = this.state;
    return (
      <View
        className={`quick-taro-float-btn-icon-body quick-taro-float-btn-icon-body-${this.props.position}`}
        hoverClass='quick-taro-float-btn-icon-hover'
        onClick={this.onFloatBtnClick}
        style={
          `box-shadow: ${Taro.pxTransform(3)} ${Taro.pxTransform(3)} ${Taro.pxTransform(20)} ${shadowColor};
          background-color: ${backgroundColor};
          width: ${Taro.pxTransform(btnSize)};
          height: ${Taro.pxTransform(btnSize)};
          ${(!!left ? 'margin-left: ' + left + ';' : '')}
          ${(!!right ? 'margin-right: ' + right + '; ' : '')}
          ${(!!top ? 'margin-top: ' + top + '; ' : '')}
          ${(!!bottom ? 'margin-bottom: ' + bottom + '; ' : '')}
          `
        }
        animation={animationData}
      >
        <Image
          className='quick-taro-float-btn-icon'
          src={currentIcon}
          mode='aspectFit'
          style={`width: ${Taro.pxTransform(iconSize)}; height: ${Taro.pxTransform(iconSize)};`}
        />
      </View>
    );
  }
}

export default XbFloatBtn;
