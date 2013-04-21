define(
    [ 'backbone',
      'models/scale' ],
    function( Backbone, Scale ) {

      var Scales = Backbone.Collection.extend({
        model: Scale
      });

      return Scales;
    }
);
