define(
  [ 'main',
    'ember' ],
  function( App, Ember ) {

    App.FretboardController = Ember.Object.create({

      tuning: Ember.Object.create({
       note: new Note()
      })
    });
  }
);
