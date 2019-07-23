import Taro, {Config} from '@tarojs/taro';
import BaseComponent from '../quick-taro-base-component';
import QuickTaroNavBar, {QuickTaroNavBarProps} from '../quick-taro-nav-bar';
import QuickTaroContentWrapper, {QuickTaroContentWrapperProps} from '../quick-taro-content-wrapper';

import './index.scss';


interface QuickTaroEasyPageComponentProps {
  navBarProps?: QuickTaroNavBarProps,
  contentWrapperProps?: QuickTaroContentWrapperProps
}

interface QuickTaroEasyPageComponentState {
  headerHeight: number
}

class QuickTaroEasyPageComponent extends BaseComponent<QuickTaroEasyPageComponentProps, QuickTaroEasyPageComponentState> {
  config: Config = {};

  static defaultProps = {
    navBarProps: {},
    contentWrapperProps: {}
  };

  constructor(props) {
    super(props);
    this.state = {
      headerHeight: 0
    }
  }

  render(): any {
    const {
      headerHeight
    } = this.state;
    return (
      <QuickTaroContentWrapper
        {...this.props.contentWrapperProps}
        headerHeight={headerHeight}
        renderHeader={
          <QuickTaroNavBar
            {...this.props.navBarProps}
            onHeightChange={(height) => {
              this.setState({
                headerHeight: height
              })
            }
            }
          />
        }
      >
        {this.props.children}
      </QuickTaroContentWrapper>
    );
  }
}

export default QuickTaroEasyPageComponent;
