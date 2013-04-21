define(
  [ 'jquery',
    'underscore',
    'backbone',
    'models/fretboard',
    'models/note' ],
  function( $, _, Backbone, Fretboard, Note ) {

    function drawStrings( ctx, model, tuning ) {
        var stringSpacing = model.get( 'stringSpacing' ),
            length        = model.get( 'fretboard' ).length - 1 * stringSpacing,
            xOffset       = model.get( 'xOffset' ),
            yOffset       = model.get( 'yOffset' );

        ctx.lineWidth = model.get( 'stringWidth' );
        // Start off at one because of nut.
        var y;
        for ( var i = 1, n = tuning.length; i < n; i++ ) {
          y = ( i * stringSpacing ) + yOffset;

          ctx.moveTo( xOffset,          y );
          ctx.lineTo( xOffset + length, y );
        }

        ctx.stroke();
    }

    function drawNut( ctx, model ) {
      var fretboard = model.get( 'fretboard' ),
          width     = fretboard[0][ fretboard[0].length - 1 ][0] - fretboard[0][0][0];
          nutWidth  = model.get( 'nutWidth' ),
          xOffset   = model.get( 'xOffset' ),
          yOffset   = model.get( 'yOffset' );

      ctx.lineWidth = nutWidth;
      ctx.lineCap = 'square';
      ctx.beginPath();

      ctx.moveTo( xOffset,         yOffset - nutWidth );
      ctx.lineTo( xOffset + width, yOffset - nutWidth );

      ctx.stroke();
      ctx.lineCap = 'butt';
    }

    function drawFrets( ctx, model, tuning ) {
      var fretPositions = model.get( 'fretPositions' ),
          stringSpacing = model.get( 'stringSpacing' ),
          stringCount   = tuning.length,
          width         = stringSpacing * stringCount,
          xOffset       = model.get( 'xOffset' ),
          yOffset       = model.get( 'yOffset' ),
          startFretX    = fretPositions[0];

      ctx.lineWidth = model.get( 'fretWidth' );

      var x;
      for ( var i = 1; i < fretPositions.length - 1; i++ ) {
        x = fretPositions[i] + xOffset - startFretX;

        ctx.moveTo( x, yOffset);
        ctx.lineTo( x, yOffset + width );
      }

      ctx.stroke();
    }

    function drawNotes( ctx, model, tuning ) {
      var PI2 = 2 * Math.PI,
          noteX, noteY,
          position,
          scaleDegree;

      var fretboard = model.get( 'fretboard' );

      ctx.lineWidth = noteStrokeWidth;
      ctx.font = model.get( 'noteFont' );
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      for ( var i = 0, n = fretboard.length; i < n; i++ ) {

        position = fretboard[i][0][2].scalePosition( scale );
        scaleDegree =  ( scale[ position ] + ( 12 - root ) ) % 12;

        if ( position > -1 ) {
          noteX = fretboard[i][0][1] + yOffset - yInitFret - nutWidth;
          noteY = canvas.height - (fretboard[i][0][0] + xOffset);

          // Draw note.
          ctx.fillStyle = noteFillArray[ scaleDegree ];

          ctx.beginPath();
          ctx.arc( noteX, noteY, noteRadius, 0, TWO_PI, true );
          ctx.fill();
          ctx.stroke();

          // Draw note name.
          ctx.fillStyle = noteFontFillArray[ scaleDegree ];
          ctx.fillText( fretboard[i][0][2].getNoteName(), noteX, noteY );
        }

        for ( var j = 1; j < fretboard[0].length; j++ ) {

          position = fretboard[i][j][2].scalePosition( scale );
          scaleDegree =  ( scale[ position ] + ( 12 - root ) ) % 12;

          if ( position > -1 ) {
            noteX = 0.5 * ( fretboard[i][ j - 1 ][1] + fretboard[i][j][1] ) + yOffset - yInitFret;
            noteY = canvas.height - ( fretboard[i][j][0] + xOffset );

            // Draw note.
            ctx.fillStyle = noteFillArray[ scaleDegree ];

            ctx.beginPath();
            ctx.arc( noteX, noteY, noteRadius, 0, TWO_PI, true );
            ctx.fill();
            ctx.stroke();

            // Draw note name.
            ctx.fillStyle = noteFontFillArray[ scaleDegree ];
            ctx.fillText( fretboard[i][j][2].getNoteName(), noteX, noteY );
          }
        }
      }
    }

    var FretboardView = Backbone.View.extend({

      initialize: function() {
        _.bindAll( this, 'render' );
      },

      render: function() {
        var model  = this.model,
            tuning = this.collection,
            ctx    = this.$el.get(0).getContext( '2d' );

        // drawNut( ctx, model );
        drawFrets( ctx, model, tuning );
        drawStrings( ctx, model, tuning );
      }
    });

    return FretboardView;
  }
);
