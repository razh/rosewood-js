define(
  [ 'underscore',
    'backbone',
    'models/note',
    'collections/tuning',
    'models/tuning-model' ],
  function( _, Backbone, Note, Tuning, TuningModel ) {
    'use strict';

    var Tunings = Backbone.Collection.extend({
      model: TuningModel,
      url: 'app/json/tunings.json',

      set: function( models, options ) {
        if ( !_.isArray( models ) ) {
          models = models ? [ models ] : [];
        }

        var tuningModels = [],
            tuningModel, tuning, notes;
        _.each( models, function( model ) {
          // Parse notes of each tuning.
          notes = [];
          _.each( model.notes, function( noteString ) {
            notes.push( Note.fromString( noteString ) );
          });

          // Create a new tuning and populate it with current data.
          tuning = Backbone.Collection.prototype.set.call( new Tuning(), notes );

          tuningModel = {
            name: model.name,
            notes: notes,
            tuning: tuning
          };

          tuningModels.push( tuningModel );
        });

        return Backbone.Collection.prototype.set.call( this, tuningModels, options );
      }
    });

    return Tunings;
  }
);
