import Taro from '@tarojs/taro';
import BaseComponent from '../quick-taro-base-component';
import './index.scss';
import {QuickTaroContentWrapperProps} from "../quick-taro-content-wrapper";
import {CSSProperties} from "react";
import {CommonEvent, ITouchEvent} from "@tarojs/components/types/common";
import QuickTaroContentWrapper from '../quick-taro-content-wrapper';
import QuickTaroRefreshPoint, {QuickTaroRefreshPointComponentProps} from '../quick-taro-refresh-point';
import QuickTaroEmptyView, {QuickTaroEmptyViewComponentProps} from '../quick-taro-empty-view';
import {View} from "@tarojs/components";

interface Position {
  x: number,
  y: number,
}

export interface QuickTaroScrollViewComponentProps {
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

  emptyViewProps?: QuickTaroEmptyViewComponentProps
}

interface QuickTaroScrollViewComponentState {
  /**
   * 下滑的距离
   */
  scrollDelta: number,


  /**
   * 当前组件的状态
   * init           =>    初始状态
   * refreshing     =>    正在刷新
   * pre-refreshing =>    预刷新，正在滚动到指定的刷新位置准备执行刷新
   * pulling        =>    正在下拉
   * spring-back    =>    正在回弹
   */
  status: 'init' | 'refreshing' | 'pulling' | 'spring-back' | 'pre-refresh',
  refreshHeaderHeight: number,
}

/**
 * 内容Wrapper组件，与 QuickTaroNavBar 搭配使用可以实现下拉刷新、上拉加载更多、一键回到顶部等功能
 */
class QuickTaroScrollViewComponent extends BaseComponent<QuickTaroScrollViewComponentProps, QuickTaroScrollViewComponentState> {

  static defaultProps = {
    emptyText: '',
    refreshHeaderProps: {},
    showBackTop: true,
    onLoadMore: () => {
    },
    onScroll: () => {
    },
    onRefresh: () => {
    },
    springBackDuration: 500,
    damping: 2,
    enableLoadMore: true,
    enablePullRefresh: true,
    customStyle: '',
    contentWrapperProps: {},
    emptyViewProps: {}
  };

