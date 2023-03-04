const DEFAULT_TOAST_OPTIONS = {
  message: '',
  icon: 'none',
  duration: 2000,
  position: 'bottom',
};

/**
 * 显示toast消息
 * @param options toast消息配置项
 */
export default function showToast(options) {
  const finalOptions = Object.assign({}, DEFAULT_TOAST_OPTIONS, options);

  if (uni.getSystemInfoSync().platform === 'devtools') {
    // 在开发者工具中展示toast消息
    uni.showToast(finalOptions);
  } else if (uni.getSystemInfoSync().platform === 'wechat') {
    // 在微信小程序中展示toast消息
    uni.showModal({
      content: finalOptions.message,
      showCancel: false,
      confirmText: '知道了',
      success: () => { },
    });
  } else {
    // 在其他平台中展示toast消息
    alert(finalOptions.message);
  }
}
