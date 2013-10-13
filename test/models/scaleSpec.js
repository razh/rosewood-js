/*globals define, describe, it, expect*/
define(function( require ) {
  'use strict';

  describe( 'Scale', function() {

    var Scale = require( 'models/scale' );

    it( 'has a name', function() {
      var scale = new Scale({
        name: 'test'
      });

      expect( scale.get( 'name' ) ).toBe( 'test' );
    });

    it( 'has an array of scale degrees', function() {
      var scale = new Scale({
        degrees: [ 0, 2, 4 ]
      });

      expect( scale.get( 'degrees' ) ).toEqual( [0, 2, 4] );
    });
  });
});
