import {QuickTaroBaseComponentProps} from './base';
import {ComponentClass, CSSProperties} from "react";

export interface QuickTaroEmptyViewProps extends QuickTaroBaseComponentProps{
  emptyText?: string,
  emptyImage?: string,
  emptyImageSize?: number,
  customStyle?: CSSProperties,
  emptyImageStyle?: CSSProperties,
  emptyTextStyle?: CSSProperties,
}

declare const QuickTaroEmptyView: ComponentClass<QuickTaroEmptyViewProps>;

export default QuickTaroEmptyView;
