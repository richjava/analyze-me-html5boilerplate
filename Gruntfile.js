/**
 * Task configuration file for Grunt.
 * 
 * Grunt Pagespeed. 
 * @see https://www.npmjs.com/package/grunt-pagespeed
 * @see https://github.com/addyosmani/psi
 * @see https://developers.google.com/speed/docs/insights/v2/getting-started
 * @see https://developers.google.com/speed/pagespeed/insights/
 * 
 * AnalyzeCSS. Grunt task that analyze your css with analyze-css and compare the 
 * results to a user-defined benchmark.
 * @see https://github.com/DeuxHuitHuit/grunt-analyze-css
 * @see https://github.com/macbre/analyze-css
 * @see http://www.testmycss.com/
 * 
 * CSSLint. Lint CSS files.
 * @see https://github.com/gruntjs/grunt-contrib-csslint
 * 
 * JSHint. Validate files with JSHint.
 * @see https://github.com/gruntjs/grunt-contrib-jshint
 * @see http://jslinterrors.com/
 * @see http://jslint.com/
 * 
 * HTMLHint. Validate html files with htmlhint.
 * @see https://github.com/yaniswang/grunt-htmlhint
 * @see https://github.com/yaniswang/HTMLHint/wiki/Rules
 * @see http://htmlhint.com/
 */
module.exports = function (grunt) {
    "use strict";
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
    grunt.initConfig({
        pagespeed: {
            options: {
                nokey: true,
                //replace with your base url
                url: "https://developers.google.com"
            },
            paths: {
                options: {
                    //replace with your paths
                    paths: ["/speed/docs/insights/v1/getting_started", "/speed/docs/about"],
                    locale: "en_GB",
                    strategy: "desktop",
                    threshold: 80 //minimum page speed score
                }
            }
        },
        analyzecss: {
            files: ['css/*.css'],
            options: {
                outputMetrics: 'error',
                outputDuplicateSelectors: true,
                analyzecss: {
                    // analyzecss specific options
                },
                thresholds: {
                    // using default thresholds values, @see https://github.com/DeuxHuitHuit/grunt-analyze-css/blob/master/tasks/analyze-css.js
                }
            }
        }, csslint: {
            options: {
                formatters: [
                    {id: 'junit-xml', dest: 'report/csslint/csslint-junit-xml-report.xml'},
                    {id: 'csslint-xml', dest: 'report/csslint/csslint-csslint-xml-report.xml'},
                    {id: 'lint-xml', dest: 'report/csslint/csslint-lint-xml-report.xml'},
                    {id: 'text', dest: 'report/csslint/csslint-text-report.xml'},
                    {id: 'compact', dest: 'report/csslint/csslint-compact-report.xml'},
                    {id: 'checkstyle-xml', dest: 'report/csslint/csslint-checkstyle-xml-report.xml'}
                ]
            },
            strict: {
                options: {
                    import: 2
                },
                src: ['css/*.css']
            }
        }, jshint: {
            files: ['Gruntfile.js', 'js/*.js'],
            target: ['report/jshint/jshint-report.js'],
            options: {
                reporter: require('jshint-stylish'),
                //******for printing an html report*******//
                //reporter: require('jshint-html-reporter'),
                //reporterOutput: 'report/jshint/jshint-report.html',
                //******end for printing an html report*******//
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        }, htmlhint: {
            build: {
                options: {
                    //using defaults, for more @see https://github.com/yaniswang/HTMLHint/wiki/Rules
                },
                src: ['index.html', '404.html']
            }
        }
    });
    grunt.registerTask('default', ['pagespeed', 'analyzecss', 'csslint', 'jshint', 'htmlhint']);
    //for Travis CI
    grunt.registerTask('test', ['pagespeed', 'analyzecss', 'csslint', 'jshint', 'htmlhint']);
};