export const isMobileDevice = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
    navigator.userAgent,
  )
    ? true
    : false

export const isIOS = () =>
  /iPhone|iPad|iPod/i.test(navigator.userAgent) ? true : false
