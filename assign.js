/**
 * 实现思路
 * 1、判断object上是否有该函数， 如果没有就使用defineProperty添加
 * 2、判断目标参数是否正确
 * 3、使用object()将参数转化为对象to 最终返回
 * 4、使用for...in循环遍历出对象上的所有可枚举属性，复制到新的对象上
 */

(function () {
  //判断object上是否有该函数，如果没有就使用defineProperty添加
  if (typeof Object.assign2 != 'function') {
    Object.defineProperty(Object, 'assign2', {
      value: function (target) {
        'use strict';
        //判断目标参数是否正确
        if (target == null) {
          throw new TypeError('cannot convert undefined or null to object');
        }
        //使用object()将参数转化为对象to
        var to = Object(target);
        for (let i = 1; i < arguments.length; i++) {
          var nextSource = arguments[i];
          if (nextSource != null) {
            //使用for...in循环遍历出对象上的所有可枚举属性
            for (var key in nextSource) {
              if (Object.prototype.hasOwnProperty.call(nextSource, key)) {
                //复制到新的对象上
                to[key] = nextSource[key];
              }
            }
          }
        }
        return to;
      },
      writable: true,
      configurable: true
    })
  }
})()

//测试用例
var a = "abc";
var b = {
  v1: "def",
  v2: true,
  v3: 10,
  v4: Symbol("foo"),
  v5: null,
  v6: undefined
}

var obj = Object.assign(a, b);
console.log(obj);

var obj2 = Object.assign2(a, b);
console.log(obj2);