define(
  [ 'underscore',
    'backbone',
    'models/note',
    'text!templates/tunings-view.html' ],
  function( _, Backbone, Note, tuningsTemplate ) {

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
        var tuning = this.options.tuning;
        tuning.reset();
        _.each( this.collection.at( index ).get( 'tuning' ).models, function( note ) {
          tuning.add(new Note({
            note: note.get( 'note' ),
            octave: note.get( 'octave' )
          }));
        });
      }
    });

    return TuningsView;
  }
);
