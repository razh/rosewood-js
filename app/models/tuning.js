define(
  [ 'backbone',
    'models/note' ],
  function( Backbone, Note ) {

    var Tuning = Backbone.Collection.extend({
      model: Note
    });

    return Tuning;
  }
);
