define(
  [ 'backbone' ],
  function( Backbone ) {

    var Scale = Backbone.Model.extend({
      defaults: function() {
        return {
          name: '',
          degrees: []
        };
      }
    });

    return Scale;
  }
);
