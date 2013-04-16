define(
  [ 'main',
    'ember',
    './../models/note' ],
    function( App, Ember, Note ) {

      App.NoteField = Ember.Textfield.extend({
        valueBinding: 'App.'
      });
    }
);
