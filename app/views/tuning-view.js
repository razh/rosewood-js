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
        var that = this;
        // Reverse so that lowest string is at the bottom.
        _( this.noteViews ).each(function( noteView ) {
          that.$el.append( noteView.render().el );
        });

        return this;
      },

      add: function( note ) {
        // Add to front.
        this.noteViews.splice( 0, 0, new NoteView({
          model: note
        }));
      },

      addAll: function() {
        this.collection.each( this.add, this );
      },

      refresh: function() {
        this.clear();
        this.addAll();
        this.render();
      },

      clear: function() {
        while ( this.noteViews.length ) {
          this.pop();
        }
      },

      // Remove last element.
      pop: function() {
        this.noteViews.pop().remove();
      }
    });

    return TuningView;
  }
);
