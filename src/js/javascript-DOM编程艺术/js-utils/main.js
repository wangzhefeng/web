// 数组 Array
var beatles = Array(4);
beatles[0] = "John";
beatles[1] = "Paul";
beatles[2] = "George";
beatles[3] = "Ringo";
console.log(beatles);
console.log(beatles[0]);

var beatles = Array("John", "Paul", "George", "Ringo");
console.log(beatles);

var beatles = ["John", "Paul", "George", "Ringo"];
console.log(beatles);

var years = [1940, 1941, 1942, 1943];

var lennon = ["John", 1940, false];

var beatles = Array();
var name = "John";
beatles[0] = name;


var names = ["Ringo", "John", "George", "Paul"];
beatles[1] = names[3];

var lennon = ["John", 1940, false];
var beatles = [];
beatles[0] = lennon;
console.log(beatles[0][0]);
console.log(beatles[0][1]);
console.log(beatles[0][2]);


// 关联数组
var lennon = Array();
lennon["name"] = "John";
lennon["age"] = 1940;
lennon["living"] = false;
console.log(lennon);

