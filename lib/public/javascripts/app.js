'use strict';

require.config({
    baseUrl: '/javascripts/lib',
    paths: {
        // the left side is the module ID,
        // the right side is the path to
        // the jQuery file, relative to baseUrl.
        // Also, the path should NOT include
        // the '.js' file extension. This example
        // is using jQuery 1.9.0 located at
        // js/lib/jquery-1.9.0.js, relative to
        // the HTML page.
        jquery: 'jquery-2.1.4.min',
        jquery_tagsinput: 'jquery.tagsinput.min',
        jquery_snippet: 'jquery.snippet',
        bootstrap: 'bootstrap.min',
        moment: 'moment-with-locales.min',
        app: '../app'

    },
    'shim': {
        'jquery_tagsinput': { 'deps': ['jquery'], exports: 'tagsinput' },
        'jquery_snippet': { 'deps': ['jquery'] },
        'bootstrap': { 'deps': ['jquery'] }
    }
});
require(['app/check_submit']);
//# sourceMappingURL=app.js.map