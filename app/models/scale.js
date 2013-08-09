define([
  'backbone'
], function( Backbone ) {
  'use strict';

  var Scale = Backbone.Model.extend({
    defaults: function() {
      return {
        name: '',
        degrees: []
      };
    }
  });

  return Scale;
});
