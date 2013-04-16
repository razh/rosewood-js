define(
  [ 'main',
    'ember' ],
  function( App, Ember ) {

    function drawNut( ctx ) {
      ctx.lineWidth = nutWidth;
      ctx.lineCap = "square";
      ctx.beginPath();

      ctx.moveTo( offset.x, offset.y - nutWidth );
      ctx.lineTo( width + offset.x, offset.y - nutWidth );

      ctx.stroke();
      ctx.lineCap = "butt";
    }

    App.CanvasView = Ember.View.extend({
      tagName: 'canvas',
      canvas: {},

      update: function() {
        var content = this.get( 'content' ),
            canvas  = this.get( 'canvas' ),
            ctx     = this.get( 'ctx' );
      }.observes( 'content.@each.value' )
    });
  }
);
