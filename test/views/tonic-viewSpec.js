/*globals define, describe, beforeEach, it, expect*/
define(function( require ) {
  'use strict';

  describe( 'TonicView', function() {

    var $ = require( 'jquery' );

    var TonicView = require( 'views/tonic-view' ),
        Note      = require( 'models/note' );

    var tonicView;

    beforeEach(function() {
      tonicView = new TonicView({
        el: $( '<div></div>' )[0],
        model: Note.fromString( 'E4' )
      });

      tonicView.render();
    });

    it( 'creates twelve note toggles, corresponding to each note', function() {
      expect( tonicView.$( '.note.toggle' ).length ).toBe( 12 );
    });

    it( 'highlights the note toggle corresponding to the tonic note', function() {
      expect( tonicView.$( 'div[data-note=' + Note.E + ']' ).hasClass( 'selected' ) ).toBe( true );
      expect( tonicView.$( 'div[data-note=' + Note.C + ']' ).hasClass( 'selected' ) ).toBe( false );
    });

    it( 'changes the tonic note when a note toggle is clicked', function() {
      expect( tonicView.$( 'div[data-note=' + Note.G + ']' ).hasClass( 'selected' ) ).toBe( false );
      tonicView.$( 'div[data-note=' + Note.G + ']' ).click();
      expect( tonicView.$( 'div[data-note=' + Note.G + ']' ).hasClass( 'selected' ) ).toBe( true );
    });
  });

});
