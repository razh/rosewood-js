define(
  [ 'backbone',
    'collections/tuning' ],
  function( Backbone, Tuning ) {

    var Fretboard = Backbone.Model.extend({
      defaults: function() {
        return {
          fretboard: [],

          fretPositions: [],
          notePositions: [],

          backgroundColor: 'rgba( 250, 250, 250, 1.0 )',
          foregroundColor: 'rgba(  27,  27,  27, 1.0 )',

          xOffset: 125,
          yOffset:  50,

          scaleLength: 1200,

          startFret: 0,
          endFret: 12,
          fretWidth: 2,

          stringSpacing: 30,
          stringWidth: 2,

          noteFont: '7pt Helvetica, Verdana',
          noteLineWidth: 2,
          noteRadius: 9,

          markerFill: 'rgba( 72, 72, 72, 1.0 )',
          markerFont: '7pt Helvetica, Verdana',
          markerRadius: 6
        };
      }
    });

    return Fretboard;
  }
);
