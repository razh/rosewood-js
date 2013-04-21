define(
  [ 'jquery',
    'underscore',
    'backbone',
    'collections/tuning',
    'text!templates/tuning-view.html' ],
  function( $, _, Backbone, Tuning, tuningTemplate  ) {

    var TuningView = Backbone.View.extend({
      template: _.template( tuningTemplate ),

      render: function() {
        this.$el.html( this.template({ notes: this.collection.models }) );
      }
    });

    return TuningView;
  }
);
