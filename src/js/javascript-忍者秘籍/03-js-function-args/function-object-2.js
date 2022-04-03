
var ninja = {};
ninja.name = "hitsuke";

var wieldSword = function () {};
wieldSword.swordType = "katana";

var store = {
    nextId: 1,
    cache: {},
    add: function (fn) {
        if (!fn.id) {
            fn.id = this.nextId++,
            this.cache[fn.id] = fn;
            return true;
        }
    }
};
console.log(store);

function ninja1() {}
function ninja2() {}

store.add(ninja1);
console.log(store);

store.add(ninja1);
console.log(store);

store.add(ninja2);
console.log(store);
