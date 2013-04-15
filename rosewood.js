var noteNames = [ "C", "C\u266F", "D", "D\u266F", "E", "F", "F\u266F", "G", "G\u266F", "A", "A\u266F", "B" ],
	regexNote = /(^[A-G])(\#|b)?(-?\d$)/; //Splits full note into note name, accidental, and octave.

// Guitar Pro doesn't do flats.
// \u266F is the Unicode representation of the musical # ( \u266D for b ). noteNames is only used for display purposes.


//Javascript is the most ghettoest widely-used language.
function isNote( note ) {
	return !!regexNote.exec( note );
}

//TODO: Does not check for values out of bounds. Although, this usually isn't necessary.
/*
 * Parses string input of notes.
 */
function getMidiValue( note ) {
	var midiNote = 0,
		noteArray = regexNote.exec( note );

	if ( !noteArray ) {
		return midiNote;
	}

	var noteName = noteArray[1],
		accidental = noteArray[2],
		octave = ~~noteArray[3]; // Faster than parseInt. Essentially a Math.floor.
														// See Extreme Javascript Performance by Thomas Fuchs.

	midiNote = $.inArray( noteName, noteNames );

	if ( accidental == "#" ) {
		midiNote++;
	}
	else if ( accidental == "b" ) {
		midiNote--;
	}

	if ( ( -1 > octave ) || ( octave > 9 ) ) {
		return midiNote;
	}

	midiNote += ( ( octave + 1 ) * 12 );
	return midiNote;
}

function transposeClone( note, halfSteps ) {
	return new Note( note.getMidiNote() + halfSteps );
}

//Full range of MIDI is from C-1 to G9 (0, 127). Middle C4 is defined as 60.
function Note( note, octave ) {

	//Guarantee new is always in use.
	if ( !( this instanceof arguments.callee ) ) {
		return new Note( note, octave );
	}

	var midiNote = 0;

	if ( octave ) {
		newMidiNote = toMidi( note, octave );
		if ( inMidiBounds( newMidiNote ) ) {
			midiNote = newMidiNote;
		}
	}
	else if ( inMidiBounds( note ) ) {
			midiNote = note;
	}

	// Utility functions.
	function toMidi( note, octave ) {
		return ( ( note % 12 ) + ( ( octave + 1 ) * 12 ) );
	}

	function inMidiBounds( note ) {
		return ( 0 <= note && note <= 127 );
	}

	this.getMidiNote = function() {
		return midiNote;
	};

	this.setMidiNote = function( newMidiNote ) {
		if ( inMidiBounds( newMidiNote ) ) {
			midiNote = newMidiNote;
		}
	};

	this.getNote = function() {
		return midiNote % 12;
	};

	this.setNote = function( newNote ) {
		newMidiNote = toMidi( newNote, this.getOctave() );
		this.setMidiNote( newMidiNote );
	};

	this.getNoteName = function() {
		return noteNames[ midiNote % 12 ];
	};

	this.getOctave = function() {
		return ( ( ( midiNote - ( midiNote % 12 ) ) / 12 ) - 1 );
	};

	this.setOctave = function( octave ) {
		newMidiNote = toMidi( midiNote, octave );
	this.setMidiNote( newMidiNote );
	};

	this.transpose = function( halfSteps ) {
		newMidiNote = midiNote + halfSteps;
		this.setMidiNote( newMidiNote );
	};

	this.scalePosition = function( scale ) {
		return $.inArray( this.getNote(), scale );
	};

	this.toString = function() {
		return ( this.getNoteName() + this.getOctave() );
	};
}


function Scale(root, scaleDegrees) {
	if ( root === 0 ) {
		return scaleDegrees;
	}
	var scale = [];
	for ( var i = 0; i < scaleDegrees.length; i++ ) {
		scale.push( ( root + scaleDegrees[i] ) % 12 );
	}
	return scale;
}

var twelfthRootOfTwo = 1.05946309;
var fretRatio = 17.817;

/*
 * For a fret distance d, scale length s, and fret number n:
 *
 *    d = s – ( s / ( 2 ^ ( n / 12 ) ) )
 *
 */
var constFretSpacing = false;
function calcFretDist( scaleLength, numFrets, fretSpacing ) {
	var fretDistArray = [];

	if ( constFretSpacing ) {
		for ( var i = 0; i <= numFrets; i++ ) {
			fretDistArray.push( i * fretSpacing );
		}
	}
	else {
		for ( var i = 0; i <= numFrets; i++ ) {
			fretDist = scaleLength - ( scaleLength / Math.pow( 2, ( i / 12 ) ) );
			fretDist = ( Math.round( fretDist * 1000 ) / 1000 ); // Three-digit precision is enough.
			fretDistArray.push( fretDist );
		}
	}
	return fretDistArray;
}

function calcNoteDist( fretDistArray ) {
	var noteDistArray = [];

	for ( var i = 0; i < fretDistArray.length; i++ ) {
		noteDist = 0.5 * ( fretDistArray[i] + fretDistArray[ i + 1 ] );
		noteDist = ( Math.round( noteDist * 1000 ) / 1000 ); // Three-digit precision is enough.
		noteDistArray.push( noteDist );
	}
	return noteDistArray;
}

// Outputs a Fretboard consisting of [ string ][ fret ][ stringDist ][ fretDist ][ Note] .
// All notes are outputted. Fretboard does not change unless tuning or other variables are changed.
function Fretboard( tuning, initFret, endFret, scaleLength, stringSpacing, fretSpacing ) {
    var numStrings = tuning.length,
		fretDistArray = calcFretDist( scaleLength, endFret, fretSpacing ),
		fretArray = [];

	for ( var i = 0; i < numStrings; i++ ) {
		fretArray[i] = [ ( endFret - initFret ) + 1 ];
		for ( var j = initFret; j <= endFret; j++ ) {
			fretArray[i][ j - initFret ] = [ ( i * stringSpacing ), ( fretDistArray[j] ), transposeClone( tuning[i], j ) ];
		}
	}
	return fretArray;
}
