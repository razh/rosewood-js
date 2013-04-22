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
        TuningView    = require( 'views/tuning-view' );

    var tuning = new Tuning();
    tuning.add({ note: Note.E, octave: 2 });
    tuning.add({ note: Note.A, octave: 2 });
    tuning.add({ note: Note.D, octave: 3 });
    tuning.add({ note: Note.G, octave: 3 });
    tuning.add({ note: Note.B, octave: 3 });
    tuning.add({ note: Note.E, octave: 4 });

    var tuningView = new TuningView({
      el: '#tuning-view',
      collection: tuning
    });

    tuningView.render();

    var scales = new Scales();
    var fretboard = new Fretboard();

    var scalesView = new ScalesView({
      el: '#scales-view',
      collection: scales,
      fretboard: fretboard
    });

    var tunings = new Tunings();

    // When we have the tunings and the scales, we may render.
    $.when( tunings.fetch(), scales.fetch() )
     .then(function() {
        scalesView.render();

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
