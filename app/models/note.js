define(
  [ 'backbone' ],
  function( Backbone ) {

    var Note = Backbone.Model.extend({
      defaults: {
        note: 0,
        octave: 0
      },

      /**
       * Return note at given number of semitones away.
       */
      transpose: function( semitones ) {
        var note = this.get( 'note' );
        note = ( note + semitones ) % 12;
        if ( note < 0 ) {
          note += 12;
        }

        return note;
      },

      toString: function() {
        return Note.names[ this.get( 'note' ) ] +  this.get( 'octave' );
      }
    });

    Note.names = [ "C", "C\u266F", "D", "D\u266F", "E", "F", "F\u266F", "G", "G\u266F", "A", "A\u266F", "B" ];
    Note.regex = /(^[A-G])(\#|b)?(-?\d$)/; //Splits full note into note name, accidental, and octave.

    Note.C       =  0;
    Note.C_SHARP =  1;
    Note.D       =  2;
    Note.D_SHARP =  3;
    Note.E       =  4;
    Note.F       =  5;
    Note.F_SHARP =  6;
    Note.G       =  7;
    Note.G_SHARP =  8;
    Note.A       =  9;
    Note.A_SHARP = 10;
    Note.B       = 11;

    return Note;
  }
);
