rakugaki-box.net
================


環境構築手順
------------

### 事前に必要なもの

* node.js
    * node.js
    * grunt-cli
    * bower
* Ruby
    * ruby
    * bundler

### リポジトリ クローン

```
$ git clone git@github.com:akihyro/rakugaki-box.net.git
$ cd rakugaki-box.net
```

### node.js パッケージ インストール

```
$ npm install
```

### bower パッケージ インストール

```
$ bower install
```

### bundler パッケージ インストール

```
$ bundle install
```

### デプロイ先 ログイン情報設定

```
$ vi .ftppass
{
  "dev": {
    "username" : "your_username",
    "password" : "your_password"
  },
  "pro": {
    "username" : "your_username",
    "password" : "your_password"
  }
}
```


Grunt タスク
------------

### ビルド

```
$ grunt build --env=[dev|pro]
```

### デプロイ

```
$ grunt deploy --env=[dev|pro]
```

### クリーン

```
$ grunt clean --env=[dev|pro]
```
