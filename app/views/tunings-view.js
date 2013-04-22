define(
  [ 'underscore',
    'backbone',
    'text!templates/tunings-view.html' ],
  function( _, Backbone, tuningsTemplate ) {

    var TuningsView = Backbone.View.extend({
      template: _.template( tuningsTemplate ),

      events: {
        'change': 'selectTuning'
      },

      initialize: function() {
        _.bindAll( this, 'render' );
      },

      render: function() {
        this.$el.html( this.template({ tunings: this.collection.models }) );
      },

      selectTuning: function() {
        var index = this.$el.find( ':selected' ).val() || 0;
        this.options.fretboard.set( 'tuningIndex', index );

        // Change current selected tuning.
        this.options.tuningView.reset(
          this.collection.at( index ).get( 'tuning' )
        );
      }
    });

    return TuningsView;
  }
);
