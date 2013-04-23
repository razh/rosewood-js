define(
  [ 'underscore',
    'backbone',
    'text!templates/tonic-view.html' ],
  function( _, Backbone, tonicTemplate ) {

    var TonicView = Backbone.View.extend({
      template: _.template( tonicTemplate ),

      initialize: function() {
        _.bindAll( this, 'render' );
      },

      render: function() {
        return this;
      }
    });

    return TonicView;
  }
);
