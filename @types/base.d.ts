import {ComponentClass, CSSProperties} from "react";

export interface QuickTaroBaseComponentProps {
  className?: string | string[] | { [key: string]: boolean }

  customStyle?: string | CSSProperties
}

declare const QuickTaroBaseComponent: ComponentClass<QuickTaroBaseComponentProps>;

export default QuickTaroBaseComponent;
