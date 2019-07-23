import Taro, { Config } from '@tarojs/taro';
import { View, Block, Text } from '@tarojs/components';
import QuickTaroBaseComponent from '../quick-taro-base-component';
import QuickTaroMask from '../quick-taro-mask';
import './index.scss';


interface QuickTaroLoadingProps {
  zIndex: number,

  /**
   * 水波纹特效的大小范围
   */
  size: number,
  color: string,
  maskColor: string,
  maskOpacity: number,
  text: string,
}

interface QuickTaroLoadingState {
}

/**
 * 这是一个水波纹Loading特效组件
 */
class QuickTaroLoading extends QuickTaroBaseComponent<QuickTaroLoadingProps, QuickTaroLoadingState> {
  config: Config = {};

  static defaultProps = {
    color: '#af1',
    size: 100,
    zIndex: 11,
    maskColor: '#fff',
    maskOpacity: 0.5,
    text: ''
  };

  constructor(props) {
    super(props);
  }

  render(): any {
    const {
      zIndex,
      size,
      color,
      maskColor,
      maskOpacity,
      text
    } = this.props;
    const sizeText = Taro.pxTransform(size);
    return (
      <Block>
        <View className='quick-taro-loading-body'>
          <View className='quick-taro-loading-wave' style={
            `z-index: ${zIndex}; background-color: ${color}; width: ${sizeText}; height: ${sizeText}`
          }
          >
          </View>
          {
            !!text && (
              <Text style={`margin-top: ${Taro.pxTransform(20)}`}>{text}</Text>
            )
          }
        </View>
        <QuickTaroMask clickHide={false} initShow opacity={maskOpacity} backgroundColor={maskColor} />
      </Block>

    );
  }
}

export default QuickTaroLoading;
