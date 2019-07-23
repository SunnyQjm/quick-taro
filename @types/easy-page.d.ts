import {QuickTaroBarComponentProps} from './base';
import {QuickTaroNavBarProps} from './nav-bar';
import {QuickTaroContentWrapperProps} from './content-wrapper';
import {ComponentClass} from "react";

export interface QuickTaroEasyPageProps extends QuickTaroBarComponentProps{
  navBarProps: QuickTaroNavBarProps,
  contentWrapperProps: QuickTaroContentWrapperProps
}

declare const QuickTaroEasyPage: ComponentClass<QuickTaroEasyPageProps>;

export default QuickTaroEasyPage;
