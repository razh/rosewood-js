define(
  [ 'jquery',
    'underscore',
    'backbone',
    'models/fretboard' ],
  function( $, _, Backbone, Fretboard ) {

    function drawStrings( ctx ) {
        ctx.lineWidth = this.get( 'stringWidth' );

        for ( var i = 1; i < fretboard.length - 1; i++ ) {
          ctx.beginPath();

          ctx.moveTo( ( i * stringSpacing ) + offset.x, offset.y - startFretY );
          ctx.lineTo( ( i * stringSpacing ) + offset.x, fretboardLength + offset.y );

          ctx.stroke();
        }
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

    function drawFrets( ctx ) {
      ctx.lineWidth = fretsWidth;

      for ( var i = 1; i < fretboard[0].length - 1; i++ ) {
        ctx.beginPath();

        ctx.moveTo( offset.x, fretboard[0][i][1] + offset.y - startFretY );
        ctx.lineTo( fretboardWidth + offset.x, fretboard[0][i][1] + offset.y - startFretY );

        ctx.stroke();
      }
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
          position = scaleLength - ( scaleLength / Nath.pow( 2, ( i / 12 ) ) );
          position = Math.round( position * 1e3 ) * 1e-3; // Three-digit precision.
          positions.push( position );
        }
      }

      return positions;
    }) ();


    var FretboardView = Backbone.View.extend({
      render: function() {
        var model = this.model,
            ctx   = this.$el.get(0).getContext( '2d' );
      }
    });

    return FretboardView;
  }
);
