define(
  [ 'underscore',
    'backbone',
    'text!templates/tonic-view.html' ],
  function( _, Backbone, tonicTemplate ) {

    var TonicView = Backbone.View.extend({
      template: _.template( tonicTemplate ),

      initialize: function() {
        _.bindAll( this, 'render' );
        this.model.bind( 'change', this.render );
      },

      render: function() {
        this.$el.html( this.template() );
        return this;
      }
    });

    return TonicView;
  }
);
