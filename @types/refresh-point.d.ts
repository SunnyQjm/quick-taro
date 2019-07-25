import {QuickTaroBaseComponentProps} from './base';
import {ComponentClass, CSSProperties} from "react";

export interface QuickTaroRefreshPointComponentProps extends QuickTaroBaseComponentProps{
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

declare const QuickTaroRefreshPoint: ComponentClass<QuickTaroRefreshPointComponentProps>;

export default QuickTaroRefreshPoint;
