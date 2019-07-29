import {QuickTaroBaseComponentProps} from './base';
import {CommonEventFunction, ITouchEvent} from "@tarojs/components/types/common";
import {ComponentClass} from "react";
import {QuickTaroFloatBtnProps} from "./float-btn";

export interface QuickTaroContentWrapperProps extends QuickTaroBaseComponentProps {
  headerHeight?: number,
  renderHeader?: any,
  showLoading?: boolean,
  fullScreen?: boolean,
  customStyle?: string,
  onSlideLeft?: () => void,
  onSlideRight?: () => void,
  onSlideUp?: () => void,
  onSlideDown?: () => void,
  onTouchStart?: (e: ITouchEvent) => any,
  onTouchMove?: (e: ITouchEvent) => any,
  onTouchEnd?: (e: ITouchEvent) => any,
  onTouchCancel?: (e: ITouchEvent) => any,
  onScroll?: (e: CommonEventFunction) => any,
  scrollX?: boolean,
  scrollY?: boolean,
  onScrollToLower?: (e: CommonEventFunction) => any,
  loadingText?: string,
  showBackTop?: boolean,
  backTopBtnProps?: QuickTaroFloatBtnProps,
  pageBackground?: string,
}

declare const QuickTaroContentWrapper: ComponentClass;

export default QuickTaroContentWrapper;
