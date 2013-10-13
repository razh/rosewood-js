/*globals define, describe, beforeEach, it, expect*/
define(function( require ) {
  'use strict';

  describe( 'ScaleView', function() {

    var $ = require( 'jquery' );

    var ScaleView = require( 'views/scale-view' ),
        Scale     = require( 'models/scale' );

    var view;

    beforeEach(function() {
      view = new ScaleView({
        el: $( '<div></div>' ),
        model: new Scale()
      });
    });

    describe( 'Toggle buttons for scale degrees', function() {

      var toggle0, toggle1;

      beforeEach(function() {
        view.model.set({
          degrees: [ 0, 2, 4 ]
        });

        view.render();
        toggle0 = view.$( '[data-scale-degree=0]' );
        toggle1 = view.$( '[data-scale-degree=1]' );
      });

      it( 'adds a selected class to all degrees in its Scale model ', function() {
        expect( toggle0.hasClass( 'selected' ) ).toBe( true );
        expect( toggle1.hasClass( 'selected' ) ).toBe( false );
      });

      it( 'toggles a scale degree when the corresponding toggle button is clicked', function() {
        expect( toggle0.hasClass( 'selected' ) ).toBe( true );
        toggle0.click();
        expect( toggle0.hasClass( 'selected' ) ).toBe( false );
      });
    });

  });
});
