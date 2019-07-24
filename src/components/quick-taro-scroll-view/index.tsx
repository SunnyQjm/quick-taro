import Taro from '@tarojs/taro';
import BaseComponent from '../quick-taro-base-component';
import './index.scss';
import {QuickTaroContentWrapperProps} from "../quick-taro-content-wrapper";
import {CSSProperties} from "react";
import {ITouchEvent} from "@tarojs/components/types/common";
import QuickTaroContentWrapper from '../quick-taro-content-wrapper';

interface Position {
  x: number,
  y: number,
}

interface QuickTaroScrollViewComponentProps {
  contentWrapperProps: QuickTaroContentWrapperProps,
  customStyle: string | CSSProperties,
  /**
   * 是否允许下拉刷新
   */
  enablePullRefresh: boolean,
  /**
   * 是否允许上拉加载更多
   */
  enableLoadMore: boolean,
  /**
   * 阻尼系数(阻尼系数越大，实际滑动的距离对头部下拉距离的影响越小)
   */
  damping: number,

  /**
   * 回弹动画持续时间
   */
  springBackDuration: number,

  /**
   * 刷新回调
   */
  onRefresh: (stopRefreshCallback: any) => void,

  /**
   * 页面滚动回调
   * @param scrollTop
   */
  onScroll: (scrollTop: number) => void,

  /**
   * 加载更多回调
   * @param loadFinishCallback
   */
  onLoadMore: (loadFinishCallback: (finish: boolean) => void) => void,

  /**
   * 是否数据为空
   */
  empty: boolean,
  /**
   * 数据为空时的提示文字
   */
  emptyText: string,
  /**
   * 数据为空时显示的占位图
   */
  emptyImg: string,
  /**
   * 数据为空时显示的占位图的大小
   */
  emptyImgSize: number,
}

interface QuickTaroScrollViewComponentState {
  /**
   * 下滑的距离
   */
  scrollDelta: number,

  /**
   * 控制回到顶部按钮的隐藏和显示
   */
  showBackTop: boolean,
  /**
   * 当前组件的状态
   * init           =>    初始状态
   * refreshing     =>    正在刷新
   * pulling        =>    正在下拉
   * spring-back    =>    正在回弹
   */
  status: 'init' | 'refreshing' | 'pulling' | 'spring-back'
}

class QuickTaroScrollViewComponent extends BaseComponent<QuickTaroScrollViewComponentProps, QuickTaroScrollViewComponentState> {

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.changeStatus = this.changeStatus.bind(this);
    this.smoothScrollTo = this.smoothScrollTo.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.state = {
      status: 'init',
      showBackTop: false,
      scrollDelta: 0
    }
  }

  // 触摸开始位置
  startPosition: Position = {
    x: 0, y: 0,
  };

  // 最后一次记录的触摸点的位置
  lastPosition: Position = {
    x: 0, y: 0
  };

  smoothScrollSetStateId: any;

  /**
   * 改变当前状态
   * @param status
   * @param callback
   */
  changeStatus(status: 'init' | 'refreshing' | 'pulling' | 'spring-back', callback: () => any = () => {
  }) {
    this.setState({
      status: status
    }, callback);
  }

  /**
   * 平滑的纵向滚动到指定位置
   * @param y
   * @param callback
   */
  smoothScrollTo(y: number, callback: () => any = () => {
  }) {
    this.smoothScrollSetStateId && clearTimeout(this.smoothScrollSetStateId);
    this.setState({
      scrollDelta: y
    }, () => {
      this.smoothScrollSetStateId = setTimeout(callback, this.props.springBackDuration);
    })
  }

  handleTouchStart(e: ITouchEvent) {

  }

  handleTouchMove(e: ITouchEvent) {

  }

  handleTouchEnd() {

  }

  render(): any {
    const {
      contentWrapperProps
    } = this.props;
    const {
      showBackTop
    } = this.state;
    return (
      <QuickTaroContentWrapper
        {...contentWrapperProps}
        fullScreen
        showBackTop={showBackTop}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
      >

      </QuickTaroContentWrapper>
    );
  }
}

export default QuickTaroScrollViewComponent;
