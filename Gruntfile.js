module.exports = function(grunt) {

  // NPMタスクをロードする
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-sftp-deploy');

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
    "cssmin:styles.dev",
    "sftp-deploy:dest.dev",
  ]);
  grunt.registerTask("pro", [
    "compass:styles.pro",
    "cssmin:styles.pro",
    "sftp-deploy:dest.pro",
  ]);

};
