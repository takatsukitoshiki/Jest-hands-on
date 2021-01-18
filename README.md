# Jest-hands-on

Jestを扱えるようになるための入門用ハンズオンです。
Jestって何？といったところから関数のmock化までを手を動かしながら学んでいきます。
【内容】

1. Jestとは何か
2. Jestの導入方法
3. テスト作成
4. テスト実行
5. assertionについて
6. mockについて

事前に以下の環境を用意しておきます。
// TODO（wsl2のイメージを共有する方法を確認する）
【環境】
os : ubuntu18 (wsl2)
execution env : node.js version12
editor : vscode

## 1. Jestとは何か

JestはFacebook社によって開発されているJavascript用のテストフレームワークです。
Javascriptにおける単体テスト用フレームワークはMocha, Jasmine等がありますが、
ここ数年で急成長しているのがJestであり、現在では使用率No1となっています。
(最近ではStorybookや)

## 2. Jestの導入方法

導入は簡単です。
以下のコマンドをプロジェクトディレクトリで実行しましょう。

`npm install --save-dev jest`

※ --save-devをつけることで開発用のパッケージとしてインストールします。

あとは、テスト対象とそれをテストするコードを用意すればjestを使った単体テストが実施できます。

## 3. テスト作成

では早速、テストを作成していきましょう。
といってもテストする対象がないと何をテストするのかという話になるので、まずは適当にテスト対象となるモジュールを作成します。

まずはモジュール作成する場所”src”ディレクトリを作成しましょう。
作成したら、その場所に"main.js"という名前でJavascriptファイルを作成してください。

main.jsの中身は、とりあえず以下の様に書いておきましょう。

```node.js
main();

function main() {
    console.log("hello world")
}
```

試しに動かして見ましょう。

vscode上でショートカットキー「ctrl + shift + @」を押してみてください。
ターミナルが表示されるはずです。
ちなみに「ctrl + shift + p」と押したあとに「create new terminal」などとしても表示できます。

ターミナルが表示されたら、そこに以下のコマンドを入力して実行してみてください。

`node ./src/main.js`

実行するとターミナルで"hello world!!!"が確認できると思います。

では、このmain関数で表示させる文言を、ある計算結果となるように変えてみます。

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

でも、新たに作成した関数sumの結果が意図した通りになっているか、不安はありませんか？
いま作成した関数は非常に簡単なロジックなのであまりそういった感覚はないかもしれません。
ただ、実際はより複雑で条件分岐なども含まれることになります。
そういった時に有用なのが単体テストというわけです。

それでは、関数sumについてのテストコードを書いていきましょう。

新たに、テストファイル用のディレクトリを作成します。
既に作成してあるsrcと同じ階層に"test"という名前で作成しましょう。

testディレクトリを作成したら、そこに"main.test.js"という名前のファイルを作成してください。
※作成するテストファイルは必ず、拡張子".js"の前に".test"とつけるようにしてください。

作成した"main.test.js"の中身は以下のようにします。

```
const sum = require('../src/main2');

discribe("test sum", () => {
    test('adds 1 + 2 to equal 3', () => {
        expect(sum(1, 2)).toBe(3);
    });
})
```
