module.exports = function(grunt) {

  // タスクをロードする
  require("load-grunt-tasks")(grunt);

  // 設定を初期化する
  grunt.initConfig({

    // rakugaki-box.net
    rbox: (function() {
      var rbox = { };
      rbox.stage = grunt.option("stage") == "pro" ? "pro" : "dev";
      rbox.stageIsPro = rbox.stage == "pro";
      rbox.stageIsDev = rbox.stage == "dev";
      rbox.domain = "resource.blog" + (rbox.stageIsPro ? ".pro2" : ".dev") + ".rakugaki-box.net";
      return rbox;
    })(),

    // コピー
    copy: {
      htaccess: {
        files: [
          {
            src: "src/.htaccess",
            dest: "dest.<%= rbox.stage %>/.htaccess",
          },
        ],
      },
      fonts: {
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
            dest: "dest.<%= rbox.stage %>/fonts",
          },
        ],
      },
      images: {
        files: [
          {
            expand: true,
            cwd: "src/images",
            src: "*.png",
            dest: "dest.<%= rbox.stage %>/images",
          },
        ],
      },
      scripts: {
        files: [
          {
            expand: true,
            cwd: "bower_components/jquery/dist",
            src: [
              "jquery.js",
              "jquery.min.js",
            ],
            dest: "dest.<%= rbox.stage %>/scripts",
          },
          {
            src: "src/scripts/rakugaki-box.net.js",
            dest: "dest.<%= rbox.stage %>/scripts/rakugaki-box.net.js",
          },
        ],
      },
    },

    // compass
    compass: {
      styles: {
        options: {
          environment: "<%= rbox.stageIsPro ? 'production' : 'development' %>",
          bundleExec: true,
          sassDir: "src/styles",
          cssDir: "dest.<%= rbox.stage %>/styles",
          imagesDir: "dest.<%= rbox.stage %>/images",
          javascriptsDir: "dest.<%= rbox.stage %>/scripts",
          fontsDir: "dest.<%= rbox.stage %>/fonts",
          httpPath: "http://<%= rbox.domain %>",
          httpStylesheetsPath: "http://<%= rbox.domain %>/styles",
          httpImagesPath: "http://<%= rbox.domain %>/images",
          httpJavascriptsPath: "http://<%= rbox.domain %>/scripts",
          httpFontsPath: "http://<%= rbox.domain %>/fonts",
          outputStyle: "expanded",
        },
      },
    },

    // CSS検証
    csslint: {
      options: {
        "adjoining-classes": false,
        "box-model": false,
        "box-sizing": false,
        "fallback-colors": false,
        "floats": false,
        "font-sizes": false,
        "ids": false,
        "important": false,
        "qualified-headings": false,
        "shorthand": false,
        "unique-headings": false,
        "universal-selector": false,
        "zero-units": false,
      },
      styles: {
        src: "dest.<%= rbox.stage %>/styles/rakugaki-box.net.css",
      },
    },

    // CSS縮小化
    cssmin: {
      options: {
        keepSpecialComments: 0,
      },
      styles: {
        files: {
          "dest.<%= rbox.stage %>/styles/rakugaki-box.net.min.css": [
            "dest.<%= rbox.stage %>/styles/rakugaki-box.net.css",
          ],
        },
      },
    },

    // JS検証
    jshint: {
      options: {
        expr: true
      },
      gruntfile: [
        "Gruntfile.js",
      ],
      scripts: [
        "dest.<%= rbox.stage %>/scripts/rakugaki-box.net.js",
      ],
    },

    // JS縮小化
    uglify: {
      options: {
        preserveComments: false,
      },
      scripts: {
        files: {
          "dest.<%= rbox.stage %>/scripts/rakugaki-box.net.min.js": [
            "dest.<%= rbox.stage %>/scripts/jquery.min.js",
            "dest.<%= rbox.stage %>/scripts/rakugaki-box.net.js",
          ],
        },
      },
    },

    // デプロイ
    "sftp-deploy": {
      dest: {
        auth: {
          host: "rakugaki-box.net",
          port: 22,
          authKey: "<%= rbox.stage %>",
        },
        src: "dest.<%= rbox.stage %>",
        dest: "/virtual/akihyrox/public_html/<%= rbox.domain %>",
      },
    },

    // クリーン
    clean: {
      dest: [
        "dest.<%= rbox.stage %>",
      ],
    },

  });

  // タスクを登録する
  grunt.registerTask("default", "build");
  grunt.registerTask("build", [
    "gruntfile",
    "htaccess",
    "fonts",
    "images",
    "styles",
    "scripts",
  ]);
  grunt.registerTask("gruntfile", [
    "jshint:gruntfile",
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
