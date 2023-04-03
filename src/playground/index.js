// 函数
// function log() {
//   console.log("Log::");
// }

// 函数参数
// const log = (text, title) => {
//   console.log(title, text);
// };
// log("你好！", "Log::");
// log("hello~", "日志");

// 箭头函数
// const greet = (name) => {
//   return "你好，" + name;
// };

// const greeting = greet("李依恒");
// console.log(greeting);

// 当只有一个参数一个值时箭头函数简写
// const greet = name => "你好，" + name;
// const greeting = greet("李依恒");
// console.log(greeting);

// 方法
// const book = {
//   title: "小白兔的开发之路",
//   greeting() {
//     return `《${this.title}》`;
//   },
// };

// console.log(book.greeting());

// 解构：把一个对象里的值提取出来单独声明成常量或者变量，可以修改名字
// const book = {
//   name: "小白兔的开发之路",
//   title: "李依恒",
// };

// const { name: content, title } = book;
// console.log(content, title);

// 把一个数组里的值提取出来单独声明成常量或者变量
// const page = ["苹果", "香蕉", "栗子"];
// const [f1, f2, f3] = page;
// console.log(f1);
// console.log(f2);
// console.log(f3);

// 把数组里的所有内容提取出来赋予另外一个
// const title = ["苹果", "栗子", "香蕉"];
// const text = ["阿萨德", "接口", "时间啊肯"];
// const page = [...text];
// const food = [...title, ...text];
// console.log(page);
// console.log(food);

// 把对象里的内容提取出来赋予另外一个
// const book = {
//   name: "小白兔的开发之路",
//   content: "李依恒",
// };
// const page = { ...book };
// console.log(page);

//也可以新增属性嵌套对象
// const title = {
//   f3: "小白兔的开发之路",
//   content: "李依恒",
// };
// const text = {
//   title: "所编写",
//   text: "阿是肯定会",
// };
// const page = {
//   ...title,
//   name: text,
// };
// console.log(page);

// if语句：根据执行条件真假去判断是否执行代码
// let title = "李依恒";
// title = "小白兔";

// if (title === "李依恒") {
//   console.log("是本人");
// } else {
//   console.log("不是本人");
// }

//
// switch语句：根据不同情况做不同的事情,注意结尾需要添加break跳出循环,default为默认状态当没有符合条件时选择该选项
// let car = "P";
// car = "阿莎";
// car = "D";
// switch (car) {
//   case "P":
//     console.log("停车");
//     break;
//   case "D":
//     console.log("开车");
//     break;
//   case "N":
//     console.log("空挡");
//     break;
//   case "R":
//     console.log("倒车");
//     break;
//   default:
//     console.log("档位异常");
//     break;
// }

// throw 抛出异常：当代码发生异常，代码并停止运行
// 异常会被传递到最近的异常处理程序。如果没有异常处理程序处理这个异常，程序就会崩溃，并在控制台输出错误信息。如果有异常处理程序处理这个异常，程序会继续执行，但是根据异常处理程序的逻辑，可能会出现不同的行为。
// const book = () => {
//   throw new Error("这里的出错啦");
// };
// book();

// 首先，bigCar() 函数被调用。
// 在 bigCar() 函数中， smallCar 常量被定义，并将 car() 函数的返回值赋值给它。由于 car() 函数总是返回 true，因此 smallCar 也会被赋值为 true。
// if 语句检查 smallCar 的值是否为 false，但是由于它的值为 true，因此条件不成立，代码执行将跳过 throw 语句块并继续执行下一行。
// 最后，console.log() 函数被调用，输出字符串 "小汽车"。
// 由于 try 块中的代码没有抛出任何错误，所以控制流程不会进入 catch 块。因此，代码将正常地执行完毕，没有任何错误被捕获。
// const car = () => {
//   return true;
// };

// const bigCar = () => {
//   const smallCar = car();
//   if (!smallCar) {
//     throw new Error("大汽车");
//   }
//   console.log("小汽车");
// };

// try {
//   bigCar();
// } catch (error) {
//   console.log(error.message);
// }

// 类 class 实例化
// class Car {
//   engine;
//   bigCar() {
//     console.log("小飞机来咯");
//   }
// }

// const Page = new Car();
// Page.bigCar();
// console.log(Page);

// 构造方法：执行会自动调用构造方法：constructor当创建了三个 Car 类的实例时，构造函数就会被调用三次，并输出三次相同的信息。
// class Car {
//   constructor() {
//     console.log("这是一辆崭新的汽车");
//   }
//   engine; //自动创建一个新对象
//   bigCar() {
//     console.log("小飞机来了");
//   }
// }

// const Tank = new Car();
// Tank.bigCar();
// console.log(Tank);

// this展示; 当创建了三个 Car 类的实例时，构造函数就会被调用三次，并输出三次相同的信息。
// class Car {
//   text;
//   constructor(text) {
//     this.text = text;
//     console.log("这是一辆崭新的汽车");
//   }
//   bigCar() {
//     console.log("小飞机来了");
//   }
// }

// const car = new Car();
// const car1 = new Car("这是一段普通的文本");
// const car2 = new Car("这是一段不一样的文本");
// console.log(car);
// console.log(car1);
// console.log(car2);

// 类的继承:extends
class Car {
  text;
  constructor(text) {
    this.text = text;
    console.log("这是一辆崭新的小汽车");
  }
  bigCar() {
    console.log("小飞机来咯");
  }
}

class Tank extends Car {}
const p1 = new Tank("啦啦啦啦啦");
p1.bigCar();
console.log(p1);
