define(function( require ) {
  'use strict';

  describe( 'Fretboard', function() {

    var Fretboard = require( 'models/fretboard' ),
        Note      = require( 'models/note' );

    it( 'has a default tonic note', function() {
      var fretboard = new Fretboard();
      // E4.
      expect( fretboard.get( 'tonic' ).get( 'note' ) ).toBe( Note.E );
      expect( fretboard.get( 'tonic' ).get( 'octave' ) ).toBe(4);
    });
  });
});
