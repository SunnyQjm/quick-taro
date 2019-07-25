// eslint-disable-next-line no-unused-vars
import Taro, {clientRectElement, fieldElement, SelectorQuery} from '@tarojs/taro';

class QuickTaroBaseComponent<P, S> extends Taro.PureComponent<P, S> {

  isH5() {
    return process.env.TARO_ENV === 'h5'
  }

  isWeapp() {
    return process.env.TARO_ENV === 'weapp'
  }

  getRectInfo(selector: string): Promise<clientRectElement> {
    let query: SelectorQuery;
    if (process.env.TARO_ENV === 'h5') {
      query = Taro.createSelectorQuery().in(this)
    } else {
      query = Taro.createSelectorQuery().in(this.$scope)
    }
    return new Promise((resolve, reject) => {
      let tmp = query.select(selector)
        .fields({size: true, rect: true, scrollOffset: true, dataset: true}, (rect: fieldElement) => {
          !!rect ? resolve(rect) : reject(rect);
        });
      tmp && tmp.exec();
    });
  }
}

export default QuickTaroBaseComponent;
