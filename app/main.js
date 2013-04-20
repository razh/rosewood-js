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
    'models/tuning',
    'views/tuning-view' ],
  function( $, _, Backbone, Note, Tuning, TuningView ) {
    var Scale = Backbone.Model.extend({
      defaults: function() {
        return {
          degrees: []
        };
      }
    });

    var Scales = Backbone.Collection.extend({
      model: Scale
    });

    var Box = Backbone.Model.extend({
      defaults: {
        x: 0,
        y: 0,
        w: 1,
        h: 1,
        color: '#FF9000',
        lineWidth: 3
      }
    });

    var BoxSet = Backbone.Collection.extend({
      model: Box
    });

    var BoxView = Backbone.View.extend({
      render: function() {
        var model = this.model,
            ctx   = this.options.ctx;

        ctx.fillStyle = '#FF9000';
        ctx.globalAlpha = 0.1;
        ctx.fillRect( model.get( 'x' ),
                      model.get( 'y' ),
                      model.get( 'w' ),
                      model.get( 'h' ) );

        ctx.globalAlpha = 1;
        ctx.strokeStyle = model.get( 'color' );
        ctx.lineWidth = model.get( 'lineWidth' );
        ctx.strokeRect( model.get( 'x' ),
                        model.get( 'y' ),
                        model.get( 'w' ),
                        model.get( 'h' ) );
      }
    });

    var SetView = Backbone.View.extend({
      render: function() {
        var ctx = this.$el.get(0).getContext( '2d' );

        this.collection.each(function( model ) {
            var view = new BoxView({ ctx: ctx, model: model });
            view.render();
        });
      }
    });

    var c = new BoxSet();
    c.add({ x: 150, y: 150, w: 100, h: 100 });
    c.add({ x:  10, y:  10, w: 100, h: 100 });

    var v = new SetView({
        el: $( 'canvas' ),
        collection: c
    });
    v.render();

    var tuning = new Tuning();
    tuning.add({ note: Note.E, octave: 3 });
    tuning.add({ note: Note.A, octave: 3 });
    tuning.add({ note: Note.D, octave: 4 });
    tuning.add({ note: Note.G, octave: 4 });
    tuning.add({ note: Note.B, octave: 4 });
    tuning.add({ note: Note.E, octave: 5 });

    var view = new TuningView({
      el: '#tuning-view',
      collection: tuning
    });

    view.render();

    return {};
  }
);
