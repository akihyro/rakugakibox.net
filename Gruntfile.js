module.exports = function(grunt) {

  // タスクをロードする
  require('load-grunt-tasks')(grunt);

  // 設定を初期化する
  grunt.initConfig({

    // compass
    "compass": {
      "styles.dev": {
        options: {
          environment: "development",
          bundleExec: true,
          sassDir: "src/styles",
          cssDir: "dest.dev/styles",
          outputStyle: "expanded",
        },
      },
      "styles.pro": {
        options: {
          environment: "production",
          bundleExec: true,
          sassDir: "src/styles",
          cssDir: "dest.pro/styles",
          outputStyle: "expanded",
        },
      },
    },

    // CSS検証
    "csslint": {
      "styles.dev": {
        src: "dest.dev/styles/**/*.css",
      },
      "styles.pro": {
        src: "dest.pro/styles/**/*.css",
      },
    },

    // CSS縮小化
    "cssmin": {
      "styles.dev": {
        files: {
          "dest.dev/styles/rakugaki-box.net.min.css": "dest.dev/styles/rakugaki-box.net.css",
        },
      },
      "styles.pro": {
        files: {
          "dest.pro/styles/rakugaki-box.net.min.css": "dest.pro/styles/rakugaki-box.net.css",
        },
      },
    },

    // JS検証
    "jshint": {
      "options": {
        expr: true
      },
      "scripts.dev": [
        "src/scripts/**/*.js",
      ],
      "scripts.pro": [
        "src/scripts/**/*.js",
      ],
    },

    // SFTPアップロード
    "sftp-deploy": {
      "dest.dev": {
        auth: {
          host: "rakugaki-box.net",
          port: 22,
          authKey: "dev",
        },
        src: "dest.dev",
        dest: "/virtual/akihyrox/public_html/resource.blog.dev2.rakugaki-box.net",
      },
      "dest.pro": {
        auth: {
          host: "rakugaki-box.net",
          port: 22,
          authKey: "pro",
        },
        src: "dest.pro",
        dest: "/virtual/akihyrox/public_html/resource.blog.pro2.rakugaki-box.net",
      },
    },

    // クリーン
    "clean": {
      "dest.dev": [
        "dest.dev",
      ],
      "dest.pro": [
        "dest.pro",
      ],
    },

  });

  // タスクを登録する
  grunt.registerTask("default", "dev");
  grunt.registerTask("dev", [
    "compass:styles.dev",
    "csslint:styles.dev",
    "cssmin:styles.dev",
    "jshint:scripts.dev",
    "sftp-deploy:dest.dev",
  ]);
  grunt.registerTask("pro", [
    "compass:styles.pro",
    "csslint:styles.pro",
    "cssmin:styles.pro",
    "jshint:scripts.pro",
    "sftp-deploy:dest.pro",
  ]);

};
