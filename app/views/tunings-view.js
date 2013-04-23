define(
  [ 'underscore',
    'backbone',
    'models/note',
    'text!templates/tunings-view.html' ],
  function( _, Backbone, Note, tuningsTemplate ) {

    var TuningsView = Backbone.View.extend({
      template: _.template( tuningsTemplate ),

      events: {
        'click': 'selectTuning'
      },

      initialize: function() {
        _.bindAll( this, 'render' );
      },

      render: function() {
        this.$el.html( this.template({ tunings: this.collection.models }) );
      },

      selectTuning: function() {
        var index = this.$el.find( ':selected' ).val();
        if ( typeof index === 'undefined' ) {
          return;
        }

        // Change current selected tuning.
        this.setTuning( this.collection.at( index ).get( 'tuning' ) );
      },

      setTuning: function( tuning ) {
        this.options.tuning.setTuning( tuning );

        // Update tuning view.
        var tuningView = this.options.tuningView;
        tuningView.clear();
        tuningView.addAll();
        tuningView.render();
      }
    });

    return TuningsView;
  }
);
