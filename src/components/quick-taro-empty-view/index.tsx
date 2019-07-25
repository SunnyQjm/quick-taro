import Taro, {Config} from '@tarojs/taro';
import {View, Image, Text} from '@tarojs/components';
import BaseComponent from '../quick-taro-base-component';

import './index.scss';
import {CSSProperties} from "react";


export interface QuickTaroEmptyViewComponentProps {
  emptyText?: string,
  emptyImage?: string,
  emptyImageSize?: number,
  customStyle?: CSSProperties,
  emptyImageStyle?: CSSProperties,
  emptyTextStyle?: CSSProperties,
}

interface QuickTaroEmptyViewComponentState {
}

/**
 * 这是一个空数据占位视图
 */
class QuickTaroEmptyViewComponent extends BaseComponent<QuickTaroEmptyViewComponentProps, QuickTaroEmptyViewComponentState> {
  config: Config = {};

  static defaultProps = {
    emptyImage: '',
    emptyText: '什么也没有呀~',
    emptyImageSize: 300,
    emptyImageStyle: {},
    emptyTextStyle: {},
    customStyle: {}
  };

  constructor(props) {
    super(props);
  }

  render(): any {
    const {
      emptyText,
      emptyImage,
      emptyImageSize,
      emptyImageStyle,
      emptyTextStyle,
      customStyle
    } = this.props;
    return (
      <View
        className='quick-taro-empty-view'
        style={{
          ...customStyle
        }}
      >
        <Image
          className='quick-taro-empty-view-image'
          src={emptyImage ? emptyImage : ''}
          mode='widthFix'
          style={{
            width: Taro.pxTransform(emptyImageSize ? emptyImageSize : 300),
            ...emptyImageStyle,
          }}
        />
        <Text
          className='quick-taro-empty-view-text'
          style={{
            ...emptyTextStyle
          }}
        >
          {emptyText}
        </Text>
      </View>
    );
  }
}

export default QuickTaroEmptyViewComponent;
