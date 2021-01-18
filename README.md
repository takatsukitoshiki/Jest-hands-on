# Jest-hands-on

Jest を扱えるようになるための入門用ハンズオンです。
Jest って何？といったところから関数の mock 化までを手を動かしながら学んでいきます。
【内容】

1. Jest とは何か
2. Jest の導入方法
3. テスト作成と実行
4. assertion について
5. mock について
6. 非同期関数のテスト
7. カバレッジについて

事前に以下の環境を用意しておきます。
// TODO（wsl2 のイメージを共有する方法を確認する）
【環境】
os : ubuntu18 (wsl2)
execution env : node.js version12
editor : vscode

## 1. Jest とは何か

Jest は Facebook 社によって開発されている Javascript 用のテストフレームワークです。
Javascript における単体テスト用フレームワークは Mocha, Jasmine 等がありますが、
ここ数年で急成長しているのが Jest であり、現在では使用率 No1 となっています。
(最近では Storybook や)

## 2. Jest の導入方法

導入は簡単です。
以下のコマンドをプロジェクトディレクトリで実行しましょう。

`npm install --save-dev jest`

※ --save-dev をつけることで開発用のパッケージとしてインストールします。

あとは、テスト対象とそれをテストするコードを用意すれば jest を使った単体テストが実施できます。

## 3. テスト作成

では早速、テストを作成していきましょう。
といってもテストする対象がないと何をテストするのかという話になるので、まずは適当にテスト対象となるモジュールを作成します。

まずはモジュール作成する場所”src”ディレクトリを作成しましょう。
作成したら、その場所に"main.js"という名前で Javascript ファイルを作成してください。

main.js の中身は、とりあえず以下の様に書いておきましょう。

```node.js
main();

function main() {
    console.log("hello world")
}
```

試しに動かして見ましょう。

vscode 上でショートカットキー「ctrl + shift + @」を押してみてください。
ターミナルが表示されるはずです。
ちなみに「ctrl + shift + p」と押したあとに「create new terminal」などとしても表示できます。

ターミナルが表示されたら、そこに以下のコマンドを入力して実行してみてください。

`node ./src/main.js`

実行するとターミナルで"hello world!!!"が確認できると思います。

では、この main 関数で表示させる文言を、ある計算結果となるように変えてみます。

```
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
```

これで足し算の結果が表示されるようになりました。

でも、新たに作成した関数 sum の結果が意図した通りになっているか、不安はありませんか？
いま作成した関数は非常に簡単なロジックなのであまりそういった感覚はないかもしれません。
ただ、実際はより複雑で条件分岐なども含まれることになります。
そういった時に有用なのが単体テストというわけです。

それでは、関数 sum についてのテストコードを書いていきましょう。

新たに、テストファイル用のディレクトリを作成します。
既に作成してある src と同じ階層に"test"という名前で作成しましょう。

test ディレクトリを作成したら、そこに"main.test.js"という名前のファイルを作成してください。
※作成するテストファイルは必ず、拡張子".js"の前に".test"とつけるようにしてください。

作成した"main.test.js"の中身は以下のようにします。

```
const { sum } = require('../src/main2');

describe("test sum", () => {
    test('adds 1 + 2 to equal 3', () => {
        expect(sum(1, 2)).toBe(3);
    });
})
```

テストを実行してみましょう。

`npm run test`

おそらくテストは失敗すると思います。
今のコードではテスト対象の sum を外部から扱えないためです。
外部から扱える様にするために、main.js に書いた関数 sum を export します。

main.js の最後に以下の一文を加えてください。

`module.exports = { sum };`

では、テストを再実行します。
今度は成功するはずです。

以上で、簡単ではありますが、テストの実行ができました。

### テストファイルの内容説明

`const { sum } = require('../src/main2');`

まず 1 行目で、外部モジュールの関数を require（インポート）しています。

`describe("test sum", () => {`

3 行目の describe はグルーピングを行っているだけで、この範囲は～～のためのテストといった具合にわかりやすくするためのものです。

