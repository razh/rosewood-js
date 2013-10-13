/*globals define, describe, it, expect*/
define(function( require ) {
  'use strict';

  describe( 'note', function() {

    var Note = require( 'models/note' );

    it( 'can be initialized from strings such as "C#5" and "B8', function() {
      // Factory method for notes.
      var cSharp5 = Note.fromString( 'C#5' ),
          b6 = Note.fromString( 'B6' );

      expect( cSharp5.get( 'note' ) ).toBe( Note.C_SHARP );
      expect( cSharp5.get( 'octave' ) ).toBe(5);

      expect( b6.get( 'note' ) ).toBe( Note.B );
      expect( b6.get( 'octave' ) ).toBe(6);
    });

    it( 'has note names', function() {
      expect( Note.names[ Note.C       ] ).toBe( 'C'       );
      expect( Note.names[ Note.C_SHARP ] ).toBe( 'C\u266F' );
      expect( Note.names[ Note.D       ] ).toBe( 'D'       );
      expect( Note.names[ Note.D_SHARP ] ).toBe( 'D\u266F' );
      expect( Note.names[ Note.E       ] ).toBe( 'E'       );
      expect( Note.names[ Note.F       ] ).toBe( 'F'       );
      expect( Note.names[ Note.F_SHARP ] ).toBe( 'F\u266F' );
      expect( Note.names[ Note.G       ] ).toBe( 'G'       );
      expect( Note.names[ Note.G_SHARP ] ).toBe( 'G\u266F' );
      expect( Note.names[ Note.A       ] ).toBe( 'A'       );
      expect( Note.names[ Note.A_SHARP ] ).toBe( 'A\u266F' );
      expect( Note.names[ Note.B       ] ).toBe( 'B'       );

      expect( Note.fromString( 'A#5' ).getNoteName() ).toBe( 'A\u266F' );
    });

    it( 'has a toString() method which returns a note-name and octave string', function() {
      expect( Note.fromString( 'F#5' ).toString() ).toBe( 'F\u266F5' );
      expect( Note.fromString( 'C7' ).toString() ).toBe( 'C7' );
    });

    it( 'transposes', function() {
      var b5 = Note.fromString( 'B5' );
      expect( b5.transpose( 12 ) ).toBe( Note.B );
      expect( b5.transpose( -1 ) ).toBe( Note.A_SHARP );
      expect( b5.transpose( 1 ) ).toBe( Note.C );
    });

    it ( 'self-transposes', function() {
      var f4 = Note.fromString( 'F4' );

      f4.transposeSelf( -1 );
      expect( f4.get( 'note' ) ).toBe( Note.E );
      expect( f4.get( 'octave' ) ).toBe( 4 );

      f4.transposeSelf( -4 );
      expect( f4.get( 'note' ) ).toBe( Note.C );
      expect( f4.get( 'octave' ) ).toBe( 4 );

      f4.transposeSelf( -1 );
      expect( f4.get( 'note' ) ).toBe( Note.B );
      expect( f4.get( 'octave' ) ).toBe( 3 );
    });

    it( 'does not allow invalid note values', function() {
      var cb5 = Note.fromString( 'Cb5' );
      // A C flat is a B.
      expect( cb5.get( 'note' ) ).toBe( Note.B );
      expect( cb5.get( 'octave' ) ).toBe(5);

      var bSharp3 = Note.fromString( 'B#3' );
      // A B sharp is a C.
      expect( bSharp3.get( 'note' ) ).toBe( Note.C );
      expect( bSharp3.get( 'octave' ) ).toBe(3);
    });

    it( 'does not allow invalid octave values', function() {
      // The regex for notes only allows single digits.
      var a19 = Note.fromString( 'A19' );
      expect( a19.get( 'note' ) ).toBe( Note.C );
      expect( a19.get( 'octave' ) ).toBe(0);
    });
  });
});
