const { countSpecificPeaple } = require('../src/main4');
const sub = require('../src/sub');
const expectExport = require('expect');

const peaples = [{
    name: "tanaka",
    gender: "male",
    age: 20
}, {
    name: "suzuki",
    gender: "female",
    age: 25
}, {
    name: "nakata",
    gender: "male",
    age: 26
}, {
    name: "yamada",
    gender: "female",
    age: 29
}]

describe("countSpecificPeapleについてのテスト", () => {
    test('正常動作', () => {
        sub.filterPeaples = jest.fn()
        sub.filterPeaples.mockReturnValue([{ name: "tanaka" }, { name: "yamada" }])
        // 別の書き方をいかに示す。
        // jest.mock(sub)
        // sub.filterPeaples.mockReturnValue()

        const received = countSpecificPeaple(peaples, "gender", "female")
        expect(received).toBe(2)
        expect(sub.filterPeaples).toHaveBeenCalledTimes(1)
    });
})
