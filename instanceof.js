function instance(l, r) {
  //判断R的原型对象在不在l的原型链上
  while (true) {
    if (l.__proto__ == null) {
      return false;
    } else {
      if (l.__proto__ == r.prototype) {
        return true;
      }
      l = l.__proto__;
    }
  }
}

//测试用例 
console.log([] instanceof Array);
console.log(instance([], Array));
console.log([] instanceof Object);
console.log(instance([], Object));

function p() {};
let a = new p();
console.log(instance(a, p));
console.log(instance(p, Function));