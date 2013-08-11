define(function( require ) {
  'use strict';

  describe( 'NoteView', function() {

    var $ = require( 'jquery' );

    var NoteView = require( 'views/note-view' ),
        Note     = require( 'models/note' );

    var view;

    beforeEach(function() {
      view = new NoteView({
        el: $( '<div></div>' ),
        model: new Note()
      });
    });

    it( 'increments note by a semitone with add()', function() {
      // Start off at C.
      expect( view.model.get( 'note' ) ).toBe( Note.C );

      view.add();
      expect( view.model.get( 'note' ) ).toBe( Note.C_SHARP );

      view.add();
      expect( view.model.get( 'note' ) ).toBe( Note.D );

      // Jump to B.
      view.model.set( 'note', Note.B );

      view.add();
      expect( view.model.get( 'note' ) ).toBe( Note.C );
      expect( view.model.get( 'octave' ) ).toBe(1);
    });

    it( 'decrements note by a semitone with subtract()', function() {
      view.model.set( 'octave', 3 );
      expect( view.model.get( 'note' ) ).toBe( Note.C );
      expect( view.model.get( 'octave' ) ).toBe(3);

      view.subtract();
      expect( view.model.get( 'note' ) ).toBe( Note.B );
      expect( view.model.get( 'octave' ) ).toBe(2);

      view.subtract();
      expect( view.model.get( 'note' ) ).toBe( Note.A_SHARP );
      expect( view.model.get( 'octave' ) ).toBe(2);
    });

    it( 'takes keyboard input', function() {
      view.render();
      view.$( '.note-input' ).val( 'G4' );

      expect( view.model.get( 'note' ) ).toBe( Note.C );
      expect( view.model.get( 'octave' ) ).toBe(0);

      // On Enter.
      view.inputNote({
        which: 13
      });

      expect( view.model.get( 'note' ) ).toBe( Note.G );
      expect( view.model.get( 'octave' ) ).toBe(4);
    });
  });
});
