// This line creates a typescript execution environment within Node so we can run the Typescript files.
// It would be nice if protractor had built-in support for webpack ala karma.
require('ts-node').register({
    project: './tsconfig.e2e.json'
});

exports.config = {
    baseUrl: 'http://localhost:50023/build/',

    // grabbing all the defined e2e test files
    specs: [
      './e2e/**/**.e2e-spec.ts',
      './e2e/**/*.e2e-spec.ts'
    ],
    exclude: [],

    framework: 'jasmine2',

    allScriptsTimeout: 110000,

    jasmineNodeOpts: {
        showTiming: true,
        showColors: true,
        isVerbose: false,
        includeStackTrace: false,
        defaultTimeoutInterval: 400000
    },

    // Here we set protractor to direct connect to the Chrome browser instead of using the Java-based Selenium web server. This 
    // is to make initial testing with Protractor easy. However, for a more mature project where you may want your e2e testing suite
    // set up for a broader array of testing across multiple browsers, you'll want to configure protractor to use a Selenium instance.
    directConnect: true,

    capabilities: {
        'browserName': 'chrome',
        'chromeOptions': {
            'args': ['show-fps-counter=true']
        }
    },

    /**
     * Angular 2 configuration
     *
     * useAllAngular2AppRoots: tells Protractor to wait for any angular2 apps on the page instead of just the one matching
     * `rootEl`
     */
    useAllAngular2AppRoots: true
};