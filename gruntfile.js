module.exports = function( grunt ) {

  // Load tasks & time
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  require('time-grunt')(grunt);
  grunt.loadNpmTasks('assemble');

  grunt.initConfig({

    remote: require( './config/remote.json' ),
    bowerrc: grunt.file.readJSON( './.bowerrc' ),

    assemble: {

      options: {
        flatten: true,
        layout: [ 'src/templates/layout.hbs' ],
        partials: [ 'src/templates/partials/*.hbs' ],
        data: 'src/data/*.yaml'
      },
      main: {
        src: [ 'src/templates/pages/*.hbs' ],
        dest: 'tmp/'
      }

    },

    htmlmin: {

      options: {
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
      },
      test: {
        src: 'tmp/index.html',
        dest: 'test/index.html'
      },
      prod: {
        src: 'tmp/index.html',
        dest: 'prod/index.html'
      }

    },

    clean: {
      test:  [ 'tmp', 'test' ],
      prod: [ 'tmp', 'prod' ]
    },

    copy: {
      test: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: [ '**/*.ico' ],
            dest: 'test/'
          }
        ]
      },
      prod: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: [ '**/*.ico' ],
            dest: 'prod/'
          }
        ]
      }
    },

    less: {
      options: {
        compress: true
      },
      test: {
        options: {
          sourceMap: true
        },
        src: [ 'src/less/main.less' ],
        dest: 'test/css/style.css'
      },
      prod: {
        src: [ 'src/less/main.less' ],
        dest: 'prod/css/style.css'
      }
    },

    uglify: {
      test: {
        src: 'src/bower_components/modernizr/modernizr.js',
        dest: 'test/js/modernizr.js'
      },
      prod: {
        src: '<%= bowerrc.directory %>/modernizr/modernizr.js',
        dest: 'prod/js/modernizr.js'
      }

    },

    imagemin: {

      test: {
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: 'src/',                   // Src matches are relative to this path
          src: ['img/**/*.{png,jpg,gif}'],   // Actual patterns to match
          dest: 'test/'                  // Destination path prefix
        }]
      },

      prod: {
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: 'src/',                   // Src matches are relative to this path
          src: [ 'img/**/*.{png,jpg,gif}'],   // Actual patterns to match
          dest: 'prod/'                  // Destination path prefix
        }]
      }

    },

    rsync: {
      options: {
        ssh: true,
        args: [ '--verbose' ],
        exclude: [ '.git', '.node_modules', '.gitignore' ],
        recursive: true,
        syncDestIgnoreExcl: true
      },
      server: {
        options: {
          src: 'prod/',
          dest: '<%= remote.dest %>',
          host: '<%= remote.host %>'
        }
      }
    }

  });

  grunt.registerTask( 'default', [ 'clean:test', 'assemble', 'htmlmin:test', 'imagemin:test', 'copy:test', 'uglify:test', 'less:test'] );
  grunt.registerTask( 'prod',    [ 'clean:prod', 'assemble', 'htmlmin:prod', 'imagemin:prod', 'copy:prod', 'uglify:prod', 'less:prod'] );
  grunt.registerTask( 'sync',    [ 'prod', 'rsync' ] );

}
