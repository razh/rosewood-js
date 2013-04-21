define(
  [ 'jquery',
    'underscore',
    'backbone',
    'models/fretboard' ],
  function( $, _, Backbone, Fretboard ) {

    function drawStrings( ctx, model, tuning ) {
        ctx.lineWidth = model.get( 'stringWidth' );

        var stringSpacing = model.get( 'stringSpacing' ),
            nutWidth = model.get( 'nutWidth' ),
            xOffset = model.get( 'xOffset' ),
            yOffset = model.get( 'yOffset' );

        // Start off at one because of nut.
        for ( var i = 1, n = tuning.length; i < n; i++ ) {
          ctx.moveTo(       yOffset, ( i * stringSpacing ) + xOffset );
          ctx.lineTo( 500 + yOffset, ( i * stringSpacing ) + xOffset );
        }

        ctx.stroke();
    }

    function drawNut( ctx ) {
      ctx.lineWidth = nutWidth;
      ctx.lineCap = "square";
      ctx.beginPath();

      ctx.moveTo( offset.x, offset.y - nutWidth );
      ctx.lineTo( width + offset.x, offset.y - nutWidth );

      ctx.stroke();
      ctx.lineCap = "butt";
    }

    function drawFrets( ctx, model ) {
      ctx.lineWidth = model.get( 'width' );

      // for ( var i = 1; i < fretboard[0].length - 1; i++ ) {
      //   ctx.beginPath();

      //   ctx.moveTo( offset.x, fretboard[0][i][1] + offset.y - startFretY );
      //   ctx.lineTo( fretboardWidth + offset.x, fretboard[0][i][1] + offset.y - startFretY );

      //   ctx.stroke();
      // }
    }

    var fretCount = 24;
    var spacing;
    var scaleLength = 1;

    /*
      For a fret position p, scale length s, and fret number n:

        p = s - ( s / ( 2 ^ ( n / 12 ) ) )
     */
    var fretPositions = (function() {
      var positions = [];
      var constant = false;

      var position;
      for ( var i = 0; i <= fretCount; i++ ) {
        if ( constant ) {
          positions.push( i * spacing );
        } else {
          position = scaleLength - ( scaleLength / Math.pow( 2, ( i / 12 ) ) );
          position = Math.round( position * 1e3 ) * 1e-3; // Three-digit precision.
          positions.push( position );
        }
      }

      return positions;
    }) ();

    // Positions of notes along fretboard.
    var notePositions = (function() {
      var positions = [];

      var position;
      for ( var i = 0, n = fretPositions.length; i < n; i++ ) {
        position = 0.5 * ( fretPositions[i] + fretPositions[ i + 1 ] );
        position = Math.round( position * 1e3 ) * 1e-3;
        positions.push( position );
      }

      return positions;
    }) ();

    var FretboardView = Backbone.View.extend({

      initialize: function() {
        _.bindAll( this, 'render' );
      },

      render: function() {
        var model  = this.model,
            tuning = this.collection,
            ctx    = this.$el.get(0).getContext( '2d' );

        drawFrets( ctx, model, tuning );
        drawStrings( ctx, model, tuning );
      }

    });

    return FretboardView;
  }
);
