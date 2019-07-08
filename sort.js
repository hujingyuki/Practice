var bubbleSort = arr => {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = i; j < len; j++) {
      if (arr[i] > arr[j]) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
  }
  return arr;
}

var selectionSort = arr => {
  var min;
  for (let i = 0; i < arr.length; i++) {
    min = i;
    for (let j = i; j < arr.length; j++) {
      if (arr[j] < arr[min]) {
        min = j;
      }
    }
    [arr[i], arr[min]] = [arr[min], arr[i]];
  }
  return arr;
}

var insertionSort = arr => {
  let j, temp;
  for (let i = 0; i < arr.length; i++) {
    j = i; //缓存目标元素的下标
    temp = arr[i]; //缓存目标元素的值
    while (j > 0 && arr[j - 1] > temp) { //直到只找到比当前元素小的，或者查询到头
      arr[j] = arr[j - 1];
      j--;
    }
    //将目标元素插入已排序数组的正确位置
    arr[j] = temp;
  }
  return arr;
}

let a = [10, 3, 8, 2, 9, 1, 10, 7, 4, 1];

var shellSort = arr => {
  //定义步长
  let gaps = [5, 3, 1];
  let temp;
  for (let n = 0; n < gaps.length; n++) {
    //从步长个长度开始比较
    for (let i = gaps[n]; i < arr.length; i++) {
      temp = arr[i];
      for (j = i; j >= gaps[n] && arr[j - gaps[n]] > temp; j -= gaps[n]) {
        arr[j] = arr[j - gaps[n]];
      }
      arr[j] = temp;
    }
  }
  return arr;
}


var quickSort = arr => {
  if (arr.length < 2) {
    return arr;
  }
  let qvoit = arr[0],
    left = [],
    right = [];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < qvoit) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return [...quickSort(left), qvoit, ...quickSort(right)];
}

var quickSort2 = arr => {
  if (arr.length < 2) {
    return arr;
  }
  let qvoit = arr[0],
    left = [],
    middle = [],
    right = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < qvoit) {
      left.push(arr[i]);
    } else if (arr[i] == qvoit) {
      middle.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return [...quickSort(left), ...middle, ...quickSort(right)];
}

var mergeSort = arr => {
  if (arr.length < 2) {
    return arr;
  }
  let middle = Math.floor(arr.length / 2),
    left = arr.slice(0, middle),
    right = arr.slice(middle);
  return merge(mergeSort(left), mergeSort(right));
}

var merge = (left, right) => {
  let resArr = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      resArr.push(left.shift());
    } else {
      resArr.push(right.shift());
    }
  }
  return resArr.concat(left, right);
}


var mergeSort = arr => {
  if (arr.length < 2) {
    return arr;
  }
  let step = 1,
    left, right;
  while (step < arr.length) {
    left = 0;
    right = step;
    while (right + step < arr.length) {
      merge(arr, left, left + step, right, right + step);
      left = right + step;
      right = left + step;
    }
    if (right < arr.length) {
      merge(arr, left, left + step, right, arr.length);
    }
    step *= 2;
  }
  return arr;
}

var merge = (arr, startLeft, stopLeft, startRight, stopRight) => {
  //初始化两个归并序列的大小
  let left = new Array(stopLeft - startLeft + 1),
    right = new Array(stopRight - startRight + 1);
  //向序列中填充值
  for (let i = startLeft; i <= stopLeft; i++) {
    left[i - startLeft] = arr[i];
  }
  for (let i = startRight; i <= stopRight; i++) {
    right[i - startRight] = arr[i];
  }
  //非常重要！！！当一个序列读到最后一位的时候可以让另外一个序列的值直接插入数组中
  right[right.length - 1] = Infinity;
  left[left.length - 1] = Infinity;
  let m = 0,
    n = 0;
  for (let i = startLeft; i < stopRight; i++) {
    if (left[m] < right[n]) {
      arr[i] = left[m];
      m++;
    } else {
      arr[i] = right[n];
      n++;
    }
  }
}

var heapSort = arr => {
  let middle = Math.floor(arr.length / 2);
  //将数据构建成最大堆
  for (let i = middle; i >= 0; i--) {
    adjustHeap(arr, i, arr.length - 1);
  }
  for (let i = arr.length - 1; i >= 0; i--) {
    //交换第一个元素和最后一个元素
    [arr[i], arr[0]] = [arr[0], arr[i]];
    //重新调整堆
    adjustHeap(arr, 0, i);
  }
  return arr;
}

var adjustHeap = (arr, parent, length) => {
  let temp = arr[parent]; //缓存节点的值，方便最后赋值
  let children = 2 * parent + 1; //左子节点的索引值
  while (children < length) {
    //如果存在右子节点，并且右子节点大于左子节点，则指向右子节点
    if (children + 1 < length && arr[children + 1] > arr[children]) {
      children++;
    }
    //如果子节点的值都比父节点小则返回
    if (temp >= arr[children]) {
      break;
    }
    arr[parent] = arr[children];
    parent = children;
    children = 2 * parent + 1;
  }
  arr[parent] = temp;
}

var countSort = arr => {
  let tempArr = [],
    targetArr = [];
  for (let i = 0; i < arr.length; i++) {
    let m = arr[i];
    tempArr[m] = tempArr[m] ? tempArr[m] + 1 : 1;
  }
  for (let j = 0; j < tempArr.length; j++) {
    while (tempArr[j]) {
      targetArr.push(j);
      tempArr[j]--;
    }
  }
  return targetArr;
}

var bucketSort = arr => {
  const count = 10, //桶的数量
    max = Math.max(...arr), //最大值
    min = Math.min(...arr), //最小值
    size = Math.floor((max - min) / count) + 1; //每个桶的大小
  let _bucket = []; //空桶
  for (let i = 0; i < arr.length; i++) {
    let index = ~~(arr[i] / size); //找到对应桶的下标
    if (!_bucket[index]) {
      _bucket[index] = [];
    }
    //将元素放进桶里
    _bucket[index].push(arr[i]);
    //桶内排序
    let len = _bucket[index].length;
    while (len > 0) {
      if (_bucket[index][len] < _bucket[index][len - 1]) {
        [_bucket[index][len], _bucket[index][len - 1]] = [_bucket[index][len - 1], _bucket[index][len]];
      }
      len--;
    }
  }
  let bucket = [];
  //取出桶中的元素
  for (let i = 0; i < _bucket.length; i++) {
    if (_bucket[i]) {
      bucket.push(..._bucket[i]);
    }
  }
  return bucket;
}

var LSDRadixSort = arr => {
  const max = Math.max(...arr);
  let digit = `${max}`.length,
    start = 1,
    bucket = [];
  while (digit) {
    start *= 10;
    //放入桶中
    for (let i = 0; i < arr.length; i++) {
      let index = arr[i] % start;
      if (!bucket[index]) {
        bucket[index] = [];
      }
      bucket[index].push(arr[i]);
    }
    arr = [];
    //从桶中取出
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i]) {
        arr = arr.concat(bucket[i]);
      }
    }
    //进行下一次排序
    bucket = [];
    digit--;
  }
  return arr;
}