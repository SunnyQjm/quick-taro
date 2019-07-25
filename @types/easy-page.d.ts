import {QuickTaroBaseComponentProps} from './base';
import {QuickTaroNavBarProps} from './nav-bar';
import {QuickTaroContentWrapperProps} from './content-wrapper';
import {ComponentClass} from "react";
import {QuickTaroRefreshScrollViewProps} from "./refresh-scroll-view";

export interface QuickTaroEasyPageProps extends QuickTaroBaseComponentProps{
  navBarProps?: QuickTaroNavBarProps,
  contentWrapperProps?: QuickTaroContentWrapperProps,
  refreshScrollViewProps?: QuickTaroRefreshScrollViewProps,
  mode?: 'content-wrapper' | 'refresh-scroll-view'
}

declare const QuickTaroEasyPage: ComponentClass<QuickTaroEasyPageProps>;

export default QuickTaroEasyPage;
