function newFunc() {
  //1、创建一个新对象
  let obj = new Object();
  //获取构造函数
  let constructor = [].shift.call(arguments);
  //2、链接到原型
  obj.__proto__ = constructor.prototype;
  //3、绑定this值
  let result = constructor.apply(obj, arguments);
  //4、返回这个对象
  return typeof result === 'object' ? result : obj;
}

//测试用例
function person(name, age) {
  this.name = name;
  this.age = age;
}
let a = new person('joy', 19);
console.log(a);

let b = newFunc(person, 'john', 18);
console.log(b);