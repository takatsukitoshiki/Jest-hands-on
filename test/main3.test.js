const { sum, validate, isArray } = require('../src/main3');

describe("test sum", () => {
    test('sumの計算結果', () => {
        expect(sum(1, 2)).toBe(3);
    });
})
describe("isArrayについてのテスト", () => {
    test('trueになる場合', () => {
        const a = []
        expect(isArray(a)).toBeTruthy()
    });
    test('trueになる場合', () => {
        const a = ""
        expect(isArray(a)).not.toBeTruthy()
    });
    test('trueになる場合', () => {
        const a = {}
        expect(isArray(a)).toBeFalsy()
    });
})
describe("validateについてのテスト", () => {
    test('エラーの場合', () => {
        const name = "takatsuki"
        // エラーの検証の場合はコールバックとして与える
        expect(() => { validate(name) }).toThrow()
    });
    test('エラーの場合2', () => {
        const name = "takatsuki"
        // エラーの検証の場合はコールバックとして与える
        expect(() => { validate(name) }).toThrow(new Error("名前が長すぎます"))
    });
    test('エラーでない場合', () => {
        const name = "taka"
        // エラーの検証の場合はコールバックとして与える
        expect(() => { validate(name) }).not.toThrow()
    });
})
