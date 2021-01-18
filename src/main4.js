const sub = require('./sub')

main();

function main() {
    // console.log("hello world")
    const a = 1;
    const b = 2;
    const result = sum(a, b);
    console.log(a, "+", b, "の合計は", result, "です。");
}

function sum(a, b) {
    return a + b;
}

function isArray(a) {
    return a instanceof Array
}

function validate(name) {
    if (name.length > 5) {
        throw new Error("名前が長すぎます")
    }
}

function countSpecificPeaple(peaples, key, value) {
    const a = sub.filterPeaples(peaples, key, value)
    return a.length
}



module.exports = { sum, validate, isArray, countSpecificPeaple };