  constructor(props) {
    super(props);
    this.changeStatus = this.changeStatus.bind(this);
    this.smoothScrollTo = this.smoothScrollTo.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.startRefresh = this.startRefresh.bind(this);
    this.stopRefresh = this.stopRefresh.bind(this);
    this.handleOnRefreshHeaderHeightChange = this.handleOnRefreshHeaderHeightChange.bind(this);
    this.handleOnScroll = this.handleOnScroll.bind(this);
    this.state = {
      status: 'init',
      scrollDelta: 0,
      refreshHeaderHeight: 0,
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

  /**
   * 流畅滚动到指定位置后执行回调的延迟事件标识
   */
  smoothScrollSetStateId: any;

  refreshHeaderHeight: number = 0;

  /**
   * 内部使用，记录当前滚动到的位置
   */
  _scrollTop: number = 0;

  /**
   * 保存内部状态
   */
  _state: 'init' | 'refreshing' | 'pulling' | 'spring-back' | 'pre-refresh' = 'init';

  /**
   * 刷新头是否需要平滑滚动
   */
  refreshHeaderNeedSmoothScroll = false;

  /**
   * 判断是否已经滚动到顶部
   */
  isScrollToTop(): boolean {
    return this._scrollTop <= 0;
  }

  handleOnScroll(e: CommonEvent) {
    this._scrollTop = e.detail.scrollTop;
    // console.log(this._scrollTop);
  }

  /**
   * 改变当前状态
   * @param status
   * @param callback
   */
  changeStatus(status: 'init' | 'refreshing' | 'pulling' | 'spring-back' | 'pre-refresh', callback: () => any = () => {
  }) {
    this._state = status;
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
    this.refreshHeaderNeedSmoothScroll = true;
    this.smoothScrollSetStateId && clearTimeout(this.smoothScrollSetStateId);
    this.setState({
      scrollDelta: y
    }, () => {
      this.smoothScrollSetStateId = setTimeout(() => {
        this.refreshHeaderNeedSmoothScroll = false;
        callback();
      }, this.props.springBackDuration);
    })
  }

  /**
   * 处理触摸事件起始
   * @param e
   */
  handleTouchStart(e: ITouchEvent) {
    // 记录开始时的位置
    this.startPosition.x = e.touches[0].clientX;
    this.startPosition.y = e.touches[0].clientY;
    this.lastPosition.x = e.touches[0].clientX;
    this.lastPosition.y = e.touches[0].clientY;
  }

  /**
   * 处理触摸移动事件
   * @param e
   */
  handleTouchMove(e: ITouchEvent) {
    // 允许下拉刷新，并且当前处于页面顶部的情况下才能触发下拉刷新
    if (this.props.enablePullRefresh && this.isScrollToTop()) {
      const newPosition = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
      switch (this._state) {
        case "init":
          // 在顶部触发下拉操作，切换当前状态为下拉中
          if (newPosition.y > this.startPosition.y) {
            this.changeStatus('pulling');
          }
          break;
        case "pulling":
          this.lastPosition = newPosition;
          const distance = (newPosition.y - this.startPosition.y) <= 0
            ? 0 : (newPosition.y - this.startPosition.y) / (this.props.damping ? this.props.damping : 1);
          this.setState({
            scrollDelta: distance
          });
          break;
      }
    } else {
      // console.log('not enable refresh of not in top');
    }

  }

  /**
   * 处理触摸事件终止
   */
  handleTouchEnd() {
    // 触摸事件结束时，只有当前状态处于下拉状态，才会进行判断
    if (this.state.status !== 'pulling') {
      return;
    }

    if (this.state.scrollDelta > this.refreshHeaderHeight * 3 / 4) {    // 滑动超过3/4则执行刷新操作
      this.startRefresh();
    } else {
      this.stopRefresh();
    }
  }

  /**
   * 触发下拉刷新操作
   */
  startRefresh() {
    if (this.props.enablePullRefresh) {
      this.changeStatus('pre-refresh', () => {
        this.smoothScrollTo(this.refreshHeaderHeight, () => {
          // 滚动到指定刷新位置之后执行刷新回调
          this.props.onRefresh && this.props.onRefresh(this.stopRefresh.bind(this));
          // 将当前状态切换为正在刷新状态
          this.changeStatus('refreshing');
        });
      })
    }
  }

  /**
   * 终止下拉刷新操作
   */
  stopRefresh() {
    setTimeout(() => {
      this.smoothScrollTo(0, () => {
        this.changeStatus('init');
      });
    }, 500);
  }

  handleOnRefreshHeaderHeightChange(height: number) {
    this.refreshHeaderHeight = height;
    this.setState({
      refreshHeaderHeight: height
    })
  }

  render(): any {
    const {
      contentWrapperProps,
      refreshHeaderProps,
      springBackDuration,
      empty,
      emptyViewProps
    } = this.props;
    const {
      status,
      refreshHeaderHeight,
      scrollDelta
    } = this.state;

    const headerTranslate = `translate3d(0, ${scrollDelta}px, 0)`;
    const bodyWrapperStyle: CSSProperties = {
      transform: headerTranslate,
      WebkitTransform: headerTranslate
    };
    if (this.refreshHeaderNeedSmoothScroll) {
      const duration = `${springBackDuration}ms`;
      bodyWrapperStyle.WebkitTransitionDuration = duration;
      bodyWrapperStyle.transitionDuration = duration;
    }
    return (
      <QuickTaroContentWrapper
        {...contentWrapperProps}
        fullScreen
        scrollY={status === 'init'}
        onScroll={this.handleOnScroll}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
      >
        <View
          className='quick-taro-refresh-scroll-view-body-wrapper'
          style={bodyWrapperStyle}
        >
          {
            empty && (
              <QuickTaroEmptyView
                {...emptyViewProps}
              />
            )
          }
          <View
            className='quick-taro-refresh-scroll-view-header-wrapper'
            style={{
              marginTop: `-${refreshHeaderHeight}px`,
              position: 'absolute',
            }}
          >
            <QuickTaroRefreshPoint
              refreshing={status === 'refreshing'}
              customStyle={{
                padding: Taro.pxTransform(30)
              }}
              {...refreshHeaderProps}
              onHeightChange={this.handleOnRefreshHeaderHeightChange}
            />
          </View>
          {this.props.children}
        </View>


      </QuickTaroContentWrapper>
    );
  }
}

export default QuickTaroScrollViewComponent;
