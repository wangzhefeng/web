// 类
class Student {
    fullName: string;
    constructor(public firstName, public middleInital, public lastName) {
        this.fullName = firstName + " " + middleInital + " " + lastName;
    }
}

// 接口
interface Person {
    firstName: string;
    lastName: string;
}

// 带类型注解的函数
function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

// 创建 Student 的实例
let user = new Student("Jane", "M.", "User");


document.body.innerHTML = greeter(user);
