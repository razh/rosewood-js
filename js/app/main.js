requirejs.config({
  shim: {
    'ember': {
      deps: [ 'jquery', 'handlebars' ],
      exports: 'Ember'
    }
  },

  paths: {
    'bootstrap': '../../lib/bootstrap/bootstrap.min',
    'ember': '../../lib/ember/ember-1.0.0-rc.2',
    'handlebars': '../../lib/handlebars/handlebars',
    'jquery': '../../lib/jquery/jquery-1.9.1.min'
  }
});

require(
  [ 'jquery',
    'ember' ],
  function( $, Ember ) {
    return Ember.Application.create();
  }
);
