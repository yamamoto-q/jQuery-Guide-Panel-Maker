module.exports = function(grunt) {
    grunt.initConfig({
        uglify: {
            dist: {
                files: [
                {'dist/jquery.q_guide_panel_maker.min.js': 'dist/jquery.q_guide_panel_maker.js'}
                ]
            }
        },
        less:{
            develop: {
                options: {
                    compress: true
                },
                files: {
                    "dist/jquery.q_guide_panel_maker.min.css": "dist/jquery.q_guide_panel_maker.less"
                }
            }
        },
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks("grunt-contrib-less");
};