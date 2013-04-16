define(
 [ 'main',
   'ember' ],
 function( App, Ember ) {

    App.ApplicationController = Ember.Controller.extend({
      // Temporary data.
      transient: Ember.Object.create({

      })
    });

 });
