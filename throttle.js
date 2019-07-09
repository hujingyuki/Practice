function throttle(fn) {
  //通过闭包保存标志
  var isCanDo = true;
  return function () {
    //如果标志为false则返回不执行
    if (!isCanDo) return;
    //立即将标志位设为false
    isCanDo = false;
    setTimeout(() => {
      //执行函数并将标志位复位
      fn.apply(this, arguments);
      isCanDo = true;
    }, 1000);
  }
}