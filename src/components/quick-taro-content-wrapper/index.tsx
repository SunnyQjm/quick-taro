import Taro, {Config} from '@tarojs/taro';
import {View, Block, ScrollView} from '@tarojs/components';
import {AtMessage} from 'taro-ui';
import {CommonEventFunction, ITouchEvent} from '@tarojs/components/types/common';

import BaseComponent from '../quick-taro-base-component';
import QuickTaroFloatBtn from '../quick-taro-float-btn';
import QuickTaroLoading from '../quick-taro-loading';
import './index.scss';
import {
  back_top
} from '../../images'


interface QuickTaroContentWrapperProps {
  barHeight: number,
  showLoading: boolean,
  fullScreen: boolean,
  customStyle: string,
  onSlideLeft: () => void,
  onSlideRight: () => void,
  onSlideUp: () => void,
  onSlideDown: () => void,
  onTouchStart: (e: ITouchEvent) => any,
  onTouchMove: (e: ITouchEvent) => any,
  onTouchEnd: (e: ITouchEvent) => any,
  onTouchCancel: (e: ITouchEvent) => any,
  onScroll: (e: CommonEventFunction) => any,
  scrollX: boolean,
  scrollY: boolean,
  onScrollToLower: (e: CommonEventFunction) => any,
  loadingText: string,
  showBackTop: boolean,
  // empty: boolean,
  // emptyText: string,
  // emptyImg: string,
  backTopBtnVerticalMargin: number,
}

interface QuickTaroContentWrapperState {
  scrollTop: number,
  statusBarHeight: number,
}


class QuickTaroContentWrapper extends BaseComponent<QuickTaroContentWrapperProps, QuickTaroContentWrapperState> {

  static defaultProps = {
    // statusBarHeight: 25,
    barHeight: 34,
    showLoading: false,
    fullScreen: false,
    contentStyle: '',
    // empty: false,
    // emptyText: '什么也没有找到呀~',
    // emptyImg: BaseImages.Images.img_empty,
    pageSpin: false,
    customStyle: '',
    scrollX: false,
    scrollY: true,
    loadingText: '',
    showBackTop: false,
    backTopBtnVerticalMargin: 0,
    onSlideLeft: () => {

    },
    onSlideRight: () => {

    },
    onSlideDown: () => {

    },
    onSlideUp: () => {

    },
    onTouchStart: () => {
    },
    onTouchEnd: () => {
    },
    onTouchMove: () => {
    },
    onTouchCancel: () => {
    },
    onScroll: () => {

    },
    onScrollToLower: () => {

    }
  };

  static threshold = 75;

  innerData: {
    startPageX: number,
    startPageY: number
  };


  config: Config = {
    usingComponents: {}
  };


  constructor(props) {
    super(props);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleTouchCancel = this.handleTouchCancel.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleOnScroll = this.handleOnScroll.bind(this);
    this.onBackTop = this.onBackTop.bind(this);
    this.onBackTopBtnRef = this.onBackTopBtnRef.bind(this);
    // this.updateScrollTop = debounce(this.updateScrollTop, 200).bind(this);
    this.updateScrollTop = this.updateScrollTop.bind(this);

    this.innerData = {
      startPageX: -1,
      startPageY: -1
    };
    this.state = {
      statusBarHeight: 0,
      scrollTop: 0
    }
  }

  componentWillMount(): void {
    if (this.isWeapp()) {
      this.setState({
        statusBarHeight: Taro.getSystemInfoSync().statusBarHeight
      })
    }
  }


  handleTouchStart(e: ITouchEvent) {
    this.innerData.startPageX = e.touches[0].pageX;
    this.innerData.startPageY = e.touches[0].pageY;
    return this.props.onTouchStart(e);
  }


