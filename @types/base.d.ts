import {ComponentClass, CSSProperties} from "react";

export interface QuickTaroBarComponentProps {
  className?: string | string[] | { [key: string]: boolean }

  customStyle?: string | CSSProperties
}

declare const QuickTaroBarComponent: ComponentClass<QuickTaroBarComponentProps>;

export default QuickTaroBarComponent;
