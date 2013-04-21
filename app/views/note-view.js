define(
  [ 'jquery',
    'underscore',
    'backbone',
    'models/note',
    'text!templates/note-view.html' ],
  function( $, _, Backbone, Note, noteTemplate ) {

    var NoteView = Backbone.View.extend({
      template: _.template( noteTemplate ),

      events: {
        'click .note.add': 'add',
        'click .note.subtract': 'subtract'
      },

      initialize: function() {
        _.bindAll( this, 'render' );
        this.model.bind( 'change', this.render );
      },

      render: function() {
        this.$el.html( this.template({ note: this.model }) );
      },

      add: function() {
        console.log( 'addNote' );
        this.model.set( 'note', this.model.get( 'note' ) + 1 );
      },

      subtract: function() {
        console.log( 'subtractNote' );
      }

    });

    return NoteView;
  }
);
