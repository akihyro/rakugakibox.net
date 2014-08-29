module.exports = function(grunt) {

  // NPMタスクをロードする
  grunt.loadNpmTasks('grunt-contrib-compass');

  // 設定を初期化する
  grunt.initConfig({
    compass: {
      dist: {
        options: {
          bundleExec: true,
          sassDir: "styles.src",
          cssDir: "styles"
        }
      }
    }
  });

};
