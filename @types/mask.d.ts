import {QuickTaroBarComponentProps} from './base';
import {ComponentClass} from "react";

export interface QuickTaroMaskProps extends QuickTaroBarComponentProps{
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

declare const QuickTaroMask: ComponentClass<QuickTaroMaskProps>;

export default QuickTaroMask;
