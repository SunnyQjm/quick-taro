// eslint-disable-next-line no-unused-vars
import Taro, { SelectorQuery } from '@tarojs/taro';

class QuickTaroBaseComponent<P, S> extends Taro.PureComponent<P, S>{

  isH5() {
    return process.env.TARO_ENV === 'h5'
  }

  isWeapp() {
    return process.env.TARO_ENV === 'weapp'
  }

  getRectInfo(selector: string) {
    let query: SelectorQuery;
    if (process.env.TARO_ENV === 'h5') {
      query = Taro.createSelectorQuery().in(this)
    } else {
      query = Taro.createSelectorQuery().in(this.$scope)
    }
    return new Promise((resolve, reject) => {
      query.select(selector)
        .boundingClientRect(rect => {
          if(!!rect)
            resolve(rect);
          else
            reject(rect);
        })
        .exec();
    })
  }
}

export default QuickTaroBaseComponent;