define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/tonic-view.html'
], function( $, _, Backbone, tonicTemplate ) {
  'use strict';

  var TonicView = Backbone.View.extend({
    template: _.template( tonicTemplate ),

    events: {
      'click .note.toggle': 'toggleNote'
    },

    initialize: function() {
      _.bindAll( this, 'render' );
      this.listenTo( this.model, 'change', this.render );
    },

    render: function() {
      this.$el.html( this.template() )
              .find( 'div[data-note=' + this.model.get( 'note' ) + ']' )
              .addClass( 'selected' );

      return this;
    },

    toggleNote: function( event ) {
      event.preventDefault();

      var note = parseInt( $( event.currentTarget ).attr( 'data-note' ), 10 );
      this.model.set( 'note', note );
    }
  });

  return TonicView;
});
