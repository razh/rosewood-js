define(
  [ 'jquery',
    'underscore',
    'backbone',
    'models/fretboard',
    'models/note' ],
  function( $, _, Backbone, Fretboard, Note ) {

    var PI2 = 2 * Math.PI;

    var FretboardView = Backbone.View.extend({

      initialize: function() {
        _.bindAll( this, 'render', 'onKeyDown' );

        $( document ).bind( 'keydown', this.onKeyDown );

        this.listenTo( this.model, 'change', this.render );
        this.listenTo( this.collection, 'change', this.render );
      },

      render: function() {
        var model  = this.model,
            tuning = this.collection.at( model.get( 'tuningIndex' ) ).get( 'tuning' ),
            scales = this.options.scales,
            ctx    = this.$el.get(0).getContext( '2d' );
            console.log( model.get( 'tuningIndex' ) + ', ' + this.collection.length );
            console.log( this.collection.at( model.get( 'tuningIndex' ) ) ) ;
            console.log( tuning );

        ctx.fillStyle = model.get( 'backgroundColor' );
        ctx.fillRect( 0, 0, ctx.canvas.width, ctx.canvas.height );

        ctx.strokeStyle = model.get( 'foregroundColor' );

        _.each( [
          drawBorder,
          drawNut,
          drawFrets,
          drawStrings,
          drawLabels,
          drawMarkers
        ], function( fn ) {
          fn.call( this, ctx, model, tuning );
        });

        drawNotes( ctx, model, tuning, model.get( 'root' ).get( 'note' ), scales.at( model.get( 'scaleIndex' ) ) );
      },

      onKeyDown: function( event ) {
        var model = this.model;
        switch ( event.which ) {
          // [.
          case 219:
            model.get( 'root' ).set( 'note', model.get( 'root' ).transpose(-1) );
            break;

          // ].
          case 221:
            model.get( 'root' ).set( 'note', model.get( 'root' ).transpose(1) );
            break;
        }
      }
    });

    function drawBorder( ctx, model, tuning ) {
      var length        = model.get( 'length' ),

          stringSpacing = model.get( 'stringSpacing' ),
          stringCount   = tuning.length,
          width         = stringSpacing * ( stringCount - 1 ),

          xOffset       = model.get( 'xOffset' ),
          yOffset       = model.get( 'yOffset' );

      ctx.lineWidth = model.get( 'borderWidth' );
      // Switch length and width because of orientation.
      ctx.strokeRect( xOffset, yOffset, length, width );
    }

    function drawStrings( ctx, model, tuning ) {
        var stringSpacing = model.get( 'stringSpacing' ),
            length        = model.get( 'length' ),
            xOffset       = model.get( 'xOffset' ),
            yOffset       = model.get( 'yOffset' );

        ctx.lineWidth = model.get( 'stringWidth' );
        // Start off at one because of nut.
        var y;
        ctx.beginPath();
        for ( var i = 0, n = tuning.length; i < n; i++ ) {
          y = ( i * stringSpacing ) + yOffset;

          ctx.moveTo( xOffset,          y );
          ctx.lineTo( xOffset + length, y );
        }

        ctx.stroke();
    }

    function drawNut( ctx, model, tuning ) {
      var stringSpacing = model.get( 'stringSpacing' ),
          stringCount   = tuning.length,
          width         = stringSpacing * ( stringCount - 1 ),
          nutWidth      = model.get( 'nutWidth' ),
          xOffset       = model.get( 'xOffset' ),
          yOffset       = model.get( 'yOffset' );

      ctx.lineWidth = nutWidth;
      ctx.lineCap = 'square';
      ctx.beginPath();

      ctx.moveTo( xOffset - nutWidth, yOffset );
      ctx.lineTo( xOffset - nutWidth, yOffset + width );

      ctx.stroke();
      ctx.lineCap = 'butt';
    }

    function drawFrets( ctx, model, tuning ) {
      var fretPositions = model.get( 'fretPositions' ),

          stringSpacing = model.get( 'stringSpacing' ),
          stringCount   = tuning.length,
          width         = stringSpacing * ( stringCount - 1 ),

          xOffset       = model.get( 'xOffset' ),
          yOffset       = model.get( 'yOffset' ),
          endFret       = model.get( 'endFret' );

      ctx.lineWidth = model.get( 'fretWidth' );

      var x;
      for ( var i = 0; i < endFret; i++ ) {
        x = xOffset + fretPositions[i];

        ctx.moveTo( x, yOffset );
        ctx.lineTo( x, yOffset + width );
      }

      ctx.stroke();
    }

    function drawMarkers( ctx, model, tuning ) {
      var notePositions = model.get( 'notePositions' ),

          stringSpacing = model.get( 'stringSpacing' ),
          stringCount   = tuning.length,
          width         = stringSpacing * ( stringCount - 1 ),

          markerFill    = model.get( 'markerFill' ),
          markerRadius  = model.get( 'markerRadius' ),

          xOffset       = model.get( 'xOffset' ),
          yOffset       = model.get( 'yOffset' ),
          endFret       = model.get( 'endFret' );

      ctx.fillStyle = markerFill;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      var markerX, markerY;
      _.each( [ 3, 5, 7, 9, 12 ], function( fret ) {
        markerX = xOffset + notePositions[ fret ];

        // Two markers for the 12th fret.
        if ( fret === 12 ) {
          markerY = yOffset + 0.5 * stringSpacing;
        } else {
          markerY = yOffset + 0.5 * width;
        }

        // Draw marker.
        ctx.beginPath();
        ctx.arc( markerX, markerY, markerRadius, 0, PI2, true );
        ctx.fill();

        // Second (bottom) marker for 12th fret.
        if ( fret === 12 ) {
          markerY = yOffset + ( stringCount - 1.5 ) * stringSpacing;

          ctx.beginPath();
          ctx.arc( markerX, markerY, markerRadius, 0, PI2, true );
          ctx.fill();
        }
      });
    }

    function drawLabels( ctx, model, tuning ) {
      var notePositions = model.get( 'notePositions' ),

          stringSpacing = model.get( 'stringSpacing' ),
          stringCount   = tuning.length,
          width         = stringSpacing * ( stringCount - 1 ),

          labelDistance = model.get( 'labelDistance' ),
          labelLength   = model.get( 'labelLength' ),

          xOffset       = model.get( 'xOffset' ),
          yOffset       = model.get( 'yOffset' );

      var labelX, labelY,
          x0, y0,
          x1, y1,
          x2, y2;

      ctx.font = model.get( 'labelFont' );
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillStyle = model.get( 'labelFill' );

      labelY = yOffset - 2 * labelDistance;
      y0 = labelY + 0.8 * labelDistance;
      y1 = y0 - ( labelLength * Math.sqrt(3) );
      y2 = y1;

      _.each( [ 3, 5, 7, 9, 12 ], function( fret ) {
        labelX = xOffset + notePositions[ fret ];

        x0 = labelX;
        x1 = labelX - labelLength;
        x2 = labelX + labelLength;

        // Draw label triangles.
        ctx.beginPath();
        ctx.moveTo( x0, y0 );
        ctx.lineTo( x1, y1 );
        ctx.lineTo( x2, y2 );
        ctx.fill();

        // Draw label text.
        ctx.fillText( fret, labelX, labelY );
      });
    }

    function drawNotes( ctx, model, tuning, root, scale ) {
      var note,
          noteX, noteY,
          scaleDegree,
          scaleDegrees = scale.get( 'degrees' );

      var fretPositions = model.get( 'fretPositions' ),
          notePositions = model.get( 'notePositions' ),
          stringSpacing = model.get( 'stringSpacing' ),
          stringCount   = tuning.length,
          width         = stringSpacing * ( stringCount - 1 ),
          nutWidth      = model.get( 'nutWidth' ),

          xOffset       = model.get( 'xOffset' ),
          yOffset       = model.get( 'yOffset' ),
          startFret     = model.get( 'startFret' ),
          endFret       = model.get( 'endFret' ),

          noteRadius    = model.get( 'noteRadius' ),
          noteFills     = model.get( 'noteFills' ),
          noteTextFills = model.get( 'noteTextFills' );

      ctx.lineWidth    = model.get( 'noteLineWidth' );
      ctx.font         = model.get( 'noteFont' );
      ctx.textAlign    = 'center';
      ctx.textBaseline = 'middle';

      for ( var i = 0; i < stringCount; i++ ) {
        noteY = yOffset + width - ( i * stringSpacing );

        for ( var j = startFret; j <= endFret; j++ ) {
          note = tuning.at(i).transpose(j);
          // Add twelve to avoid negative notes.
          scaleDegree = ( note - root + 12 ) % 12;

          // Only render the note if it is in scale.
          if ( _.indexOf( scaleDegrees, scaleDegree, true ) === -1 ) {
            continue;
          }

          if ( j === 0 ) {
            noteX = xOffset - nutWidth;
          } else {
            noteX = xOffset + notePositions[j];
          }

          // Draw note.
          ctx.fillStyle = noteFills[ scaleDegree ];

          ctx.beginPath();
          ctx.arc( noteX, noteY, noteRadius, 0, PI2, true );
          ctx.fill();
          ctx.stroke();

          // Draw note name.
          ctx.fillStyle = noteTextFills[ scaleDegree ];
          ctx.fillText( Note.names[ note ], noteX, noteY );
        }
      }
    }

    return FretboardView;
  }
);
