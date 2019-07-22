// eslint-disable-next-line no-unused-vars
import Taro, {Config} from '@tarojs/taro';
import {View, Block} from '@tarojs/components';
// eslint-disable-next-line no-unused-vars
import {ITouchEvent} from '@tarojs/components/types/common';

import './index.scss';
import QuickTaroBarComponent from '../quick-taro-base-component';
import QuickTaroFloatBtn from '../quick-taro-float-btn';
import QuickTaroMask from '../quick-taro-mask';

interface QuickTaroFloatBtnMenuProps {
  btnSize: number,
  position: 'left-top' | 'left-bottom' | 'right-top' | 'right-bottom',
  verticalMargin: number,
  horizontalMargin: number,
  icon: string,
  changeIcon: string,
  iconSize: number,
  iconBg: string,
  iconShadowColor: string,
  duration: number,
  menuList: string[],
  menuRadius: number,
  menuItemFontSize: number,
  open: false,
  btnMenuMargin: number,
  declareMenuWidth: number,
  onMenuItemClick: (index: number, menuText: string) => void,
}

interface QuickTaroFloatBtnMenuState {
  maskOpacity: number,
  animationData: any,
  left?: number,
  right?: number,
  top?: number,
  bottom?: number,
  _open: boolean,
  menuBodyStyle: string,
  positionIndex: number,
  menuItemStyles: [],
  maskZIndex: number,
}

/**
 * 这是一个悬浮按钮展开菜单，点击悬浮按钮后展开菜单
 */
class QuickTaroFloatBtnMenu extends QuickTaroBarComponent<QuickTaroFloatBtnMenuProps, QuickTaroFloatBtnMenuState> {
  config: Config = {};

  static defaultProps = {
    btnSize: 80,
    position: 'right-bottom',
    verticalMargin: 40,
    horizontalMargin: 40,
    icon: '',
    changeIcon: '',
    iconSize: 40,
    iconBg: '#fff',
    iconShadowColor: 'ddd',
    duration: 500,
    menuList: ['更多', '转发', '设置'],
    menuRadius: 10,
    menuItemFontSize: 0.9,
    open: false,
    btnMenuMargin: 20,
    declareMenuWidth: 200
  };

  menuBtn: QuickTaroFloatBtn;
  animation: Taro.Animation;
  mask: QuickTaroMask;


  constructor(props) {
    super(props);
    this.state = {
      // left: 0,
      // right: 0,
      // bottom: 0,
      // top: 0,
      maskOpacity: 0,
      maskZIndex: 0,
      menuBodyStyle: '',
      positionIndex: 0,
      menuItemStyles: [],
      animationData: [],
      _open: false
    };

    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.toggle = this.toggle.bind(this);
    this.onItemClick = this.onItemClick.bind(this);
    this.xbFloatBtnCat = this.xbFloatBtnCat.bind(this);
    this.xbMaskCat = this.xbMaskCat.bind(this);
    this.xbMaskStateChange = this.xbMaskStateChange.bind(this);
  }

  componentWillMount(): void {
    let param = {};
    let menuItemStyles: string[] = [];
    const size = this.props.menuList.length;
    const radius = this.props.menuRadius;
    let baseStyle = '';
    if (size === 1) {
      //如果只有一项，则应该给该item的四个角都设置圆角
      menuItemStyles.push(
        `${baseStyle}border-radius: ${Taro.pxTransform(radius)}`
      );
    } else {
      this.props.menuList.forEach((_, index) => {
        if (index === 0) {
          //头
          menuItemStyles.push(
            baseStyle + `border-radius: ${Taro.pxTransform(radius)} ${Taro.pxTransform(radius)} 0 0;`
          );
        } else if (index === size - 1) {
          //尾
          menuItemStyles.push(
            baseStyle + `border-radius: 0 0 ${Taro.pxTransform(radius)} ${Taro.pxTransform(radius)};`
          );
        } else {
          menuItemStyles.push(baseStyle);
        }
      });
    }
    param['menuItemStyles'] = menuItemStyles;
    param['_open'] = this.props.open;
    let open = this.props.open;
    let declareMenuWidth = this.props.declareMenuWidth;
    let menuBodyStyle = '';
    switch (this.props.position) {
      case 'left-top':
        param['left'] = !open ? -declareMenuWidth : this.props.horizontalMargin;
        param['top'] = this.props.verticalMargin;
        param['positionIndex'] = -1;
        break;
      case 'left-bottom':
        param['left'] = !open ? -declareMenuWidth : this.props.horizontalMargin;
        param['bottom'] = this.props.verticalMargin;
        param['positionIndex'] = 1;
        break;
      case 'right-top':
        param['right'] = !open ? -declareMenuWidth : this.props.horizontalMargin;
        param['top'] = this.props.verticalMargin;
        param['positionIndex'] = -2;
        break;
      case 'right-bottom':
        param['right'] = !open ? -declareMenuWidth : this.props.horizontalMargin;
        param['bottom'] =
          this.props.verticalMargin + this.props.btnSize + this.props.btnMenuMargin;
        param['positionIndex'] = 2;
        break;
    }

    param['menuBodyStyle'] = menuBodyStyle;

    this.animation = Taro.createAnimation({
      duration: this.props.duration,
      timingFunction: 'ease'
    });
    this.setState(param);
  }


