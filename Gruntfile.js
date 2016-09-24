// Gruntfile.js
module.exports = function(grunt) {

  grunt.initConfig({

    // configure nodemon
    nodemon: {
      dev: {
        script: 'server.js'
      }
    },
    wiredep: {
        task: {
          src: ['index.html']
      }
    },
    watch: {
      files: ['client/src/bower_components/*'],
      tasks: ['wiredep']
    }
  });

  // load nodemon
  grunt.loadNpmTasks('grunt-nodemon');


  // register the nodemon task when we run grunt
  grunt.registerTask('default', ['nodemon']);  
grunt.registerTask('changes', ['watch']);
};