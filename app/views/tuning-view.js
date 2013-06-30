define(
  [ 'underscore',
    'backbone',
    'views/note-view' ],
  function( _, Backbone, NoteView  ) {
    'use strict';

    var TuningView = Backbone.View.extend({
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
        this.noteViews.forEach(function( noteView ) {
          that.$el.append( noteView.render().el );
        });

        return this;
      },

      add: function( note ) {
        // Add to front.
        this.noteViews.unshift(new NoteView({
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
