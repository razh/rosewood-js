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
        this.listenTo( this.model, 'change', this.render );
      },

      render: function() {
        // Render template and get its children.
        var children = this.$el.html( this.template() ).find( '.scale-degree-toggle' );

        var scaleDegrees = this.model.get( 'degrees' );
        children.each(function( child ) {
          var $child = $( child );
          $child.css( 'color', 'red' );
          console.log( $child.attr( 'data-scale-degree' ) );
          var scaleDegree = parseInt( $child.attr( 'data-scale-degree' ), 10 );
          console.log( scaleDegree );
          if ( _.indexOf( scaleDegrees, scaleDegree, true ) ) {
            $child.addClass( 'selected' );
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
