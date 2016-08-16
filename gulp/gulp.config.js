module.exports = {
    build_dir: 'build',
    url_path: '',
    compile_dir: '',
    app_files: {
        // Source but NO specs
        js: ['source/**/*.js', '!source/**/*.spec.js'],
        js_compile: [

        ],
        atpl: [
            'src/app/**/*.view.html'
        ]
    },
    test_files: {
        required: [
            'build/app/app.module.js',
            'build/app/app.config.js',
            'build/app/**/*.module.js',
            'build/app/**/*.config.js',
            'build/app/**/*.js'
        ],
        js: [
            'source/app/**/*.spec.js'
        ]
    }
}
