const { getValueAsync, sleep } = require('../src/main5');
const { expect } = require('@jest/globals');

describe("非同期関数sleepについてのテスト", () => {
    test.skip('だめなパターン', () => {
        function callback(a, b) {
            expect(b).toBe("now")
        }
        sleep(callback)
    });
    test('成功パターン', done => {
        function callback(a, b) {
            try {
                expect(b).toBe("now")
                done()
            } catch (error) {
                done(error)
            }
        }
        sleep(callback)
    });
})
describe("非同期関数についてのテスト", () => {
    test.only('正常動作1', () => {
        return getValueAsync("非同期テスト中").then((data) => {
            expect(data).toBe("非同期テスト中")
        })
    });
    test('正常動作2', async () => {
        await expect(getValueAsync("非同期テスト中")).resolves.toBe("非同期テスト中")
    });
    test('正常動作3', async () => {
        await expect(getValueAsync("非同期テスト中")).rejects.toBe("非同期テスト中")
    });
})
