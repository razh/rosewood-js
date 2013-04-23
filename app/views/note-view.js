define(
  [ 'underscore',
    'backbone',
    'models/note',
    'text!templates/note-view.html' ],
  function( _, Backbone, Note, noteTemplate ) {

    var NoteView = Backbone.View.extend({
      template: _.template( noteTemplate ),

      events: {
        'keyup .note-input': 'inputNote',
        'click .note-button.add': 'add',
        'click .note-button.subtract': 'subtract'
      },

      initialize: function() {
        _.bindAll( this, 'render' );
        this.model.bind( 'change', this.render );
        this.previousValidValue = this.model.toString();
      },

      render: function() {
        this.$el.html( this.template({ note: this.model }) );
        return this;
      },

      inputNote: function( event ) {
        var $inputElement = this.$el.find( '.note-input' );
            value         = $inputElement.val();

        // Only validate input on Enter.
        if ( event.which === 13 ) {

          // Only update if the new value is a valid note.
          // We do this by testing against the regex and comparing the matched
          // substring.
          var matches = value.match( Note.regex );
          if ( matches && matches[0] === value ) {
            this.model.fromString( value );
            this.previousValidValue = value;
           } else {
            $inputElement.val( this.previousValidValue );
          }
        }
      },

      add: function() {
        this.model.transposeSelf(1);
      },

      subtract: function() {
        this.model.transposeSelf(-1);
      }
    });

    return NoteView;
  }
);
