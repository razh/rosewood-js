define(
  [ 'backbone',
    'models/note' ],
  function( Backbone, Note ) {

    var Tuning = Backbone.Collection.extend({
      model: Note,

      setTuning: function( tuning ) {
        var difference = tuning.length - this.length;
        var model;
        // Remove/add Note models to match number of notes in new tuning.
        if ( difference > 0 ) {
          while ( difference-- ) {
            this.add( new Note() );
          }
        } else if ( difference < 0 ) {
          while ( difference++ ) {
            this.first().destroy();
          }
        }

        // Set tuning to new tuning.
        var that = this;
        tuning.each(function( note, index ) {
          model = that.at( index );
          model.set({
            note: note.get( 'note' ),
            octave: note.get( 'octave' )
          });
        });
      },

      getNoteNames: function( separator ) {
        var notes = '';

        var that = this;
        this.each(function( note, index ) {
          notes += note.getNoteName();
          if ( separator && index < that.length - 1 ) {
            notes += separator;
          }
        });

        return notes;
      }
    });

    return Tuning;
  }
);
