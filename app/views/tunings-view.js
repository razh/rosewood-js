define(
  [ 'underscore',
    'backbone',
    'models/note',
    'text!templates/tunings-view.html' ],
  function( _, Backbone, Note, tuningsTemplate ) {
    'use strict';

    var TuningsView = Backbone.View.extend({
      template: _.template( tuningsTemplate ),

      events: {
        'change': 'selectTuning'
      },

      initialize: function() {
        _.bindAll( this, 'render' );
      },

      render: function() {
        this.$el.html( this.template({ tunings: this.collection.models }) );
      },

      selectTuning: function() {
        var index = this.$el.find( ':selected' ).val();
        if ( typeof index === 'undefined' ) {
          return;
        }

        // Change current selected tuning.
        this.options.tuning.setTuning( this.collection.at( index ).get( 'tuning' ) );
        this.options.tuningView.refresh();
      }
    });

    return TuningsView;
  }
);
