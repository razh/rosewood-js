requirejs.config({
  paths: {
    'jquery': '../../lib/jquery/jquery-1.9.1.min',
    'ember': '../../lib/ember/ember-1.0.0-rc.2.min',
    'bootstrap': '../../lib/bootstrap/bootstrap.min'
  }
});

require(
  [ 'jquery',
    'ember' ],
  function( $, Ember ) {
  }
);
