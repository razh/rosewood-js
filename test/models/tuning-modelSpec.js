define(function( require ) {
  'use strict';

  describe( 'TuningModel', function() {

    var TuningModel = require( 'models/tuning-model' ),
        Tuning      = require( 'collections/tuning' ),
        Note        = require( 'models/note' );

    var standardTuning = new Tuning([
      Note.fromString( 'E2' ),
      Note.fromString( 'A2' ),
      Note.fromString( 'D3' ),
      Note.fromString( 'G3' ),
      Note.fromString( 'B3' ),
      Note.fromString( 'E4' )
    ]);

    it( 'has a getNoteNames() method that returns a string with a given separator', function() {
      var tuningModel = new TuningModel({
        tuning: standardTuning
      });

      expect( tuningModel.getNoteNames() ).toBe( 'EADGBE' );
      expect( tuningModel.getNoteNames( ', ') ).toBe( 'E, A, D, G, B, E' );
    });
  });
});
