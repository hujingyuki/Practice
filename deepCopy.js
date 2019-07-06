//1. JSON
//缺点：不能处理null，undefined，function，Date
function deepCopy1(obj) {
  return JSON.parse(JSON.stringify(obj));
}

//2. 递归
function deepCopy2(obj) {
  //如果是正则或者时间类型就返回该对象
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }
  if (obj instanceof Date) {
    return new Date(obj);
  }
  //如果是数组或对象就递归
  if (obj && typeof obj === 'object') {
    let result = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
      //如果是自有属性就复制
      if (obj.hasOwnProperty(key)) {
        result[key] = deepCopy2(obj[key]);
      }
    }
    return result;
  } else {
    //如果是普通类型就返回
    return obj;
  }
}

//测试
let a = [1, 2, 3];
let a1 = deepCopy1(a);
let a2 = deepCopy2(a);
a[0] = 0;
console.log(a, a1, a2);

let b = {
  name: 'a',
  class: {
    code: 'en',
      grade: {
        one: 120,
        two: 150
      }
  }
}
let b1 = deepCopy1(b);
let b2 = deepCopy2(b);
b.name = 'b';
b.class.code = 'cn';
b.class.grade.one = 140;
console.log(b, b1, b2);

//3、lodash.cloneDeep
//4、jquery $.extends(isDeep,target,source)