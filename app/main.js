requirejs.config({
  shim: {
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: [ 'jquery', 'underscore' ],
      exports: 'Backbone'
    }
  },

  paths: {
    'backbone': 'lib/backbone/backbone-min',
    'bootstrap': 'lib/bootstrap/bootstrap.min',
    'jquery': 'lib/jquery/jquery-1.9.1.min',
    'underscore': 'lib/underscore/underscore-min'
  }
});

define(
  function( require ) {
    var $             = require( 'jquery' ),
        _             = require( 'underscore' ),
        Backbone      = require( 'backbone' ),
        Note          = require( 'models/note' ),
        Fretboard     = require( 'models/fretboard' ),
        Scale         = require( 'models/scale' ),
        Scales        = require( 'collections/scales' ),
        Tuning        = require( 'collections/tuning' ),
        Tunings       = require( 'collections/tunings' ),
        FretboardView = require( 'views/fretboard-view' ),
        NoteView      = require( 'views/note-view' ),
        ScalesView    = require( 'views/scales-view' ),
        TuningView    = require( 'views/tuning-view' ),
        TuningsView   = require( 'views/tunings-view' );

    var scales = new Scales();
    var tunings = new Tunings();
    var fretboard = new Fretboard();

    var scalesView = new ScalesView({
      el: '#scales-view',
      collection: scales,
      fretboard: fretboard // fretboard has a scaleIndex.
    });

    // When we have the tunings and the scales, we may render.
    $.when( scales.fetch(), tunings.fetch() )
     .then(function() {
        scalesView.render();

        var tuningView = new TuningView({
          el : '#tuning-view',
          model: tunings.at( fretboard.get( 'tuningIndex' ) )
        });

        tuningView.render();


        var tuningsView = new TuningsView({
          el: '#tunings-view',
          collection: tunings,
          fretboard: fretboard, // fretboard has a tuningIndex.
          tuningView: tuningView
        });

        tuningsView.render();


        var fretboardView = new FretboardView({
          el: '#fretboard-view',
          model: fretboard,
          collection: tunings,
          scales: scales
        });

        fretboardView.render();
      }
    );
  }
);
