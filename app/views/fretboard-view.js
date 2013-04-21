define(
  [ 'jquery',
    'underscore',
    'backbone',
    'models/fretboard',
    'models/note' ],
  function( $, _, Backbone, Fretboard, Note ) {

    var PI2 = 2 * Math.PI;

    function clear( ctx ) {
      ctx.clearRect( 0, 0, ctx.canvas.width, ctx.canvas.height );
    }

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

    var FretboardView = Backbone.View.extend({

      initialize: function() {
        _.bindAll( this, 'render' );
        this.model.bind( 'change', this.render );
        this.listenTo( this.collection, 'change', this.render );
      },

      render: function() {
        var model  = this.model,
            tuning = this.collection,
            scales = this.options.scales,
            ctx    = this.$el.get(0).getContext( '2d' );

        clear( ctx );

        ctx.strokeStyle = model.get( 'foregroundColor' );

        drawBorder( ctx, model, tuning );
        drawNut( ctx, model, tuning );
        drawFrets( ctx, model, tuning );
        drawStrings( ctx, model, tuning );
        drawNotes( ctx, model, tuning, this.options.root, scales.at( model.get( 'scaleIndex' ) ) );
      }
    });

    return FretboardView;
  }
);
