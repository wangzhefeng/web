// 类
var Student = /** @class */ (function () {
    function Student(firstName, middleInital, lastName) {
        this.firstName = firstName;
        this.middleInital = middleInital;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInital + " " + lastName;
    }
    return Student;
}());
// 带类型注解的函数
function greeter(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
// 创建 Student 的实例
var user = new Student("Jane", "M.", "User");
document.body.innerHTML = greeter(user);
