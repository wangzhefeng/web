// 映射期待的键/值对，无论是否提供
const m3 = new Map([[]]);
console.log(m3.has(undefined)); // true
console.log(m3.get(undefined)); // undefined
