define([
  'underscore',
  'backbone',
  'models/note',
  'text!templates/tunings-view.html'
], function( _, Backbone, Note, tuningsTemplate ) {
  'use strict';

  var TuningsView = Backbone.View.extend({
    template: _.template( tuningsTemplate ),

    events: {
      'change': 'selectTuning'
    },

    initialize: function( options ) {
      _.bindAll( this, 'render' );

      this.tuning     = options.tuning;
      this.tuningView = options.tuningView;
    },

    render: function() {
      this.$el.html( this.template({ tunings: this.collection.models }) );
      return this;
    },

    selectTuning: function() {
      var index = this.$( ':selected' ).val();
      if ( typeof index === 'undefined' ) {
        return;
      }

      // Change current selected tuning.
      this.tuning.setTuning( this.collection.at( index ).get( 'tuning' ) );
      this.tuningView.refresh();
    }
  });

  return TuningsView;
});
