define(
  [ 'backbone',
    'models/note',
    'collections/tuning' ],
  function( Backbone, Note, Tuning ) {

    var Fretboard = Backbone.Model.extend({
      defaults: function() {
        return {
          fretPositions: [],
          notePositions: [],

          fretCount: 12,

          backgroundColor: 'rgba( 250, 250, 250, 1.0 )',
          foregroundColor: 'rgba(  27,  27,  27, 1.0 )',

          xOffset: 50,
          yOffset: 75,

          scaleLength: 1200,
          constantSpacing: false,

          borderWidth: 3,

          startFret: 0,
          endFret: 12,
          fretWidth: 2,

          nutWidth: 5,

          stringSpacing: 30,
          stringWidth: 2,

          // E above middle C.
          root: new Note({ note: Note.E, octave: 4 }),
          scaleIndex: 0,
          tuningIndex: 0,

          labelDistance: 15,
          labelFill: 'rgba( 72, 72, 72, 1.0 )',
          labelFont: 'bold 20pt Helvetica, Arial',
          labelLength: 4,

          markerFill: 'rgba( 72, 72, 72, 1.0 )',
          markerFont: '7pt Helvetica, Arial',
          markerRadius: 6,

          noteFont: '7pt Helvetica, Arial',
          noteLineWidth: 2,
          noteRadius: 12,
          noteFills: [],
          noteTextFills: []
        };
      },

      initialize: function() {
        this.set( 'fretPositions', fretPositions( this ) );
        this.set( 'notePositions', notePositions( this ) );
        this.set( 'noteFills', noteFills( this ) );
        this.set( 'noteTextFills', noteTextFills( this ) );

        // Trigger a change if the root is changed.
        this.listenTo( this.get( 'root' ), 'change', function() {
          this.trigger( 'change' );
        });
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
        return this.get( 'fretPositions' )[0];
      },

      scaleIndex: function() {
        return Backbone.Model.prototype.get.call( this, 'scaleIndex' ) || 0;
      },

      tuningIndex: function() {
        return Backbone.Model.prototype.get.call( this, 'tuningIndex' ) || 0;
      }
    });

    /*
      For a fret position p, scale length s, and fret number n:

        p = s - ( s / ( 2 ^ ( n / 12 ) ) )
     */
     function fretPositions( model ) {
      var constantSpacing = model.get( 'constantSpacing' ),
          scaleLength     = model.get( 'scaleLength' ),
          endFret         = model.get( 'endFret' );

      var positions = [];
      var position;
      for ( var i = 0; i <= endFret; i++ ) {
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
      positions.push(0);
      var position;
      for ( var i = 0, n = fretPositions.length; i < n; i++ ) {
        position = 0.5 * ( fretPositions[i] + fretPositions[ i + 1 ] );
        position = Math.round( position * 1e3 ) * 1e-3;
        positions.push( position );
      }

      return positions;
    }

    function noteFills( model ) {
      var backgroundColor = model.get( 'backgroundColor' ),
          foregroundColor = model.get( 'foregroundColor' );

      var fills = [];
      fills.push( foregroundColor );
      for ( var i = 0; i < 11; i++ ) {
        fills.push( backgroundColor );
      }

      return fills;
    }

    function noteTextFills( model ) {
      var backgroundColor = model.get( 'backgroundColor' ),
          foregroundColor = model.get( 'foregroundColor' );

      var fills = [];
      fills.push( backgroundColor );
      for ( var i = 0; i < 11; i++ ) {
        fills.push( foregroundColor );
      }

      return fills;
    }

    return Fretboard;
  }
);
