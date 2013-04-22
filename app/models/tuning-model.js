define(
  [ 'backbone',
    'collections/tuning' ],
  function( Backbone, Tuning ) {

    // A model containing a Tuning object.
    // Allows us to create a Tunings Collection object.
    var TuningModel = Backbone.Model.extend({
      defaults: function() {
        return {
          name: '',
          tuning: new Tuning()
        };
      }
    });

    return TuningModel;
  }
);
