// 1.调试
// 2.测试
// 3.性能分析


/**
 * 1.调试
 */

/**
 * 2.测试, 参考附录 B
 */
const a = 2;
// assert (a === 1, "Disaster! a is not 1!")

/**
 * 3.性能分析
 */
console.time("My operation");
for (var n = 0; n < 100; n++) {
    /* perform the operation to be measured */
    console.log("hello world!");
}
console.timeEnd("My operation");
