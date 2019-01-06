const sum = (...args) => args.reduce((acc, cur) => acc + cur, 0);

/*
if (typeof exports === "object" && typeof module === "object") module.exports = sum;
else export default sum;
*/

/*
console.log(module);
//console.log(exports);
console.log(module.exports);
module.exports = sum;
export default sum;
*/
