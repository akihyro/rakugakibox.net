rakugakibox.net
===============

必要なもの
----------

* Node.js v0.12.7
* Ruby v2.2.3

ローカルリポジトリ作成
----------------------

```sh
$ git clone git@github.com:akihyro/rakugakibox.net.git
$ cd rakugakibox.net
```

依存モジュール インストール
---------------------------

```sh
$ npm install
$ bundle install
```

タスクリスト
------------

```sh
$ npm run tasks
```

お掃除
------

```sh
$ npm run clean
```

ビルド
------

```sh
$ npm run build
```

デプロイ
--------

```sh
$ export AWS_ACCESS_KEY_ID="..."
$ export AWS_SECRET_ACCESS_KEY="..."
$ npm run deploy:{stage}
```
