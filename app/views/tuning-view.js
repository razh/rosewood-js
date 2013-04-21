define(
  [ 'jquery',
    'underscore',
    'backbone',
    'collections/tuning',
    'text!templates/tuning-view.html' ],
  function( $, _, Backbone, Tuning, tuningTemplate  ) {

    var TuningView = Backbone.View.extend({
      template: _.template( tuningTemplate ),

      events: {
        'click .note.add': 'add',
        'click .note.subtract': 'subtract'
      },

      initialize: function() {
        _.bindAll( this, 'render' );
      },

      render: function() {
        // Reverse copy of Tuning model.
        this.$el.html( this.template({ notes: _.clone( this.collection.models ).reverse() }) );
      },

      add: function() {
        console.log( 'add' );
      },

      subtract: function() {
        console.log( 'subtract' );
      }
    });

    return TuningView;
  }
);
