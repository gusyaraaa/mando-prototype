import { mapValues } from 'shared/utils/mapValues'
import { ThemesEnum } from './constants'

const themedIndexes = [ThemesEnum.DARK, ThemesEnum.LIGHT]

const themedSets = {
  colorBranded: ['#3DA2FF', ''],
  colorBranded08: ['rgba(61, 162, 255, 0.08)', ''],
  colorBranded10: ['rgba(61, 162, 255, 0.1)', ''],
  colorBranded16: ['rgba(61, 162, 255, 0.16)', ''],
  colorBranded12: ['rgba(61, 162, 255, 0.12)', ''],
  colorBranded20: ['rgba(61, 162, 255, 0.2)', ''],
  colorBranded24: ['rgba(61, 162, 255, 0.24)', ''],
  colorBranded30: ['rgba(61, 162, 255, 0.3)', ''],
  colorBranded60: ['rgba(61, 162, 255, 0.6)', ''],

  colorGreenApple: ['rgb(51, 255, 157)', '#ffffff'],
  colorGreenApple08: ['rgba(51, 255, 157, 0.08)', '#ffffff'],
  colorGreenApple10: ['rgba(51, 255, 157, 0.1)', '#ffffff'],
  colorGreenApple16: ['rgba(51, 255, 157, 0.16)', '#ffffff'],
  colorGreenApple20: ['rgba(51, 255, 157, 0.2)', '#ffffff'],
  colorGreenApple30: ['rgba(51, 255, 157, 0.3)', '#ffffff'],
  colorGreenApple40: ['rgba(51, 255, 157, 0.4)', '#ffffff'],
  colorGreenApple50: ['rgba(51, 255, 157, 0.5)', '#ffffff'],
  colorGreenApple80: ['rgba(51, 255, 157, 0.8)', '#ffffff'],

  colorBlue: ['rgba(0, 133, 255)', '#ffffff'],
  colorBlue10: ['rgba(0, 133, 255, 0.1)', '#ffffff'],
  colorBlue30: ['rgba(0, 133, 255, 0.3)', '#ffffff'],

  colorGreenAppleSoft: ['#40FCAD', '#ffffff'],

  colorError10: ['rgba(255, 61, 107, 0.1)', '#ffffff'],
  colorError15: ['rgba(255, 61, 107, 0.15)', '#ffffff'],
  colorError20: ['rgba(255, 61, 107, 0.2)', '#ffffff'],
  colorError24: ['rgba(255, 61, 107, 0.24)', '#ffffff'],
  colorError40: ['rgba(255, 61, 107, 0.4)', '#ffffff'],
  colorError: ['rgba(255, 61, 107, 1)', '#ffffff'],
  colorErrorMessage: ['rgba(237, 181, 218, 0.8)', '#ffffff'],

  colorDanger10: ['rgba(255, 201, 61, 0.1)', '#ffffff'],
  colorDanger20: ['rgba(255, 201, 61, 0.2)', '#ffffff'],
  colorDanger: ['rgba(255, 201, 61, 1)', '#ffffff'],

  colorWarning0: ['rgba(255, 201, 61, 0)', '#ffffff'],
  colorWarning08: ['rgba(255, 201, 61, 0.08)', '#ffffff'],
  colorWarning10: ['rgba(255, 201, 61, 0.1)', '#ffffff'],
  colorWarning16: ['rgba(255, 201, 61, 0.16)', '#ffffff'],
  colorWarning32: ['rgba(255, 201, 61, 0.32)', '#ffffff'],
  colorWarning20: ['rgba(255, 201, 61, 0.2)', '#ffffff'],
  colorWarning24: ['rgba(255, 201, 61, 0.24)', '#ffffff'],
  colorWarning50: ['rgba(255, 201, 61, 0.5)', '#ffffff'],
  colorWarning: ['rgba(255, 201, 61, 1)', '#ffffff'],

  // Text
  colorText: ['#ffffff', '#000626'],
  colorTextContrast: ['#000626', '#ffffff'],
  colorTextSecondary13: ['rgba(181, 190, 237, 0.13)', '#ffffff'],
  colorTextSecondary16: ['rgba(181, 190, 237, 0.16)', '#ffffff'],
  colorTextSecondary50: ['rgba(181, 190, 237, 0.5)', '#ffffff'],
  colorTextSecondary80: ['rgba(181, 190, 237, 0.8)', '#ffffff'],
  colorFf36: ['rgba(193, 217, 254, 0.36)', ''],
  colorFf72: ['rgba(193, 217, 254, 0.72)', ''],

  // Background
  colorBgDeep: ['#070315', '#F9FAFE'],
  colorBgError: ['#9e0035', '#FFFFFF'],

  // Borders
  colorBorder: ['#424166', '#B4B5D8'],

  // Controls
  colorControlBg: ['rgba(193, 217, 254, 0.04)', ''],
  colorControlBgHover: ['rgba(193, 217, 254, 0.12)', ''],
  colorControlBgHoverStrong: ['rgba(193, 217, 254, 0.24)', ''],
  colorControlBorder06: ['rgba(217, 218, 255, 0.06)', ''],
  colorControlBorder08: ['rgba(217, 218, 255, 0.08)', ''],
  colorControlBorder10: ['rgba(217, 218, 255, 0.1)', ''],
  colorControlBlurFallback: ['#090715f6', ''],

  // Input
  colorInputBorder08: ['rgba(222, 215, 229, 0.08)', ''],
  colorInputBorder16: ['rgba(222, 215, 229, 0.16)', ''],
  colorInputBg: ['rgba(222, 215, 229, 0.03)', ''],
  colorInputPlaceholder: ['rgba(181, 190, 237, 0.5)', ''],
  colorInputBorderHover: ['rgba(181, 190, 237, 0.5)', ''],
  colorInputBorderFocus: ['rgba(183, 232, 47, 0.4)', ''],
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

  colorTabPurple: ['rgba(158, 0, 255 , 1)', ''],
  colorTabPurpleSecondary: ['rgba(158, 0, 255, 0.6)', ''],

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

  const themed = mapValues(themedSets, t => t[themeIndex]) as {
    [key in keyof typeof themedSets]: string
  }

  return {
    ...shared,
    ...themed,
  }
}
