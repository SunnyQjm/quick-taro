import {QuickTaroBaseComponentProps} from './base';
import {QuickTaroRefreshPointComponentProps} from "./refresh-point";
import {QuickTaroContentWrapperProps} from "./content-wrapper";
import {ComponentClass, CSSProperties} from "react";
import {QuickTaroEmptyViewProps} from "./empty-view";

export interface QuickTaroRefreshScrollViewProps extends QuickTaroBaseComponentProps{
  contentWrapperProps?: QuickTaroContentWrapperProps,
  customStyle?: string | CSSProperties,
  /**
   * 是否允许下拉刷新
   */
  enablePullRefresh?: boolean,
  /**
   * 是否允许上拉加载更多
   */
  enableLoadMore?: boolean,
  /**
   * 阻尼系数(阻尼系数越大，实际滑动的距离对头部下拉距离的影响越小)
   */
  damping?: number,

  /**
   * 回弹动画持续时间
   */
  springBackDuration?: number,

  /**
   * 刷新回调
   */
  onRefresh?: (stopRefreshCallback: any) => void,

  /**
   * 页面滚动回调
   * @param scrollTop
   */
  onScroll?: (scrollTop: number) => void,

  /**
   * 加载更多回调
   * @param loadFinishCallback
   */
  onLoadMore?: (loadFinishCallback: (finish: boolean) => void) => void,

  /**
   * 控制回到顶部按钮的隐藏和显示
   */
  showBackTop?: boolean,

  /**
   * 设置刷新头样式
   */
  refreshHeaderProps?: QuickTaroRefreshPointComponentProps,

  /**
   * 是否数据为空
   */
  empty?: boolean,

  emptyViewProps?: QuickTaroEmptyViewProps
}

declare const QuickTaroRefreshScrollView: ComponentClass<QuickTaroRefreshScrollViewProps>;

export default QuickTaroRefreshScrollView;
