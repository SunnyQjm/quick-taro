import Taro, {Config} from '@tarojs/taro';
import {View} from '@tarojs/components';
import BaseComponent from '../quick-taro-base-component';

import './index.scss';


interface QuickTaroMaskProps {
  zIndex?: number,
  opacity?: number,
  backgroundColor?: string,
  duration?: number,
  initShow?: boolean,
  /**
   * 是否开启点击Hide Mask
   */
  clickHide?: boolean,
  onHide?: (show: boolean) => void
}

interface QuickTaroMaskState {
  animationData: any,
  _zIndex: number
}

/**
 * 这是一个Mask组件，提供类似模态框背景暗化效果。
 *
 * 该组件是个非受控组件，所有行为均由组件内部控制
 */
class QuickTaroMask extends BaseComponent<QuickTaroMaskProps, QuickTaroMaskState> {
  config: Config = {};

  static defaultProps = {
    zIndex: 11,
    opacity: 0.2,
    backgroundColor: '#000',
    duration: 200,
    initShow: false,
    clickHide: true,
    onHide: () => {
    }
  };

  animation: Taro.Animation;
  _show: boolean;

  constructor(props) {
    super(props);
    this.state = {
      animationData: [],
      _zIndex: this.props.initShow ? this.props.zIndex ? this.props.zIndex : 11 : -1
    };
    this._show = !!this.props.initShow;
    this.animation = Taro.createAnimation({
      duration: this.props.duration,
      timingFunction: 'ease'
    });
    this.handleOnAnimationEnd = this.handleOnAnimationEnd.bind(this);
    this.handleOnMaskClick = this.handleOnMaskClick.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  handleOnMaskClick() {
    if (this._show && this.props.clickHide) {
      this.hide();
      this.props.onHide && this.props.onHide(this._show);
    }
  }

  show() {
    if (!this._show) {
      this.animation
        .opacity(this.props.opacity)
        .step();
      this.setState({
        _zIndex: this.props.zIndex ? this.props.zIndex : 0,
        animationData: this.animation.export()
      });
      this._show = true;
    }
  }

  hide() {
    if (this._show) {
      this.animation
        .opacity(0)
        .step();
      this.setState({
        animationData: this.animation.export()
      });
      this._show = false;
    }
  }

  /**
   * 动画结束时执行
   */
  handleOnAnimationEnd() {
    if (!this._show) {       //隐藏动画执行完毕，将Mask的z-index设置为-1，不会挡住前面视图的事件响应
      this.setState({
        _zIndex: -1
      });
    }
  }

  render(): any {
    const {
      backgroundColor,
      opacity,
      initShow
    } = this.props;
    const {
      _zIndex,
      animationData
    } = this.state;
    return (
      <View
        className='quick-taro-mask'
        style={`background-color: ${backgroundColor}; z-index: ${_zIndex}; opacity: ${initShow ? opacity : 0};`}
        animation={animationData}
        onAnimationStart={() => {
          console.log('on animationStart')
        }}
        onTransitionEnd={this.handleOnAnimationEnd}
        onClick={this.handleOnMaskClick}
      >

      </View>
    );
  }
}

export default QuickTaroMask;
