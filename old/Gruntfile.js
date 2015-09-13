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
      rbox.domain = "resource.blog" + (rbox.stageIsPro ? "" : ".dev") + ".rakugaki-box.net";
      rbox.keys = grunt.file.readJSON(".keys.json");
      return rbox;
    })(),

    // コピー
    copy: {
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
        "duplicate-background-images": false,
        "fallback-colors": false,
        "floats": false,
        "font-sizes": false,
        "ids": false,
        "important": false,
        "qualified-headings": false,
        "regex-selectors": false,
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
    aws_s3: {
      options: {
        accessKeyId: "<%= rbox.keys.aws[rbox.stage].accessKeyId %>",
        secretAccessKey: "<%= rbox.keys.aws[rbox.stage].secretAccessKey %>",
        region: "ap-northeast-1",
        bucket: "<%= rbox.domain %>",
        displayChangesOnly: true,
        params: {
          StorageClass: "REDUCED_REDUNDANCY",
        },
      },
      dest: {
        files: [
          {
            action: "delete",
            differential: true,
            cwd: "dest.<%= rbox.stage %>",
            dest: "/",
          },
          {
            action: "upload",
            differential: true,
            cwd: "dest.<%= rbox.stage %>",
            src: [
              "**",
            ],
            expand: true,
            dest: "",
          },
        ],
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
    "fonts",
    "images",
    "styles",
    "scripts",
  ]);
  grunt.registerTask("gruntfile", [
    "jshint:gruntfile",
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
    "aws_s3:dest",
  ]);

};
