define(
  [ 'backbone',
    'collections/tuning' ],
  function( Backbone, Tuning ) {

    /*
      For a fret position p, scale length s, and fret number n:

        p = s - ( s / ( 2 ^ ( n / 12 ) ) )
     */
     function fretPositions( model ) {
      var constantSpacing = model.get( 'constantSpacing' ),
          scaleLength     = model.get( 'scaleLength' ),
          startFret       = model.get( 'startFret' ),
          endFret         = model.get( 'endFret' );

      var positions = [];
      var position;
      for ( var i = startFret; i <= endFret; i++ ) {
        if ( constantSpacing ) {
          positions.push( i * spacing );
        } else {
          position = scaleLength - ( scaleLength / Math.pow( 2, ( i / 12 ) ) );
          position = Math.round( position * 1e3 ) * 1e-3; // Three-digit precision.
          positions.push( position );
        }
      }

      return positions;
    }

    // Positions of notes along fretboard.
    function notePositions( model ) {
      var fretPositions = model.get( 'fretPositions' );

      var positions = [];
      var position;
      for ( var i = 0, n = fretPositions.length; i < n; i++ ) {
        position = 0.5 * ( fretPositions[i] + fretPositions[ i + 1 ] );
        position = Math.round( position * 1e3 ) * 1e-3;
        positions.push( position );
      }

      return positions;
    }

    var Fretboard = Backbone.Model.extend({
      defaults: function() {
        return {
          fretPositions: [],
          notePositions: [],

          fretCount: 12,

          backgroundColor: 'rgba( 250, 250, 250, 1.0 )',
          foregroundColor: 'rgba(  27,  27,  27, 1.0 )',

          xOffset: 50,
          yOffset: 125,

          scaleLength: 1200,
          constantSpacing: false,

          borderWidth: 3,

          startFret: 0,
          endFret: 12,
          fretWidth: 2,

          nutWidth: 5,

          stringSpacing: 30,
          stringWidth: 2,

          noteFont: '7pt Helvetica, Verdana',
          noteLineWidth: 2,
          noteRadius: 9,

          markerFill: 'rgba( 72, 72, 72, 1.0 )',
          markerFont: '7pt Helvetica, Verdana',
          markerRadius: 6
        };
      },

      initialize: function() {
        this.set( 'fretPositions', fretPositions( this ) );
        this.set( 'notePositions', notePositions( this ) );
      },

      get: function( attr ) {
        if ( typeof this[ attr ] === 'function' ) {
          return this[ attr ]();
        }

        return Backbone.Model.prototype.get.call(this, attr);
      },

      // Custom getters.
      length: function() {
        var fretPositions = this.get( 'fretPositions' );
        return fretPositions[ fretPositions.length - 1 ] - fretPositions[0];
      },

      xStart: function() {
        var fretPositions = this.get( 'fretPositions' );
        return fretPositions[0];
      }
    });

    return Fretboard;
  }
);
