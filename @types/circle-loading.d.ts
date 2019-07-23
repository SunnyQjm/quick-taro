import {QuickTaroBarComponentProps} from './base';
import {ComponentClass} from "react";

export interface QuickTaroCircleLoadingProps extends QuickTaroBarComponentProps{
  color?: string,
  size?: number,
  customStyle?: string,
}

declare const QuickTaroCircleLoading: ComponentClass<QuickTaroCircleLoadingProps>;

export default QuickTaroCircleLoading;
