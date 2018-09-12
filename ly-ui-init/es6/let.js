/**
 * Created by 01375677 on 2018/9/10.
 */

for(let i = 0; i < 5; i++){
    console.log(i);
}
//console.log("循环外：" + i)

const a = 123;
//a = 345;

//es6字符串扩展
var str = "hello.vue"
str.includes('v');
str.startsWith('hello');

str = `
hello 
world 
java 
124
`;

//结构表达式
const [x, y, z] = [1,2,3];
console.log(x, y, z);


const person = {
    name:"jack",
    age:21,
    language:['java','js', 'css']
}

// const {name, age, language} = person;
// console.log(name, age, language);

const {name:n} = person;
console.log(n);


//函数默认参数
function add(a, b = 1) {
    return a + b;
}

//箭头函数
var print = function (obj) {
    console.log(obj);
}

var print2 = obj => console.log(obj);


var add2 = (a, b) => a + b;
var add3 = (a, b) => {
    return a + b;
}

let person1 = {
    name: "jack",
    // 以前：
    eat: function (food) {
        console.log(this.name + "在吃" + food);
    },
    // 箭头函数版：
    eat2: food => console.log(person.name + "在吃" + food),// 这里拿不到this
    // 简写版：
    eat3(food){
        console.log(this.name + "在吃" + food);
    }
}

/////////以下等价//////////////
const person = {
    name:"jack",
    age:21,
    language: ['java','js','css']
}

function hello(person) {
    console.log("hello," + person.name)
}

var hi = ({name}) =>  console.log("hello," + name);

/////////////////////////////

//map和reduce
let arr = ['1', '20', '-5'];
arr = arr.map(s=>parseInt(s));

const arr = [1,20,-5,3];

arr.reduce((a, b) => a + b);
arr.reduce((a, b) => a * b);
//指定初始值
arr.reduce((a, b) => a * b, 0);


const p = new Promise(function (resolve, reject) {
    // 这里我们用定时任务模拟异步
    setTimeout(() => {
        const num = Math.random();
        // 随机返回成功或失败
        if (num < 0.5) {
            resolve("成功！num:" + num)
        } else {
            reject("出错了！num:" + num)
        }
    }, 300)
})

// 调用promise
p.then(function (msg) {
    console.log(msg);
}).catch(function (msg) {
    console.log(msg);
})



//set map

// Set构造函数可以接收一个数组或空
let set = new Set();
set.add(1);// [1]
// 接收数组
let set2 = new Set([2,3,4,5,5]);// 得到[2,3,4,5]

set.add(1);// 添加
set.clear();// 清空
set.delete(2);// 删除指定元素
set.has(2); // 判断是否存在
set.keys();// 返回所有key
set.values();// 返回所有值
set.entries();// 返回键值对集合
set.size;

const map = new Map([
    ['key1','value1'],
    ['key2','value2'],
])
// 或者接收一个set
const set = new Set([
    ['key1','value1'],
    ['key2','value2'],
])
const map2 = new Map(set)
// 或者其它map
const map3 = new Map(map);
































