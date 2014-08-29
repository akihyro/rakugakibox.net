module.exports = function(grunt) {

  // タスクをロードする
  require('load-grunt-tasks')(grunt);

  // 設定を初期化する
  grunt.initConfig({

    // rakugaki-box.net
    "rbox": (function() {
      var rbox = { };
      rbox.env = grunt.option("env") == "pro" ? "pro" : "dev";
      rbox.envPro = rbox.env == "pro";
      rbox.envDev = rbox.env == "dev";
      return rbox;
    })(),

    // コピー
    "copy": {
      "images": {
        files: [
          {
            expand: true,
            cwd: "src/images",
            src: "*.png",
            dest: "dest.<%= rbox.env %>/images",
          },
        ],
      },
      "scripts": {
        files: [
          {
            src: "bower_components/jquery/dist/jquery.js",
            dest: "dest.<%= rbox.env %>/scripts/jquery.js",
          },
          {
            src: "bower_components/jquery/dist/jquery.min.js",
            dest: "dest.<%= rbox.env %>/scripts/jquery.min.js",
          },
          {
            src: "src/scripts/rakugaki-box.net.js",
            dest: "dest.<%= rbox.env %>/scripts/rakugaki-box.net.js",
          },
        ],
      },
    },

    // compass
    "compass": {
      "styles": {
        options: {
          environment: "<%= rbox.envPro ? 'production' : 'development' %>",
          bundleExec: true,
          sassDir: "src/styles",
          cssDir: "dest.<%= rbox.env %>/styles",
          outputStyle: "expanded",
        },
      },
    },

    // CSS検証
    "csslint": {
      "styles": {
        src: "dest.<%= rbox.env %>/styles/**/*.css",
      },
    },

    // CSS縮小化
    "cssmin": {
      "styles": {
        files: {
          "dest.<%= rbox.env %>/styles/rakugaki-box.net.min.css": [
            "dest.<%= rbox.env %>/styles/rakugaki-box.net.css",
          ],
        },
      },
    },

    // JS検証
    "jshint": {
      "options": {
        expr: true
      },
      "gruntfile": [
        "Gruntfile.js",
      ],
      "scripts": [
        "dest.<%= rbox.env %>/scripts/rakugaki-box.net.js",
      ],
    },

    // JS縮小化
    "uglify": {
      "options": {
        preserveComments: false,
      },
      "scripts": {
        files: {
          "dest.<%= rbox.env %>/scripts/rakugaki-box.net.min.js": [
            "dest.<%= rbox.env %>/scripts/jquery.min.js",
            "dest.<%= rbox.env %>/scripts/rakugaki-box.net.js",
          ],
        },
      },
    },

    // SFTPアップロード
    "sftp-deploy": {
      "dest": {
        auth: {
          host: "rakugaki-box.net",
          port: 22,
          authKey: "<%= rbox.env %>",
        },
        src: "dest.<%= rbox.env %>",
        dest: "/virtual/akihyrox/public_html/resource.blog<%= rbox.envPro ? '.pro2' : '.dev2' %>.rakugaki-box.net",
      },
    },

    // クリーン
    "clean": {
      "dest": [
        "dest.<%= rbox.env %>",
      ],
    },

  });

  // タスクを登録する
  grunt.registerTask("default", [
    "gruntfile",
    "images",
    "styles",
    "scripts",
    "deploy",
  ]);
  grunt.registerTask("gruntfile", [
    "jshint:gruntfile",
  ]);
  grunt.registerTask("images", [
    "copy:images",
  ]);
  grunt.registerTask("styles", [
    "compass:styles",
    "csslint:styles",
    "cssmin:styles",
  ]);
  grunt.registerTask("scripts", [
    "copy:scripts",
    "jshint:scripts",
    "uglify:scripts",
  ]);
  grunt.registerTask("deploy", [
    "sftp-deploy:dest",
  ]);

};
