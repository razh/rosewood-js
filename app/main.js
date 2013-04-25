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
        ScaleView     = require( 'views/scale-view' ),
        ScalesView    = require( 'views/scales-view' ),
        TonicView     = require( 'views/tonic-view' ),
        TuningView    = require( 'views/tuning-view' ),
        TuningsView   = require( 'views/tunings-view' );

    var scale     = new Scale(),
        scales    = new Scales(),
        tuning    = new Tuning(),
        tunings   = new Tunings(),
        fretboard = new Fretboard();

    var tonicView = new TonicView({
      el: '#tonic-view',
      model: fretboard.get( 'tonic' )
    });

    tonicView.render();

    // When we have the tunings and the scales, we may render.
    $.when( scales.fetch(), tunings.fetch() )
     .then(function() {
        var scaleView = new ScaleView({
          el: '#scale-view',
          model: scale
        });

        scale.set( 'degrees', scales.at(0).get( 'degrees' ) );

        var scalesView = new ScalesView({
          el: '#scales-view',
          model: scale,
          collection: scales
        });

        scalesView.render();


        tuning.setTuning( tunings.at(0).get( 'tuning' ) );

        var tuningView = new TuningView({
          el : '#tuning-view',
          collection: tuning
        });

        tuningView.render();


        var tuningsView = new TuningsView({
          el: '#tunings-view',
          tuning: tuning,
          collection: tunings,
          tuningView: tuningView
        });

        tuningsView.render();


        var fretboardView = new FretboardView({
          el: '#fretboard-view',
          model: fretboard,
          scale: scale,
          scales: scales,
          tuning: tuning
        });

        fretboardView.render();
      }
    );
  }
);
