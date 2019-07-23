import {QuickTaroBarComponentProps} from './base'
import {ITouchEvent} from "@tarojs/components/types/common";
import {ComponentClass} from "react";

export interface QuickTaroFloatBtnProps extends QuickTaroBarComponentProps{
  btnSize: number,
  position: 'left-top' | 'left-bottom' | 'right-top' | 'right-bottom',
  verticalMargin: number,
  horizontalMargin: number,
  icon: string,
  iconSize: number,
  backgroundColor: string,
  shadowColor: string,
  hide: boolean,
  duration: number,
  changeIcon: string,
  onClick: (e: ITouchEvent) => void
}

declare const QuickTaroFloatBtn: ComponentClass<QuickTaroFloatBtnProps>;

export default QuickTaroFloatBtn;
