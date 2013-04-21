define(
  [ 'jquery',
    'underscore',
    'backbone',
    'collections/scales',
    'text!templates/scales-view.html' ],
  function( $, _, Backbone, Scales, scalesTemplate ) {

    var ScalesView = Backbone.View.extend({
      template: _.template( scalesTemplate ),

      render: function() {
        this.$el.html( this.template({ scales: this.collection.models }) );
      }
    });

    return ScalesView;
  }
);
