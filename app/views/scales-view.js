define(
  [ 'underscore',
    'backbone',
    'text!templates/scales-view.html' ],
  function( _, Backbone, scalesTemplate ) {

    var ScalesView = Backbone.View.extend({
      template: _.template( scalesTemplate ),

      events: {
        'change': 'selectScale'
      },

      initialize: function() {
        _.bindAll( this, 'render' );
      },

      render: function() {
        this.$el.html( this.template({ scales: this.collection.models }) );
      },

      selectScale: function() {
        var index = this.$el.find( ':selected' ).val();
        if ( typeof index === 'undefined' ) {
          return;
        }

        this.model.set( 'degrees', this.collection.at( index ).get( 'degrees' ) );
      }
    });

    return ScalesView;
  }
);
