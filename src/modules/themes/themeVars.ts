import { mapValues } from 'shared/utils/mapValues'
import { ThemesEnum } from './constants'

const themedIndexes = [ThemesEnum.DARK, ThemesEnum.LIGHT]

const themedSets = {
  colorWrapperBg: [
    'radial-gradient(64.89% 64.89% at 76.7% -2.39%, rgba(128, 0, 255, 0.36) 0%, rgba(36, 0, 255, 0.14) 44.71%, rgba(24, 3, 255, 0) 100%), radial-gradient(60.01% 60.01% at 39.17% -1.17%, rgba(145, 58, 239, 0.3) 0%, rgba(132, 17, 255, 0.06) 60.68%, rgba(146, 44, 255, 0) 100%), radial-gradient(41.99% 41.99% at 56.08% 46.87%, #1a0f33 0%, #090012 100%)',
    'radial-gradient(41.99% 41.99% at 56.08% 46.87%, #FFFFFF 0%, #FAF8FF 100%), radial-gradient(60.01% 60.01% at 39.17% -1.17%, rgba(123, 0, 255, 0.175) 0%, rgba(132, 17, 255, 0.035) 60.68%, rgba(146, 44, 255, 0) 100%), radial-gradient(151.04% 21.37% at 76.7% -2.39%, rgba(0, 26, 255, 0.1512) 0%, rgba(5, 0, 255, 0.0392) 44.71%, rgba(24, 3, 255, 0) 100%), linear-gradient(360deg, rgba(90, 64, 255, 0.006) 64.86%, rgba(145, 135, 255, 0.234018) 101.61%)',
  ],
  colorHeaderHover: ['rgba(51, 255, 157, 0.5)', 'rgba(66, 0, 255, 0.5)'],
  colorHeaderActive: ['rgb(51, 255, 157)', 'rgba(66, 0, 255)'],
  colorHeaderThemeSvg: ['#ffffff', '#000626'],
  colorBlurBg: ['rgba(8, 5, 11, 0.3)', 'rgba(255, 255, 255, 0.3)'],

  colorCardGradientBg: [
    'radial-gradient(89.51% 85.18% at 19.14% 9.79%, rgba(255, 138, 0, 0.182) 0%, rgba(255, 0, 229, 0.0104) 100%)',
    'radial-gradient(89.51% 85.18% at 19.14% 9.79%, rgba(123, 0, 255, 0.175) 0%, rgba(146, 44, 255, 0) 100%)',
  ],
  colorCardSvg: ['#e7891b', '#7b00ff'],

  colorChatDateBg: ['rgba(70, 21, 79, 0.845)', 'rgba(244, 180, 255, 0.845)'],
  colorChatSendSvg: ['#FFFFFF', '#000626'],
  colorChatLockSvg: ['rgba(181, 190, 237, 0.8)', '#000626'],

  colorBranded: ['#3DA2FF', '#3DA2FF'],
  colorBranded08: ['rgba(61, 162, 255, 0.08)', 'rgba(61, 162, 255, 0.08)'],
  colorBranded10: ['rgba(61, 162, 255, 0.1)', 'rgba(61, 162, 255, 0.1)'],
  colorBranded16: ['rgba(61, 162, 255, 0.16)', 'rgba(61, 162, 255, 0.16)'],
  colorBranded12: ['rgba(61, 162, 255, 0.12)', 'rgba(61, 162, 255, 0.12)'],
  colorBranded20: ['rgba(61, 162, 255, 0.2)', 'rgba(61, 162, 255, 0.2)'],
  colorBranded24: ['rgba(61, 162, 255, 0.24)', 'rgba(61, 162, 255, 0.24)'],
  colorBranded30: ['rgba(61, 162, 255, 0.3)', 'rgba(61, 162, 255, 0.3)'],
  colorBranded60: ['rgba(61, 162, 255, 0.6)', 'rgba(61, 162, 255, 0.6)'],

  colorGreenApple: ['rgb(51, 255, 157)', 'rgb(0, 128, 0)'],
  colorGreenApple08: ['rgba(51, 255, 157, 0.08)', 'rgb(0, 128, 0, 0.08)'],
  colorGreenApple10: ['rgba(51, 255, 157, 0.1)', 'rgb(0, 128, 0, 0.1)'],
  colorGreenApple16: ['rgba(51, 255, 157, 0.16)', 'rgb(0, 128, 0, 0.16)'],
  colorGreenApple20: ['rgba(51, 255, 157, 0.2)', 'rgb(0, 128, 0, 0.2)'],
  colorGreenApple30: ['rgba(51, 255, 157, 0.3)', 'rgb(0, 128, 0, 0.3)'],
  colorGreenApple40: ['rgba(51, 255, 157, 0.4)', 'rgb(0, 128, 0, 0.4)'],
  colorGreenApple50: ['rgba(51, 255, 157, 0.5)', 'rgb(0, 128, 0, 0.5)'],
  colorGreenApple80: ['rgba(51, 255, 157, 0.8)', 'rgb(0, 128, 0, 0.6)'],

  colorBlue: ['rgba(0, 133, 255)', 'rgba(66, 0, 255)'],
  colorBlue10: ['rgba(0, 133, 255, 0.1)', 'rgba(66, 0, 255, 0.1)'],
  colorBlue30: ['rgba(0, 133, 255, 0.3)', 'rgba(66, 0, 255, 0.3)'],
  colorBlue50: ['rgba(0, 133, 255, 0.5)', 'rgba(66, 0, 255, 0.5)'],

  colorGreenAppleSoft: ['#40FCAD', '#40FCAD'],

  colorError10: ['rgba(255, 61, 107, 0.1)', 'rgba(255, 61, 107, 0.1)'],
  colorError15: ['rgba(255, 61, 107, 0.15)', 'rgba(255, 61, 107, 0.15)'],
  colorError20: ['rgba(255, 61, 107, 0.2)', 'rgba(255, 61, 107, 0.2)'],
  colorError24: ['rgba(255, 61, 107, 0.24)', 'rgba(255, 61, 107, 0.24)'],
  colorError40: ['rgba(255, 61, 107, 0.4)', 'rgba(255, 61, 107, 0.4)'],
  colorError: ['rgba(255, 61, 107)', 'rgba(255, 61, 107)'],
  colorErrorMessage: ['rgba(237, 181, 218, 0.8)', 'rgba(237, 181, 218, 0.8)'],

  colorWarning08: ['rgba(255, 201, 61, 0.08)', 'rgba(255, 201, 61, 0.08)'],
  colorWarning10: ['rgba(255, 201, 61, 0.1)', 'rgba(255, 201, 61, 0.1)'],
  colorWarning16: ['rgba(255, 201, 61, 0.16)', 'rgba(255, 201, 61, 0.16)'],
  colorWarning20: ['rgba(255, 201, 61, 0.2)', 'rgba(255, 201, 61, 0.2)'],
  colorWarning24: ['rgba(255, 201, 61, 0.24)', 'rgba(255, 201, 61, 0.24)'],
  colorWarning32: ['rgba(255, 201, 61, 0.32)', 'rgba(255, 201, 61, 0.32)'],
  colorWarning50: ['rgba(255, 201, 61, 0.5)', 'rgba(255, 201, 61, 0.5)'],
  colorWarning: ['rgba(255, 201, 61, 1)', 'rgba(255, 201, 61, 1)'],
  // Text
  colorText: ['#ffffff', '#000626'],
  colorTextContrast: ['#000626', '#ffffff'],
  colorTextSecondary13: ['rgba(181, 190, 237, 0.13)', 'rgba(30, 39, 73, 0.13)'],
  colorTextSecondary16: ['rgba(181, 190, 237, 0.16)', 'rgba(30, 39, 73, 0.16)'],
  colorTextSecondary50: ['rgba(181, 190, 237, 0.5)', 'rgba(30, 39, 73, 0.5)'],
  colorTextSecondary80: ['rgba(181, 190, 237, 0.8)', 'rgba(30, 39, 73, 0.8)'],
  colorFf36: ['rgba(193, 217, 254, 0.36)', 'rgba(193, 217, 254, 0.36)'],
  colorFf72: ['rgba(193, 217, 254, 0.72)', 'rgba(193, 217, 254, 0.72)'],

  // Background
  colorBgDeep: ['#070315', '#F9FAFE'],
  colorBgError: ['#9e0035', '#FFFFFF'],

  // Borders
  colorBorder: ['#424166', 'rgba(140, 125, 181, 0.24)'],

  // Controls
  colorControlBg: ['rgba(193, 217, 254, 0.04)', 'rgba(9, 2, 96, 0.06)'],
  colorControlBgHover: ['rgba(193, 217, 254, 0.12)', 'rgba(9, 2, 96, 0.14)'],
  colorControlBgHoverStrong: [
    'rgba(193, 217, 254, 0.24)',
    'rgba(9, 2, 96, 0.26)',
  ],
  colorControlBorder06: ['rgba(217, 218, 255, 0.06)', 'rgba(9, 2, 96, 0.06)'],
  colorControlBorder08: ['rgba(217, 218, 255, 0.08)', 'rgba(9, 2, 96, 0.08)'],
  colorControlBorder10: ['rgba(217, 218, 255, 0.1)', 'rgba(9, 2, 96, 0.1)'],
  colorControlBlurFallback: ['#090715f6', ''],

  // Input
  colorInputBorder08: [
    'rgba(222, 215, 229, 0.08)',
    'rgba(140, 125, 181, 0.08)',
  ],
  colorInputBorder16: [
    'rgba(222, 215, 229, 0.16)',
    'rgba(140, 125, 181, 0.16)',
  ],
  colorInputBg: ['rgba(222, 215, 229, 0.03)', 'rgba(9, 2, 96, 0.06)'],
  colorInputPlaceholder: ['rgba(181, 190, 237, 0.5)', 'rgba(16, 8, 39, 0.66)'],
  colorInputBorderHover: ['rgba(181, 190, 237, 0.5)', 'rgba(16, 8, 39, 0.66)'],
  colorInputBorderFocus: ['rgba(183, 232, 47, 0.4)', 'rgba(183, 232, 47, 0.4)'],
  colorInputTextDisabled: ['', ''],
  colorInputBorderDisabled: ['', ''],
  colorInputPlaceholderDisabled: ['', ''],

  // Cards
  colorCardBackgroundRed12: ['rgba(255, 6, 66, 0.12)', ''],
  colorCardBackgroundRed32: ['rgba(255, 6, 66, 0.32)', ''],
  colorCardBackgroundYellow0: ['rgba(255, 141, 6, 0)', ''],
  colorCardBackgroundViolet0: ['rgba(255, 6, 200, 0)', ''],
  colorCardBackgroundGreen0: ['rgba(64, 252, 173, 0)', ''],
  colorCardBackgroundGreen12: ['rgba(64, 252, 173, 0.12)', ''],
  colorCardBackgroundGreen32: ['rgba(64, 252, 173, 0.32)', ''],
  colorCardBackgroundLightBlue09: ['rgba(130, 110, 253, 0.9)', ''],
  colorCardBackgroundBlue36: ['rgba(59, 76, 225, 0.36)', ''],
  colorCardBackgroundDarkBlue61: ['rgba(76, 72, 251, 0.61)', ''],

  // Tabs
  colorTabGold: ['rgba(255, 192, 0, 1)', ''],
  colorTabGoldSecondary: ['rgb(255, 192, 0, 0.6)', ''],

  colorTabPurple: ['rgba(158, 0, 255 , 1)', 'rgba(66, 0, 255, 1)'],
  colorTabPurpleSecondary: ['rgba(158, 0, 255, 0.6)', 'rgba(66, 0, 255, 0.6)'],

  colorTabBlue: ['rgba(59, 90, 255, 1)', ''],
  colorTabBlueSecondary: ['rgba(59, 90, 255, 0.6)', ''],

  colorTabGreen: ['rgba(0, 242, 24, 1)', ''],
  colorTabGreenSecondary: ['rgba(0, 242, 24, 0.6)', ''],

  colorTabRed: ['rgba(210, 9, 82, 1)', ''],
  colorTabRedSecondary: ['rgba(210, 9, 82, 0.6)', ''],
}

