requirejs.config({
  shim: {
    'ember': {
      deps: [ 'jquery', 'handlebars' ],
      exports: 'Ember'
    }
  },

  paths: {
    'jquery': '../../lib/jquery/jquery-1.9.1.min',
    'handlebars': '../../lib/handlebars/handlebars-1.0.rc.1.min',
    'ember': '../../lib/ember/ember-1.0.0-rc.2.min',
    'bootstrap': '../../lib/bootstrap/bootstrap.min'
  }
});

require(
  [ 'jquery',
    'ember' ],
  function( $, Ember ) {
    return Ember.Application.create();
  }
);
