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
            model = this.last();
            model.destroy();
            this.remove( model );
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
      }
    });

    return Tuning;
  }
);
