define(function( require ) {
  'use strict';

  describe( 'TuningView', function() {

    var $ = require( 'jquery' );

    var TuningView = require( 'views/tuning-view' ),
        Tuning     = require( 'collections/tuning' ),
        Note       = require( 'models/note' );

    var standardTuning = new Tuning([
      Note.fromString( 'E2' ),
      Note.fromString( 'A2' ),
      Note.fromString( 'D3' ),
      Note.fromString( 'G3' ),
      Note.fromString( 'B3' ),
      Note.fromString( 'E4' )
    ]);

    it( 'initializes with child NoteViews', function() {
      var tuningView = new TuningView({
        el: $( '<div></div>' ),
        collection: standardTuning
      });

      expect( tuningView.noteViews.length ).toBe(6);
      expect( tuningView.noteViews[0].model.toString() ).toBe( 'E4' );
      expect( tuningView.noteViews[1].model.toString() ).toBe( 'B3' );
      expect( tuningView.noteViews[2].model.toString() ).toBe( 'G3' );
      expect( tuningView.noteViews[3].model.toString() ).toBe( 'D3' );
      expect( tuningView.noteViews[4].model.toString() ).toBe( 'A2' );
      expect( tuningView.noteViews[5].model.toString() ).toBe( 'E2' );
    });

  });
});
