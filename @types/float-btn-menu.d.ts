import {QuickTaroBaseComponentProps} from './base';
import {ComponentClass} from "react";

export interface QuickTaroFloatBtnMenuProps extends QuickTaroBaseComponentProps{
  btnSize?: number,
  position?: 'left-top' | 'left-bottom' | 'right-top' | 'right-bottom',
  verticalMargin?: number,
  horizontalMargin?: number,
  icon?: string,
  changeIcon?: string,
  iconSize?: number,
  iconBg?: string,
  iconShadowColor?: string,
  duration?: number,
  menuList?: string[],
  menuRadius?: number,
  menuItemFontSize?: number,
  open?: false,
  btnMenuMargin?: number,
  declareMenuWidth?: number,
  onMenuItemClick?: (index: number, menuText: string) => void,
}

declare const QuickTaroFloatBtnMenu: ComponentClass<QuickTaroFloatBtnMenuProps>;

export default QuickTaroFloatBtnMenu;