` test('adds 1 + 2 to equal 3', () => {`

4 行目からの test はテストの具体的な処理を記述します。
例では 1 つのみですが、並列する形でいくつでも記載できます。

` expect(sum(1, 2)).toBe(3);`

5 行目ではテスト結果の検証をしています。
expect()に検証対象を与え、続く toBe()で検証します。
toBe()はマッチャ（matcher）と呼ばれる実行結果を検証するための関数ですが、
toBe()以外にもたくさんの種類があり、必要に応じて使い分けます。

マッチャーについては次項で説明します。

## 4. assertion について

### 結果の検証

テストではある関数がどのような結果になるのかを、あらかじめ期待値として定義します。
そして、実際に実行した結果、期待値を満たすかどうかを検証します。
期待値としては様々なケースが考えられます。
同じ関数でも複数あるのが普通です。
場合によってはエラーとなることが期待値であることもあります。

### matcher の種類

いくつかサンプルをあげてみます。
・toBeNull()
結果が null であることを期待します

・toBeTruthy()
結果が True であることを期待します。

・toStrictEqual(value)
オブジェクトの中身を細かく精査します。すべての項目名や値が一致しなければ OK となりません。

・toThrow(error?)
エラーが発生することを期待します。引数にエラーオブジェクトを与えることで、発生したエラーについても検証します。

・toHaveBeenCalledTimes(number)
対象の関数が指定の回数呼ばれることを期待します。モックを対象に使用します。

・toHaveBeenCalledWith(arg1, arg2, ...)
対象の関数が指定の引数で呼ばれることを期待します。モックを対象に使用します。

他にもたくさんの種類があるので、一度下記の URL を確認してみてください。
https://jestjs.io/docs/ja/expect

### 練習

練習として、いくつかのマッチャーを使用してみましょう。

main3.js と main3.test.js

#### 補足

テストが増えてくると、テストを作成するたびにすべてのテストが実行されることが煩わしいと思うようになります。
そこで、目的のテストだけ実行させるようにしてみます。
そのためには、実行させたい test に"only"とつけます。つまり test.only()とします。

`test.only('adds 1 + 2 to equal 3', () => {`

describe 単位で制限したいのであれば、describe.only とします。

`describe.only("test sum", () => {`

逆に、あるテストだけ実行させたくないのであれば、そのテストに skip とつけます。

`test.skip('adds 1 + 2 to equal 3', () => {`

## 5. mock について

### mock の使いどころ

もしあるモジュールのテストを行いたい時に、そのモジュールが別のモジュールに依存していたとします。
その場合において、別のモジュールが動かないことには目的のテストを実施することができません。
依存モジュールが作成中であれば完成を待つ必要がでてきます。
依存モジュールが正しく動作する場合でも、ある特定の値を返して欲しいと思うこともあるでしょう。
そういった場合に、依存モジュールを都合の良い存在（偽物、モック）に置き換えてテスト対象のみに集中できるようにします。

### モック化の方法

ここでは Jest でモック化を行う方法を学びます。

まずは、今までテスト対象としていた main.js を別のモジュールに依存する様に変更します。
依存モジュールとして、src ディレクトリ配下に"sub.js"を作成しましょう。

sub.js には peaple オブジェクトを格納する配列を受け取って、指定された key とその value を持つ peaple オブジェクトだけの配列を返す関数 filterPeaples()を定義してみます。

```
exports.filterPeaples = function (peaples, key, value) {
    return peaples.filter(peaple => {
        return peaple[key] ? peaple[key] === value : false
    })
}
```

この関数を main.js で使用するわけです。
ですので、main.js にも関数 countSpecificPeaple()を作成して、その中で先程作成した filterPeaples()を呼ぶようにします。
（修正後が main4.js）

```
function countSpecificPeaple(peaples, key, value) {
    const a = sub.filterPeaples(peaples, key, value)
    return a.length
}
```

