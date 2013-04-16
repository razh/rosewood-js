define(
  [ 'main',
    'ember' ],
  function( App, Ember ) {

    function drawStrings() {
        ctx.lineWidth = stringsWidth;

        for ( var i = 1; i < fretboard.length - 1; i++ ) {
          ctx.beginPath();

          ctx.moveTo( ( i * stringSpacing ) + offset.x, offset.y - yInitFret );
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

    App.FretboardView = Ember.View.extend({
      tagName: 'canvas',

      width: 640,
      height: 320,

      startFret: 0,
      endFret: 12,

      update: function() {
        var content = this.get( 'content' ),
            canvas  = this.get( 'canvas' ),
            ctx     = this.get( 'ctx' );
      }.observes( 'content.@each.value' ),

      didInsertElement: function() {

      }
    });
  }
);
