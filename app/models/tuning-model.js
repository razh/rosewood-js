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
          notes: [],
          tuning: new Tuning()
        };
      },

      // This model is changed if the underlying Tuning Collection is changed.
      initialize: function() {
        this.listenTo( this.get( 'tuning' ), 'change', function() {
          this.trigger( 'change' );
        });
      }
    });

    return TuningModel;
  }
);
