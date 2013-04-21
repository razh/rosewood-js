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

require(
  [ 'jquery',
    'underscore',
    'backbone',
    'models/note',
    'models/fretboard',
    'models/scale',
    'collections/scales',
    'collections/tuning',
    'views/fretboard-view',
    'views/scales-view',
    'views/tuning-view' ],
  function( $, _, Backbone, Note, Fretboard, Scale, Scales, Tuning, FretboardView, ScalesView, TuningView, scalesJSON ) {

    var tuning = new Tuning();
    tuning.add({ note: Note.E, octave: 3 });
    tuning.add({ note: Note.A, octave: 3 });
    tuning.add({ note: Note.D, octave: 4 });
    tuning.add({ note: Note.G, octave: 4 });
    tuning.add({ note: Note.B, octave: 4 });
    tuning.add({ note: Note.E, octave: 5 });

    var tuningView = new TuningView({
      el: '#tuning-view',
      collection: tuning
    });

    tuningView.render();

    var scales = new Scales();

    var scalesView = new ScalesView({
      el: '#scales-view',
      collection: scales
    });

    scales.fetch({
      success: function() {
        scalesView.render();
      }
    });

    var fretboard = new Fretboard();
    var fretboardView = new FretboardView({
       el: '#fretboard-view',
       model: fretboard,
       collection: tuning
    });
    fretboardView.render();

    return {};
  }
);
