module.exports = function(grunt) {

  // NPMタスクをロードする
  grunt.loadNpmTasks('grunt-contrib-compass');

  // 設定を初期化する
  grunt.initConfig({

    // compass
    compass: {
      dev: {
        options: {
          environment: "development",
          bundleExec: true,
          sassDir: "src/styles",
          cssDir: "dest.dev/styles",
          outputStyle: "expanded"
        }
      },
      pro: {
        options: {
          environment: "production",
          bundleExec: true,
          sassDir: "src/styles",
          cssDir: "dest.pro/styles",
          outputStyle: "expanded"
        }
      }
    }

  });

};
