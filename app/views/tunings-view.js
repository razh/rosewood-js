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
        // console.log( this.collection.at( index ).get( 'tuning' ).models );
        // this.options.tuningView.collection.set(
        //   this.collection.at( index ).get( 'tuning' ).models
        // );
        // this.options.tuningView.clear();
        this.options.tuningView.collection = this.collection.at( index ).get( 'tuning' );
        // var that = this;
        // _.each( this.collection.at( index ).get( 'tuning' ).models, function( note ) {
        //   console.log( note );
        //   that.options.tuningView.collection.add( note );
        // });
        // this.options.tuningView.render();
      }
    });

    return TuningsView;
  }
);