  handleTouchEnd(e: ITouchEvent) {
    this.props.onTouchEnd(e);
    if (this.innerData.startPageX === -1 && this.innerData.startPageY === -1)
      return;


    let endPageX;
    let endPageY;
    if (process.env.TARO_ENV === 'weapp') {
      endPageX = e.changedTouches[0]['pageX'];
      endPageY = e.changedTouches[0]['pageY'];
    } else {
      endPageX = e.changedTouches[0].x;
      endPageY = e.changedTouches[0].y;
    }

    const horizontalDeviation = endPageX - this.innerData.startPageX;
    const verticalDeviation = endPageY - this.innerData.startPageY;
    if (Math.abs(horizontalDeviation) > QuickTaroContentWrapper.threshold) {
      //处理水平触摸事件
      if (horizontalDeviation > 0) {
        //右滑
        this.props.onSlideRight();
        // this.parentCallback('slideRight');
      } else {
        //左滑
        this.props.onSlideLeft();
        // this.parentCallback('slideLeft');
      }
    }

    if (Math.abs(verticalDeviation) > QuickTaroContentWrapper.threshold) {
      //处理纵向触摸事件
      if (verticalDeviation > 0) {
        //下滑
        this.props.onSlideDown();
        // this.parentCallback('slideDown');
      } else {
        //上滑
        this.props.onSlideUp();
        // this.parentCallback('slideUp');
      }
    }
  }

  handleTouchCancel(e: ITouchEvent) {
    this.innerData.startPageX = -1;
    this.innerData.startPageY = -1;
    return this.props.onTouchCancel(e);
  }

  handleTouchMove(e: ITouchEvent) {
    return this.props.onTouchMove(e);
  }

  backTopBtn: QuickTaroFloatBtn;

  onBackTopBtnRef(node) {
    this.backTopBtn = node;
  }

  /**
   * 处理回到顶部
   */
  onBackTop(callback) {
    if (this.state.scrollTop === 0) {
      this.setState({
        scrollTop: 1
      }, () => {
        this.setState({
          scrollTop: 0
        }, callback);
      });
    } else {
      this.setState({
        scrollTop: 0
      }, callback);
    }
  }

  _scrollTop: number = 0;

  updateScrollTop(scrollTop) {
    this.setState({
      scrollTop: scrollTop
    });
  }

  handleOnScroll(e: any) {
    if (e.type === 'scroll') {
      this._scrollTop = e.detail.scrollTop;
      if (!!this.backTopBtn && this.backTopBtn.updateHideThreshold) {
        this.backTopBtn.updateHideThreshold(200, this._scrollTop);
      }
      if (this.isH5()) {     //h5
        this.updateScrollTop(e.detail.scrollTop);
      }
    }
    this.props.onScroll(e);
  }


  render(): any {
    const {
      barHeight,
      loadingText,
      showBackTop,
      backTopBtnVerticalMargin,
      // empty,
      // emptyText,
      // emptyImg
    } = this.props;
    const {
      statusBarHeight
    } = this.state;

    let _statusBarHeight = statusBarHeight;
    if (this.isH5()) {
      _statusBarHeight = 0;
    }
    return (
      <Block>
        <ScrollView
          className='quick-taro-content-wrapper-body'
          onTouchStart={this.handleTouchStart}
          onTouchCancel={this.handleTouchCancel} onTouchEnd={this.handleTouchEnd}
          onTouchMove={this.handleTouchMove}
          style={this.props.customStyle}
          scrollY={this.props.scrollY}
          scrollX={this.props.scrollX}
          onScroll={this.handleOnScroll}
          {
            ...{
              throttle: false
            }
          }
          scrollTop={this.state.scrollTop}
          onScrollToLower={this.props.onScrollToLower}
          lowerThreshold={200}
          scrollWithAnimation
        >
          <View style={'height: ' + _statusBarHeight + 'px'}/>
          <View style={'height: ' + barHeight + 'pt'}/>
          <View
            style={`${this.props.fullScreen ? 'height: calc(100vh - ' + _statusBarHeight + 'px - ' + barHeight + 'pt);' : ''}; position: relative;`}
          >
            <View style='width: 100%; height: 0.01px'/>

            {this.props.children}


          </View>
        </ScrollView>
        {
          this.props.showLoading ?
            <QuickTaroLoading text={loadingText}/>
            :
            ''
        }
        <AtMessage customStyle={
          `margin-top: calc(${_statusBarHeight}px + ${barHeight}pt); z-index: 20;`
        }
        />
        {
          showBackTop && (
            <QuickTaroFloatBtn onClick={this.onBackTop} icon={back_top} hide ref={this.onBackTopBtnRef}
                               verticalMargin={backTopBtnVerticalMargin}
            />
          )
        }
      </Block>

    );
  }
}


export default QuickTaroContentWrapper;