では作成した countSpecificPeaple()が動いているか確認しましょう。
test ディレクトリ配下に"main4.test.js"を作成します。

main4.test.js ではテスト対象の関数にわたす peaple オブジェクトを作成します。
そして test 内で、テスト対象関数 countSpecificPeaple()を呼び出し、peaple オブジェクトの他、key と value の値を渡します。

```
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
```

その結果、今回のケースの場合は 2 が帰ってくれば OK になります。

テストを実行してみましょう。
なんとなくうまく行っているように見えていますが、もしかするとどこかに問題があるかもしれません。
問題があるとすると、それが countSpecificPeaple()にあるかもしれないし、filterPeaples()にあるかもしれません。
今テストしたいのは countSpecificPeaple()なので、あまり filterPeaples()の事は考えたくありませんよね。
というわけで、filterPeaples()を 100% 2 つのオブジェクトを持つ配列を返すようにしてみましょう。
countSpecificPeaple()としては正しくカウントできていれば良いわけですから、filterPeaples()が正しくフィルターできているかどうかは二の次です。

どうすれば良いか。filterPeaples()をモック化します。

やり方は簡単です。
モック化する対象モジュールを require したあとに、対象の関数に対して jest.fn()とするだけ。
これで、sub.filterPeaples()はモックになりました。

※モック化の方法は同じことをするにしても何通りかあるので、ちょっと分かりづらいところがあります。

ただし、ただモック化しただけなので、何も中身のないただの偽物です。
今回は「100% 2 つの peaple オブジェクトを持つ配列を返す」関数にしたいわけなので、もうひと工夫が必要です。

モック化したあとに続けて、以下の様に書きます。

```
sub.filterPeaples.mockReturnValue([{ name: "tanaka" }, { name: "yamada" }])
```

確認も兼ねて、sub.filterPeaples()をコンソール出力してみましょう。
引数に関係なく同じ値が返ってくるはずです。

追加で書いた、mockReturnValue()はモックが呼ばれる度に返す値を設定します。
もっと詳しく挙動を設定したい場合は、例えば以下の様に書きます。

```
sub.filterPeaples = jest.fn(() => {
    ~~処理の詳細~~
})
```

また、モックは呼び出し回数なども記録しているので、
何回、どのような引数で呼び出されたかも検証することができます。
テストでは、モック化した関数が一度だけ呼び出されたことを検証してみます。

その他、コールバックをモック化して、どのようにコールバックが扱われたかといったことにも使用できます。

https://jestjs.io/docs/ja/mock-function-api

## 6. 非同期関数のテスト

Javascript といえば非同期ですが、非同期の場合ももちろん検証可能です。
非同期に関してサンプルで確認してみましょう。
callback を受け取る非同期関数を検証する場合、これまでと同じ様に書いてしまうと、
非同期関数を呼んだ直後にテストが終了してしまいます。

```
test('だめなパターン', () => {
  function callback(a, b) {
      expect(b).toBe("now")
  }
  sleep(callback)
});
```

この場合は、コールバック内で done()を呼び事でテスト実行終了を待ってくれるようになります。

```
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
```

また、Promise を返す非同期関数のテストでは、Promise を return することで、jest はその解決を待ちます。

```
test.only('正常動作1', () => {
  return getValueAsync("非同期テスト中").then((data) => {
      expect(data).toBe("非同期テスト中")
  })
});
```

await を使用する方法もあります。

```
test('正常動作2', async () => {
  await expect(getValueAsync("非同期テスト中")).resolves.toBe("非同期テスト中")
});
```

## 7. カバレッジについて

Jest にはカバレッジを簡単に取得可能です。

これまで `npm run test`としていたところに、オプションを付けるだけです。
`npm run test -- --coverage`

上記のコマンドを実行すると coverage ディレクトリが作成されます。
コンソール上でも簡易結果が表示されますが、詳細を確認したい場合は、
coverage ディレクトリにある index.html を開くとブラウザで確認可能です。
