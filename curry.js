/**
 * 函数柯里化
 * 将接受多个参数的方法简化为接受单个参数的方法
 * 并返回一个可以处理剩余参数的函数
 * 作用：参数复用、提前返回、延迟执行
 */

function curry(fn, args) {
  args = args || [];
  return function () {
    //拼接参数
    let newArgs = args.concat(Array.prototype.slice.call(arguments));
    if (newArgs.length < fn.length) {
      //参数不足时，返回函数等待其他参数
      return curry.call(this, fn, newArgs);
    } else {
      //参数长度足够时执行函数
      return fn.apply(this, newArgs);
    }
  }
}


function sumFunc(a, b, c) {
  return a + b + c;
}

let sum = curry(sumFunc);
console.log(sum(1, 2, 3));
console.log(sum(1, 2)(3));
console.log(sum(1)(2)(3));
console.log(sum(1)(2, 3));