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
