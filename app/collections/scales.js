define([
  'backbone',
  'models/scale'
], function( Backbone, Scale ) {
  'use strict';

  var Scales = Backbone.Collection.extend({
    model: Scale,
    url: 'app/json/scales.json'
  });

  return Scales;
});
