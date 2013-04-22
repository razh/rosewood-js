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
        'click .note-button.add': 'add',
        'click .note-button.subtract': 'subtract'
      },

      initialize: function() {
        _.bindAll( this, 'render' );
        this.model.bind( 'change', this.render );
      },

      render: function() {
        this.$el.html( this.template({ note: this.model }) );
        return this;
      },

      add: function() {
        this.model.transposeSelf(1);
      },

      subtract: function() {
        this.model.transposeSelf(-1);
      }
    });

    return NoteView;
  }
);
