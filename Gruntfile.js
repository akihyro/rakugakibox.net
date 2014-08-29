module.exports = function(grunt) {

  // タスクをロードする
  require('load-grunt-tasks')(grunt);

  // 設定を初期化する
  grunt.initConfig({

    // コピー
    "copy": {
      "scripts.dev": {
        files: [
          {
            src: "bower_components/jquery/dist/jquery.js",
            dest: "dest.dev/scripts/jquery.js",
          },
          {
            src: "bower_components/jquery/dist/jquery.min.js",
            dest: "dest.dev/scripts/jquery.min.js",
          },
          {
            src: "src/scripts/rakugaki-box.net.js",
            dest: "dest.dev/scripts/rakugaki-box.net.js",
          },
        ],
      },
      "scripts.pro": {
        files: [
          {
            src: "bower_components/jquery/dist/jquery.js",
            dest: "dest.pro/scripts/jquery.js",
          },
          {
            src: "bower_components/jquery/dist/jquery.min.js",
            dest: "dest.pro/scripts/jquery.min.js",
          },
          {
            src: "src/scripts/rakugaki-box.net.js",
            dest: "dest.pro/scripts/rakugaki-box.net.js",
          },
        ],
      },
    },

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
        "dest.dev/scripts/rakugaki-box.net.js",
      ],
      "scripts.pro": [
        "dest.pro/scripts/rakugaki-box.net.js",
      ],
    },

    // JS縮小化
    "uglify": {
      "options": {
        preserveComments: false,
      },
      "scripts.dev": {
        files: {
          "dest.dev/scripts/rakugaki-box.net.min.js": [
            "dest.dev/scripts/jquery.min.js",
            "dest.dev/scripts/rakugaki-box.net.js",
          ],
        },
      },
      "scripts.pro": {
        files: {
          "dest.pro/scripts/rakugaki-box.net.min.js": [
            "dest.pro/scripts/jquery.min.js",
            "dest.pro/scripts/rakugaki-box.net.js",
          ],
        },
      },
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
    "copy:scripts.dev",
    "jshint:scripts.dev",
    "uglify:scripts.dev",
    "sftp-deploy:dest.dev",
  ]);
  grunt.registerTask("pro", [
    "compass:styles.pro",
    "csslint:styles.pro",
    "cssmin:styles.pro",
    "copy:scripts.pro",
    "jshint:scripts.pro",
    "uglify:scripts.pro",
    "sftp-deploy:dest.pro",
  ]);

};
