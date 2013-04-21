define(
  [ 'jquery',
    'underscore',
    'backbone',
    'collections/tuning',
    'views/note-view',
    'text!templates/tuning-view.html' ],
  function( $, _, Backbone, Tuning, NoteView, tuningTemplate  ) {

    var TuningView = Backbone.View.extend({
      template: _.template( tuningTemplate ),

      events: {
        'click .tuning.add': 'add',
        'click .tuning.subtract': 'subtract'
      },

      initialize: function() {
        this.noteViews = [];
        _.bindAll( this, 'render', 'add' );
        this.listenTo( this.collection, 'all', this.render );

        this.collection.each( this.add );
      },

      render: function() {
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
    });

    return TuningView;
  }
);
