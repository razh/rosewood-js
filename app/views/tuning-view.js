define(
  [ 'main',
    'ember',
    './note-view' ],
  function( App, Ember ) {

    App.TuningCollectionView = Ember.CollectionView.extend({
      createChildView: function( viewClass, attrs ) {
        viewClass = App.NoteView;
        return this._super( viewClass, attrs );
      }
    });
  }
);
