import {QuickTaroBaseComponentProps} from './base';
import {ComponentClass} from "react";

export interface QuickTaroCircleLoadingProps extends QuickTaroBaseComponentProps{
  color?: string,
  size?: number,
  customStyle?: string,
}

declare const QuickTaroCircleLoading: ComponentClass<QuickTaroCircleLoadingProps>;

export default QuickTaroCircleLoading;
