define(function() {

  function Note( note, octave ) {
    this.midiValue = 0;
  }

  Note.getMidiValue = function( note, octave ) {
  };

  Note.names = [ "C", "C\u266F", "D", "D\u266F", "E", "F", "F\u266F", "G", "G\u266F", "A", "A\u266F", "B" ];

  Note.C       =  0;
  Note.C_SHARP =  1;
  Note.D       =  2;
  Note.D_SHARP =  3;
  Note.E       =  4;
  Note.F       =  5;
  Note.F_SHARP =  6;
  Note.G       =  7;
  Note.G_SHARP =  8;
  Note.A       =  9;
  Note.A_SHARP = 10;
  Note.B       = 11;

  return note;
});
