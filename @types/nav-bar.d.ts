import {QuickTaroBaseComponentProps} from './base';
import {ComponentClass, CSSProperties} from "react";

export interface QuickTaroNavBarProps extends QuickTaroBaseComponentProps{
  title?: string,
  titleStyle?: string | CSSProperties,
  leftIconVisible?: boolean,
  rightIconVisible?: boolean,
  showTitleDropDownIcon?: boolean,
  leftIcon?: string,
  rightIcon?: string,
  preventBack?: boolean,
  barBg?: string,
  dropDownImage?: string,
  onLeftIconClick?: () => void,
  onTitleClick?: () => void,
  onRightIconClick?: () => void,
  onHeightChange?: (height: number) => void
}

declare const QuickTaroNavBar: ComponentClass<QuickTaroNavBarProps>;

export default QuickTaroNavBar;
