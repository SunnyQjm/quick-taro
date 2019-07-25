import Taro, {Config} from '@tarojs/taro';
import {View} from '@tarojs/components';
import BaseComponent from '../quick-taro-base-component';

import './index.scss';
import {CSSProperties} from "react";


export interface QuickTaroRefreshPointComponentProps {
  /**
   * 是否是正在刷新状态
   * true   =>   三个点循环演示刷新动画
   * false  =>   三个点静止
   */
  refreshing: boolean,

  /**
   * 自定义原点的样式
   */
  pointStyle: string | CSSProperties,

  /**
   * 自定义刷新头样式
   */
  customStyle: string | CSSProperties,

  /**
   * 测量刷新头的高度
   * @param height
   */
  onHeightChange: (height: number) => any
}

interface QuickTaroRefreshPointComponentState {
}

/**
 * 仿微信小程序默认下拉刷新动画
 */
class QuickTaroRefreshPointComponent extends BaseComponent<QuickTaroRefreshPointComponentProps, QuickTaroRefreshPointComponentState> {
  config: Config = {};

  static defaultProps = {
    refreshing: true,
    pointStyle: '',
    customStyle: '',
    onHeightChange: () => {}
  };

  constructor(props) {
    super(props);
  }

  componentDidMount(): void {

  }

  componentWillUpdate(): void {
    this.getRectInfo('.quick-taro-refresh-point')
      .then(rect => {
        console.log(rect);
        this.props.onHeightChange && this.props.onHeightChange(rect.height)
      })
      .catch(err => {
        console.error(err);
      })
  }

  render(): any {
    const {
      refreshing,
      pointStyle,
      customStyle
    } = this.props;
    return (
      <View className='quick-taro-refresh-point' style={customStyle}>
        <View className={`quick-taro-refresh-point__point ${refreshing ? 'quick-taro-refresh-point__point_animation' : ''}`} style={pointStyle}/>
        <View className={`quick-taro-refresh-point__point ${refreshing ? 'quick-taro-refresh-point__point_animation' : ''}`} style={pointStyle}/>
        <View className={`quick-taro-refresh-point__point ${refreshing ? 'quick-taro-refresh-point__point_animation' : ''}`} style={pointStyle}/>
      </View>
    );
  }
}

export default QuickTaroRefreshPointComponent;
