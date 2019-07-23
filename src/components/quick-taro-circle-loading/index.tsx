import Taro, { Config } from '@tarojs/taro';
import { View } from '@tarojs/components';
import BaseComponent from '../quick-taro-base-component';

import './index.scss';


interface QuickTaroCircleLoadingProps {
  color: string,
  size: number,
  customStyle: string,
}

interface QuickTaroCircleLoadingState {
}

class QuickTaroCircleLoading extends BaseComponent<QuickTaroCircleLoadingProps, QuickTaroCircleLoadingState> {
  config: Config = {};

  static defaultProps =  {
    size: 50,
    color: '#af1',
    customStyle: ''
  };

  constructor(props) {
    super(props);
  }

  render(): any {
    const {
      size,
      color,
      customStyle
    } = this.props;
    const sizeStyle = {
      width: size ? `${Taro.pxTransform(size)}` : '',
      height: size ? `${Taro.pxTransform(size)}` : '',
    };

    const colorStyle = {
      'border': color ? `1px solid ${color}` : '',
      'border-color': color ? `${color} transparent transparent transparent` : '',
    };
    const ringStyle = Object.assign({}, colorStyle, sizeStyle);
    return (
      <View className='at-loading quick-taro-circle-loading-body' style={sizeStyle + ';' + customStyle}>
        <View className='at-loading__ring' style={ringStyle} />
        <View className='at-loading__ring' style={ringStyle} />
        <View className='at-loading__ring' style={ringStyle} />
      </View>
    );
  }
}

export default QuickTaroCircleLoading;
