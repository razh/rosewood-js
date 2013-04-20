define(
  [ 'main',
    'underscore',
    'backbone' ],
  function( App, _, Backbone ) {

    App.Tuning = Backbone.Collection.extend({
      model: App.Note
    });

  }
);
