import {QuickTaroBaseComponentProps} from './base'
import {ComponentClass} from "react";

export interface QuickTaroLoadingProps extends QuickTaroBaseComponentProps {
  zIndex?: number,

  /**
   * 水波纹特效的大小范围
   */
  size?: number,
  color?: string,
  maskColor?: string,
  maskOpacity?: number,
  text?: string,
}

declare const QuickTaroLoading: ComponentClass<QuickTaroLoadingProps>;
export default QuickTaroLoading;
