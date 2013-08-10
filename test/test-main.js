// Add all specs to tests.
var tests = [];
for ( var file in window.__karma__.files ) {
  if ( /Spec\.js$/.test( file ) ) {
    tests.push( file );
  }
}

requirejs.config({
  baseUrl: '/base/app',

  shim: {
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: [ 'jquery', 'underscore' ],
      exports: 'Backbone'
    }
  },

  // Use un-minified files unlike main.js.
  paths: {
    'backbone': 'components/backbone/backbone',
    'jquery': 'components/jquery/jquery',
    'underscore': 'components/underscore/underscore',
    'text': 'components/requirejs-text/text'
  },

  // Load the test specs.
  deps: tests,

  callback: window.__karma__.start
});
