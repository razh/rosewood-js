define(
    [ 'backbone',
      'models/tuning-model' ],
    function( Backbone, TuningModel ) {

      var Tunings = Backbone.Collection.extend({
        model: TuningModel,
        url: 'app/json/tunings.json'
      });

      return Tunings;
    }
);
