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

### SFTP アップロード先 ログイン情報設定

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