const shared = {
  contentWidthNarrow: '400px',

  fieldMargin: '54px',
  fieldHeight: '60px',
  fieldMarginConcatted: '8px',
  marginHeader: '160px',

  colorWhite: '#ffffff',

  durFast: '100ms',
  durMed: '200ms',
  durNorm: '300ms',

  // Easings
  linear: 'cubic-bezier(0.25, 0.25, 0.75, 0.75)',
  ease: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)',

  easeIn: 'cubic-bezier(0.42, 0.0, 1.0, 1.0)',
  easeOut: 'cubic-bezier(0.0, 0.0, 0.58, 1.0)',
  easeInOut: 'cubic-bezier(0.42, 0.0, 0.58, 1.0)',

  easeInQuad: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
  easeInCubic: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
  easeInQuart: 'cubic-bezier(0.895, 0.03, 0.685, 0.22)',
  easeInQuint: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
  easeInSine: 'cubic-bezier(0.47, 0.0, 0.745, 0.715)',
  easeInExpo: 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
  easeInCirc: 'cubic-bezier(0.6, 0.04, 0.98, 0.335)',
  easeInBack: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',

  easeOutQuad: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  easeOutCubic: 'cubic-bezier(0.215, 0.61, 0.355, 1.0)',
  easeOutQuart: 'cubic-bezier(0.165, 0.84, 0.44, 1.0)',
  easeOutQuint: 'cubic-bezier(0.23, 1.0, 0.32, 1.0)',
  easeOutSine: 'cubic-bezier(0.39, 0.575, 0.565, 1.0)',
  easeOutExpo: 'cubic-bezier(0.19, 1.0, 0.22, 1.0)',
  easeOutCirc: 'cubic-bezier(0.075, 0.82, 0.165, 1.0)',
  easeOutBack: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',

  easeInOutQuad: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
  easeInOutCubic: 'cubic-bezier(0.645, 0.045, 0.355, 1.0)',
  easeInOutQuart: 'cubic-bezier(0.77, 0.0, 0.175, 1.0)',
  easeInOutQuint: 'cubic-bezier(0.86, 0.0, 0.07, 1.0)',
  easeInOutSine: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
  easeInOutExpo: 'cubic-bezier(1.0, 0.0, 0.0, 1.0)',
  easeInOutCirc: 'cubic-bezier(0.785, 0.135, 0.15, 0.86)',
  easeInOutBack: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
}

export function getThemeColors(theme: ThemesEnum) {
  const themeIndex = themedIndexes.findIndex(t => t === theme)

  const themed = mapValues(themedSets, t => t[themeIndex] ? t[themeIndex] : t[0]) as {
    [key in keyof typeof themedSets]: string
  }

  return {
    ...shared,
    ...themed,
  }
}
