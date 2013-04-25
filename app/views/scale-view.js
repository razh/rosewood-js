define(
  [ 'jquery',
    'underscore',
    'backbone',
    'text!templates/scale-view.html' ],
  function( $, _, Backbone, scaleTemplate ) {

    var ScaleView = Backbone.View.extend({
      template: _.template( scaleTemplate ),

      events: {
        'click .scale-degree': 'toggleScaleDegree'
      },

      initialize: function() {
        _.bindAll( this, 'render' );
        this.listenTo( this.model, 'change', this.render );
      },

      render: function() {
        // Render template and get its children.
        var children = this.$el.html( this.template() ).find( '.scale-degree' );

        var scaleDegrees = this.model.get( 'degrees' );
        children.each(function( index, child ) {
          var $child = $( child ),
              scaleDegree = parseInt( $child.attr( 'data-scale-degree' ), 10 );

          // Set selected only if the element's scale degree is in scaleDegrees.
          if ( _.indexOf( scaleDegrees, scaleDegree, true ) !== -1 ) {
            $child.addClass( 'selected' );
          } else {
            $child.removeClass( 'selected' );
          }
        });

        return this;
      },

      toggleScaleDegree: function( event ) {
        event.preventDefault();

        var scaleDegrees = this.model.get( 'degrees' );

        // Toggle element and get its assigned scale degree.
        var $target = $( event.currentTarget ).toggleClass( 'selected' ),
            scaleDegree = parseInt( $target.attr( 'data-scale-degree' ), 10 );

        var index;
        // If now selected, add to degrees array.
        if ( $target.hasClass( 'selected' ) ) {
          index = _.sortedIndex( scaleDegrees, scaleDegree );
          scaleDegrees.splice( index, 0, scaleDegree );
        } else {
          // Otherwise, remove from degrees array.
          index = _.indexOf( scaleDegrees, scaleDegree, true );
          if ( index !== -1 ) {
            scaleDegrees.splice( index, 1 );
          }
        }

        // Force update.
        this.model.trigger( 'change' );
      }
    });

    return ScaleView;
  }
);
