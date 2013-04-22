define(
  [ 'underscore',
    'backbone',
    'views/note-view',
    'text!templates/tuning-view.html' ],
  function( _, Backbone, NoteView, tuningTemplate  ) {

    var TuningView = Backbone.View.extend({
      template: _.template( tuningTemplate ),

      initialize: function() {
        this.noteViews = [];
        _.bindAll( this,
          'render',
          'add'
        );

        this.listenTo( this.collection, 'all', this.render );
        this.collection.each( this.add );
      },

      render: function() {
        console.log( 'tuningView');
        var that = this;
        // Reverse so that lowest string is at the bottom.
        _( _.clone( this.noteViews ).reverse() ).each(function( noteView ) {
          that.$el.append( noteView.render().el );
        });

        return this;
      },

      add: function( note ) {
        this.noteViews.push(new NoteView({
          model: note
        }));
      }
      // },

      // clear: function() {
      //   for ( var i = this.noteViews.length - 1; i >= 0; i-- ) {
      //     this.noteViews[i].remove();
      //   }

      //   this.noteViews = [];
      //   this.collection.reset();
      // }
    });

    return TuningView;
  }
);
