define(
  [ 'jquery',
    'underscore',
    'backbone',
    'text!templates/scale-view.html' ],
  function( $, _, Backbone, scaleTemplate ) {

    var ScaleView = Backbone.View.extend({
      template: _.template( scaleTemplate ),

      events: {
        'click .scale-degree-toggle': 'toggleScaleDegree'
      },

      initialize: function() {
        _.bindAll( this, 'render' );
        this.listenTo( this.collection, 'all', this.render );
      },

      render: function() {
        // Render template and get its children.
        var children = this.$el.html( this.template() ).children();

        var scaleDegrees = this.collection.get( 'degrees' );
        children.each(function( child ) {
          var scaleDegree = parseInt( child.attr( 'scale-degree' ), 10 );
          if ( _.indexOf( scaleDegrees, scaleDegree, true ) ) {
            child.addClass( 'selected' );
          }
        });

        return this;
      },

      toggleScaleDegree: function( event ) {
        event.preventDefault();

        // If no class,
        if ( !$( event.currentTarget ).hasClass( 'selected' ) ) {

        }
      }
    });

    return ScaleView;
  }
);
