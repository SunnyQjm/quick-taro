import Taro, {Config} from '@tarojs/taro';
import BaseComponent from '../quick-taro-base-component';
import QuickTaroNavBar, {QuickTaroNavBarProps} from '../quick-taro-nav-bar';
import QuickTaroContentWrapper, {QuickTaroContentWrapperProps} from '../quick-taro-content-wrapper';
import QuickTaroRefreshScrollView, {QuickTaroScrollViewComponentProps} from '../quick-taro-refresh-scroll-view';


import './index.scss';
import {Block} from "@tarojs/components";


interface QuickTaroEasyPageComponentProps {
  navBarProps: QuickTaroNavBarProps,
  contentWrapperProps: QuickTaroContentWrapperProps,
  refreshScrollViewProps: QuickTaroScrollViewComponentProps,
  mode: 'content-wrapper' | 'refresh-scroll-view'
}

interface QuickTaroEasyPageComponentState {
  headerHeight: number
}

class QuickTaroEasyPageComponent extends BaseComponent<QuickTaroEasyPageComponentProps, QuickTaroEasyPageComponentState> {
  config: Config = {};

  static defaultProps = {
    navBarProps: {},
    contentWrapperProps: {},
    refreshScrollViewProps: {},
    mode: 'content-wrapper'
  };

  constructor(props) {
    super(props);
    this.state = {
      headerHeight: 0
    }
  }

  render(): any {
    const {
      headerHeight,
    } = this.state;
    const {
      contentWrapperProps,
      refreshScrollViewProps,
      mode,
      navBarProps
    } = this.props;
    return (
      <Block>
        <QuickTaroNavBar
          {...navBarProps}
          onHeightChange={(height) => {
            this.setState({
              headerHeight: height
            })
          }
          }
        />
        {
          mode === 'content-wrapper' &&
          <QuickTaroContentWrapper
            {...contentWrapperProps}
            headerHeight={headerHeight}
          >
            {this.props.children}
          </QuickTaroContentWrapper>
        }

        {
          mode === 'refresh-scroll-view' &&
          <QuickTaroRefreshScrollView
            contentWrapperProps={{
              ...contentWrapperProps,
              headerHeight: headerHeight,
            }}

            {...refreshScrollViewProps}
          >
            {this.props.children}
          </QuickTaroRefreshScrollView>
        }

      </Block>

    );
  }
}

export default QuickTaroEasyPageComponent;
