define(
  [ 'jquery',
    'underscore',
    'backbone',
    'models/tuning',
    'text!templates/tuning-view.html' ],
  function( $, _, Backbone, Tuning, tuningTemplate  ) {

    var TuningView = Backbone.View.extend({
      template: _.template( tuningTemplate ),

      initialize: function() {
        _.bindAll( this, 'render' );
      },

      render: function() {
        console.log( this.el );
        console.log( this.collection.length );
        console.log( this.collection.models );

        this.$el.html( this.template({ notes: this.collection.models }) );
        console.log( this.$el );
        console.log( this.el );

      }
    });

    return TuningView;
  }
);