  /**
   * 切换菜单
   * @see open
   * @see close
   */
  toggle = () => {
    if (this.state._open) {
      this.close();
    } else {
      this.open();
    }
  };

  /**
   * 打开菜单
   */
  open = () => {
    this.menuBtn.change(true);
    this.mask.show();

    switch (this.props.position) {
      case 'left-bottom':
      case 'left-top':
        this.animation
          .opacity(1)
          .left(`${Taro.pxTransform(this.props.horizontalMargin + this.props.declareMenuWidth)}`)
          .step();
        break;
      case 'right-bottom':
      case 'right-top':
        this.animation
          .opacity(1)
          .right(`${Taro.pxTransform(this.props.horizontalMargin + this.props.declareMenuWidth)}`)
          .step();
        break;
    }
    const animationData = this.animation.export();
    this.setState({
      _open: true,
      maskOpacity: 0.2,
      animationData: animationData
    });
  };

  /**
   * 关闭菜单
   */
  close = () => {
    this.menuBtn.change(false);
    this.mask.hide();

    switch (this.props.position) {
      case 'left-bottom':
      case 'left-top':
        this.animation
          .opacity(0.2)
          .left(`-${Taro.pxTransform(this.props.horizontalMargin + this.props.declareMenuWidth)}`)
          .step();
        break;
      case 'right-bottom':
      case 'right-top':
        this.animation
          .opacity(0.2)
          .right(`-${Taro.pxTransform(this.props.horizontalMargin + this.props.declareMenuWidth)}`)
          .step();
        break;
    }

    this.setState({
      _open: false,
      maskOpacity: 0,
      animationData: this.animation.export()
    });
  };

  /**
   * 菜单项被点击
   */
  onItemClick(e: ITouchEvent) {
    const index = Number(e.currentTarget.id);
    this.props.onMenuItemClick(index, this.props.menuList[index]);

    // 菜单项被点击后，菜单自动关闭
    this.close();
  }

  /**
   * 得到XbMask组件的引用，方便调用其 show 和 _hide 函数
   * @see mask
   * @see XbMask.show()
   * @see XbMask.hide()
   * @param node
   */
  xbMaskCat(node) {
    this.mask = node;
  }

  /**
   * XbMask在点击之后会hide，这个回调中可以执行对菜单栏的关闭操作
   * @see XbMask.handleOnMaskClick()
   * @param show
   */
  xbMaskStateChange(show: boolean) {
    if (!show) {
      this.close();
    }
  }

  /**
   * 得到原型菜单按钮的引用，方便调用其改变状态的函数
   * @param node
   */
  xbFloatBtnCat(node) {
    this.menuBtn = node;
  }

  render(): any {
    const {
      iconBg: iconBg,
      iconShadowColor: iconShadowColor,
      menuList: menuList
    } = this.props;

    const {
      animationData,
      left,
      right,
      top,
      bottom,
      menuBodyStyle,
      positionIndex,
      menuItemStyles,
      _open
    } = this.state;

    const menuItemList = menuList.map((item, index) => {
      return (
        <View
          id={String(index)}
          key={index}
          className='quick-taro-menu-item'
          hoverClass='quick-taro-menu-item-hover'
          onClick={this.onItemClick}
          style={`${menuItemStyles[index]}; padding: ${Taro.pxTransform(20)} 0;`}
        >
          {item}
        </View>
      );
    });

    let menuStyle =
      (!!left ? `left: ${Taro.pxTransform(left)};` : '') +
      (!!right ? `margin-right: ${Taro.pxTransform(right)};` : '') +
      (!!top ? `top: ${Taro.pxTransform(top)};` : '') +
      (!!bottom ? `margin-bottom: ${Taro.pxTransform(bottom)};` : '');

    return (
      <Block>
        <QuickTaroMask initShow={_open} zIndex={11} ref={this.xbMaskCat} onHide={this.xbMaskStateChange}
                       duration={500}/>
        {
          positionIndex > 0 ?
            <View
              className={`quick-taro-float-menu-body quick-taro-float-menu-body-${this.props.position}`}
              style={
                menuStyle +
                menuBodyStyle
              }
              animation={animationData}
            >
              {menuItemList}
            </View>
            :
            ''
        }

        <QuickTaroFloatBtn
          ref={this.xbFloatBtnCat}
          {
            ...this.props
          }
          backgroundColor={iconBg}
          shadowColor={iconShadowColor}
          hide={false}
          onClick={this.toggle}
        />
      </Block>
    );
  }
}

export default QuickTaroFloatBtnMenu;
