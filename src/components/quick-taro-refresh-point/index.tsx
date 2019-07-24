import Taro, {Config} from '@tarojs/taro';
import {View} from '@tarojs/components';
import BaseComponent from '../quick-taro-base-component';

import './index.scss';
import {CSSProperties} from "react";


interface QuickTaroRefreshPointComponentProps {
  /**
   * 是否是正在刷新状态
   * true   =>   三个点循环演示刷新动画
   * false  =>   三个点静止
   */
  refreshing: boolean,

  /**
   * 自定义原点的样式
   */
  pointStyle: string | CSSProperties
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
    pointStyle: ''
  };

  constructor(props) {
    super(props);
  }

  render(): any {
    const {
      refreshing,
      pointStyle
    } = this.props;
    return (
      <View className='quick-taro-refresh-point'>
        <View className={`quick-taro-refresh-point__point ${refreshing ? 'quick-taro-refresh-point__point_animation' : ''}`} style={pointStyle}/>
        <View className={`quick-taro-refresh-point__point ${refreshing ? 'quick-taro-refresh-point__point_animation' : ''}`} style={pointStyle}/>
        <View className={`quick-taro-refresh-point__point ${refreshing ? 'quick-taro-refresh-point__point_animation' : ''}`} style={pointStyle}/>
      </View>
    );
  }
}

export default QuickTaroRefreshPointComponent;
