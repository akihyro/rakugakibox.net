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
      "htaccess": {
        files: [
          {
            src: "src/.htaccess",
            dest: "dest.<%= rbox.env %>/.htaccess",
          },
        ],
      },
      "fonts": {
        files: [
          {
            expand: true,
            cwd: "bower_components/font-awesome/fonts",
            src: [
              "fontawesome-webfont.eot",
              "fontawesome-webfont.svg",
              "fontawesome-webfont.ttf",
              "fontawesome-webfont.woff",
            ],
            dest: "dest.<%= rbox.env %>/fonts",
          },
        ],
      },
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
            expand: true,
            cwd: "bower_components/jquery/dist",
            src: [
              "jquery.js",
              "jquery.min.js",
            ],
            dest: "dest.<%= rbox.env %>/scripts",
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
      "options": {
        keepSpecialComments: 0,
      },
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

    // デプロイ
    "sftp-deploy": {
      "dest": {
        auth: {
          host: "rakugaki-box.net",
          port: 22,
          authKey: "<%= rbox.env %>",
        },
        src: "dest.<%= rbox.env %>",
        dest: "/virtual/akihyrox/public_html/resource.blog<%= rbox.envPro ? '.pro2' : '.dev' %>.rakugaki-box.net",
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
  grunt.registerTask("default", "build");
  grunt.registerTask("gruntfile", [
    "jshint:gruntfile",
  ]);
  grunt.registerTask("build", [
    "htaccess",
    "fonts",
    "images",
    "styles",
    "scripts",
  ]);
  grunt.registerTask("htaccess", [
    "copy:htaccess",
  ]);
  grunt.registerTask("fonts", [
    "copy:fonts",
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
