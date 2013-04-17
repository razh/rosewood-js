requirejs.config({
  shim: {
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
    'backbone' ],
  function( $, _, Backbone ) {
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
  }
);
