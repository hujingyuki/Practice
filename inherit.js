/**
 * 1、原型继承
 * 思路：将子函数的原型设为超类函数的实例
 * 缺点：所有子函数会共享超类函数实例中的引用属性;
 *      无法向超类函数传参
 */
function superF(name) {
  this.name = name;
  this.color = ['red', 'black', 'blue'];
}
superF.prototype.sayName = function () {
  console.log(this.name);
}

function subF1() {}
subF1.prototype = new superF();
var instance1 = new subF1();
instance1.color.push('yellow');
var instance2 = new subF1();
console.log('inherit1', instance1.color, instance2.color);
//inherit1 [ 'red', 'black', 'blue', 'yellow' ] [ 'red', 'black', 'blue', 'yellow' ]
instance1.sayName(); //undefined

/**
 * 2、借用构造函数继承
 * 思路：使用call，apply绑定构造函数
 * 缺点：无法复用;无法继承原型上的方法
 */

function subF2(name, age) {
  superF.call(this, name); //第二次
  this.age = age;
}
instance1 = new subF2('joy', 21);
instance1.color.push('orange');
instance2 = new subF2('mike', 19);
console.log('inherit2-instance1', instance1.name, instance1.age, instance1.color);
//inherit2-instance1 joy 21 [ 'red', 'black', 'blue', 'orange' ]
console.log('inherit2-instance2', instance2.name, instance2.age, instance2.color);
//inherit2-instance2 mike 19 [ 'red', 'black', 'blue' ]
//instance1.sayName(); //报错

/**
 * 3、组合继承
 * 思路：利用构造函数继承属性，利用原型继承方法
 * 缺点：会调用两次超类函数
 */
subF2.prototype = new superF(); //第一次
subF2.prototype.constructor = subF2;

instance1 = new subF2('tom', 18);
instance1.color.push('white');
instance2 = new subF2('jerry', 16);
console.log('inherit3-instance1', instance1.name, instance1.age, instance1.color);
//inherit3-instance1 tom 18 [ 'red', 'black', 'blue', 'white' ]
console.log('inherit3-instance2', instance2.name, instance2.age, instance2.color);
//inherit3-instance2 jerry 16 [ 'red', 'black', 'blue' ]
instance1.sayName(); //tom

/**
 * 4、原型式继承
 * 思路：借助原型可以通过已有对象创建对象
 * 缺点：必须有一个对象作为另外对象的基础；引用属性会共享值
 */

function createObject(obj) {
  function f() {};
  f.prototype = obj;
  return new f;
}

var person = {
  name: 'anna',
  friends: ['joy', 'tom', 'sufe']
}
instance1 = createObject(person);
instance2 = Object.create(person); //规范了原型式继承
instance1.friends.push('india');
instance2.friends.push('kelly');
console.log('inherit4', person.friends);
//inherit4 [ 'joy', 'tom', 'sufe', 'india', 'kelly' ]

/**
 * 5、寄生式继承
 * 思路：创建一个仅用于封装继承过程的函数(先创建对象，然后增强对象，最后返回对象)
 * 缺点：无法复用
 */

function createAnother(obj) {
  var clone = createObject(obj); //创建对象（任意返回新对象的函数都可以）
  clone.sayHi = function () { //增强对象
    console.log('hello');
  };
  return clone; //返回对象
}

instance1 = createAnother(person);
instance1.sayHi(); //hello

/**
 * 6、寄生组合式继承（最佳方案）
 * 思路：借用构造函数继承属性，借用原型混入形式继承方法
 */

function inheritPrototype(subF, superF) {
  var proto = Object.create(superF.prototype); //创建对象：创建超类原型的副本
  proto.constructor = subF; //增强对象
  subF.prototype = proto; //指定对象：将副本赋值给子类的原型
}

function subF3(name, grade) {
  superF.call(this, name);
  this.grade = grade;
}
inheritPrototype(subF3, superF);
instance1 = new subF3('yuki', 750);
instance1.sayName(); //yuki
console.log(instance1 instanceof superF); //true