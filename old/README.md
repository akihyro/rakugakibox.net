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

### 鍵情報 設定

```
$ vi .keys.json
{
  "aws": {
    "dev": {
      "accessKeyId": "...",
      "secretAccessKey": "..."
    },
    "pro": {
      "accessKeyId": "...",
      "secretAccessKey": "..."
    }
  }
}
```


Grunt タスク
------------

### ビルド

```
$ grunt build --stage=[dev|pro]
```

### デプロイ

```
$ grunt deploy --stage=[dev|pro]
```

### クリーン

```
$ grunt clean --stage=[dev|pro]
```
