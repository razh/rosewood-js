var orientation = 0; // 0 = Vertical; 1 = Horizontal.

var E3 = new Note( getMidiValue( "E3" ) ),
	A3 = new Note( getMidiValue( "A3" ) ),
	D4 = new Note( getMidiValue( "D4" ) ),
	G4 = new Note( getMidiValue( "G4" ) ),
	B4 = new Note( getMidiValue( "B4" ) ),
	E5 = new Note( getMidiValue( "E5" ) ),

	stdTuning = [ E3, A3, D4, G4, B4, E5 ];

// var lftHanded_stdTuning = [ E5, B4, G4, D4, A3, E3 ];
// var stdTuning = lftHanded_stdTuning; // Doesn't fully work.

// var G5 = new Note(getMidiValue("G5"));
// var C4 = new Note(getMidiValue("C4"));
// var E4 = new Note(getMidiValue("E4"));
// var A5 = new Note(getMidiValue("A5"));
// var stdTuning = [ G5, C4, E4, A5 ];

var backgroundColor = "rgba( 250, 250, 250, 1.0 )",
	foregroundColor = "rgba( 27, 27, 27, 1.0 )",
	initFret = 0,
	endFret = 12,
	scaleLength = 1200,
	stringSpacing = 30,
	fretSpacing = 25,
	constFretSpacing = false,
	stdFretboard = new Fretboard( stdTuning, initFret, endFret, scaleLength, stringSpacing, fretSpacing ),
	fretboard = stdFretboard;
	xOffset = 125,
	yOffset = 50,

	isDrawn = {
		background: true,
		nut: true,
		borders: true,
		strings: true,
		frets: true,
		markers: true,
		labels: true,
		notes: true,
		notelabels: true,
		gradient: true
	},
	
	bFullscreen = false;

	bordersWidth = 3,
	stringsWidth = 2,
	fretsWidth = 2,
	nutWidth = 5,
	noteRadius = 9,
	noteStrokeWidth = 2,

	markerRadius = 6,
	markerFill = "rgba(72, 72, 72, 1.0 )",
	labelFont = "bold 20pt Helvetica, Arial";

var noteFillArray = [ foregroundColor,
					backgroundColor,
					backgroundColor,
					backgroundColor,
					backgroundColor,
					backgroundColor,
					backgroundColor,
					backgroundColor,
					backgroundColor,
					backgroundColor,
					backgroundColor,
					backgroundColor ];

var noteFontFillArray = [ backgroundColor,
					foregroundColor,
					foregroundColor,
					foregroundColor,
					foregroundColor,
					foregroundColor,
					foregroundColor,
					foregroundColor,
					foregroundColor,
					foregroundColor,
					foregroundColor,
					foregroundColor ];

var noteFont = "7pt Helvetica, Verdana",
	markerFont = "5pt Helvetica, Verdana";

var yInitFret = fretboard[0][0][1],
	fretboardLength = fretboard[0][ endFret - initFret ][1] - yInitFret,
	fretboardWidth = ( fretboard.length - 1 ) * stringSpacing;
	
var fullscreenPadding = 20;

var canvas = $( "#rosewood" )[0],
	ctx;

var lastMouseX = 0,
	lastMouseY = 0;

var mouseDown = false;

var zoom = 1.0;
var x = 0.0;
var y = 0.0;

var origWidth, origHeight;

var temp;

var root;

var majScale = [ 0, 2, 4, 5, 7, 9, 11 ];
var minScale = [ 0, 2, 3, 5, 7, 8, 10 ];
var majPentScale = [ 0, 2, 4, 7, 9 ];
var minPentScale = [ 0, 3, 5, 7, 10 ];
var bluesScale = [ 0, 3, 5, 6, 7, 10 ];
var chromaticScale = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ];

// TODO: Switch to full scale listing.
var scales = {
	maj: [ 0, 2, 4, 5, 7, 9, 11 ],
	min: [ 0, 2, 3, 5, 7, 8, 10 ],
	majPent: [ 0, 2, 4, 7, 9 ],
	minPent: [ 0, 3, 5, 7, 10 ],
	blues: [ 0, 3, 5, 6, 7, 10 ]
};
var GMajScale = new Scale( 7, scales.blues );
var GMajPentScale = new Scale( 7, majPentScale );
var CMajScale = new Scale( 0, majScale );
var AMinScale = new Scale( 9, minScale );
var scale = GMajScale,
	root = scale[0];

// var scale = CMajScale;
// var scale = AMinScale;
// var scale = new Scale( 9, bluesScale );

function init() {
	ctx = canvas.getContext( "2d" );	

	// jQuery's mousescroll event does not give us the scroll wheel data.
	if ( canvas.addEventListener ) {
		canvas.addEventListener( "DOMMouseScroll", canvasZoom, false );
		canvas.addEventListener( "mousewheel", canvasZoom, false );
	}
	else if ( canvas.attachEvent ) {
		canvas.attachEvent( "onmousewheel", canvasZoom );
	}

    $( canvas )
		.mousedown( onMouseDown )
		.mouseup( onMouseUp )
		.mouseout( onMouseUp )
		.mousemove( canvasPan );
	
    $( document ).keyup( keyFunctions );
	
	xOffset = ~~( 0.5 * ( canvas.width - fretboardWidth ) );
	yOffset = ~~( 0.5 * ( canvas.height - fretboardLength ) );
	
	if ( orientation === 1 ) {
		temp = canvas.width;
		canvas.width = canvas.height;
		canvas.height = temp;
	}
	
	origWidth = canvas.width;
	origHeight = canvas.height;

	draw();
}

function toggleOrientation() {
	orientation === 0 ? orientation = 1 : orientation = 0;
	
	temp = canvas.width;
	canvas.width = canvas.height;
	canvas.height = temp;
	
	// When toggling orientation, we want the fullscreen toggle to revert back to the correct orientation:
	// Horizontal fullscreen -> Horizontal normal size.
	// Vertical fullscreen -> Vertical normal size.
	temp = origWidth;
	origWidth = origHeight;
	origHeight = temp;

	// If it is already fullscreen and we rotate the canvas, it should remain within the window boundaries.
	if ( bFullscreen ) {
		canvas.width = window.innerWidth - fullscreenPadding;
		canvas.height = window.innerHeight - fullscreenPadding;
	}
	
	// Render in correct position.
	if ( orientation === 0 ) {
		xOffset = ~~( 0.5 * ( canvas.width - fretboardWidth ) );
		yOffset = ~~( 0.5 * ( canvas.height - fretboardLength ) );
	}
	else  {
		xOffset = ~~( 0.5 * ( canvas.height - fretboardWidth ) );
		yOffset = ~~( 0.5 * ( canvas.width - fretboardLength ) );
	}
	
	zoom = 1.0;
	
	draw();
}

function onMouseDown( e ) {
	e = e ? e : window.event;
	if ( e.button === 0 ) {
		mouseDown = true;
	}
//	zoomCanvas = true;
	lastMouseX = e.clientX;
	lastMouseY = e.clientY;
}

function onMouseUp() {
	mouseDown = false;
//	zoomCanvas = false;
}

function draw() {
	ctx.strokeStyle = foregroundColor;

	// There is a far more elegant solution for this.
	if ( isDrawn.background ) {
		drawBackground();
	}
	if ( isDrawn.nut ) {
		drawNut();
	}
	if ( isDrawn.borders ) {
		drawBorders();
	}
	if ( isDrawn.strings ) {
		drawStrings();
	}
	if ( isDrawn.frets ) {
		drawFrets();
	}
	if ( isDrawn.markers ) {
		drawMarkers();
	}
	if ( isDrawn.labels ) {
		drawLabels();
	}
	if ( isDrawn.notes ) {
		drawNotes();
	}
	if ( isDrawn.gradient ) {
		drawGradient();
	}
}

function testFPS( numFrames ) {
	var t0,	t1,
		iterations = numFrames;

	t0 = new Date().getTime();
	
	while ( iterations-- ) {
		resetZoom();
		draw();
	}

	t1 = new Date().getTime();
	alert( ( t1 - t0 ) / numFrames + " ms");
	alert( Math.round( 1000 / ( ( t1 - t0 ) / numFrames ) ) + " fps" );
}

function drawBackground() {
	ctx.save();
	ctx.setTransform( 1, 0, 0, 1, 0, 0 );

	ctx.fillStyle = backgroundColor;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	ctx.restore();
}

function drawGradient() {
	ctx.save();
	ctx.setTransform( 1, 0, 0, 1, 0, 0 );
	
	var vertLinGrad = ctx.createLinearGradient( 0, 0, 0, canvas.height );
	vertLinGrad.addColorStop( 0, "rgba( 200, 200, 200, 1.0 )" );
	vertLinGrad.addColorStop( 0.05, "rgba( 255, 255, 255, 0.0 )" );
	vertLinGrad.addColorStop( 0.85, "rgba( 255, 255, 255, 0.0 )" );
	vertLinGrad.addColorStop( 1, "rgba( 200, 200, 200, 1.0 )" );
	ctx.fillStyle = vertLinGrad;
	ctx.fillRect( 0, 0, canvas.width, canvas.height );
	
	var horzLinGrad = ctx.createLinearGradient( 0, 0, canvas.width, 0 );
	horzLinGrad.addColorStop( 0, "rgba( 200, 200, 200, 1.0 )" );
	horzLinGrad.addColorStop( 0.05, "rgba( 255, 255, 255, 0.0 )" );
	horzLinGrad.addColorStop( 0.95, "rgba( 255, 255, 255, 0.0 )" );
	horzLinGrad.addColorStop( 1, "rgba( 200, 200, 200, 1.0 )" );
	ctx.fillStyle = horzLinGrad;
	ctx.fillRect( 0, 0, canvas.width, canvas.height );
	
	ctx.restore();
}

function drawNut() {
	ctx.lineWidth = nutWidth;
	ctx.lineCap = "square";
	ctx.beginPath();
	
	if ( orientation === 0 ) {
		ctx.moveTo( xOffset, yOffset - nutWidth );
		ctx.lineTo( fretboardWidth + xOffset, yOffset - nutWidth );
	}
	else {
		ctx.moveTo( yOffset - nutWidth, xOffset );
		ctx.lineTo( yOffset - nutWidth, fretboardWidth + xOffset );
	}
	
	ctx.stroke();
	ctx.lineCap = "butt";
}

function drawBorders() {
    ctx.lineWidth = bordersWidth;
	
	if ( orientation === 0 ) {
		ctx.strokeRect( xOffset, yOffset - yInitFret, fretboardWidth, fretboardLength );
	}
	else {
		ctx.strokeRect( yOffset - yInitFret, xOffset, fretboardLength, fretboardWidth );
	}
}

function drawStrings() {
    ctx.lineWidth = stringsWidth;
	
    for ( var i = 1; i < fretboard.length - 1; i++ ) {
        ctx.beginPath();
		if ( orientation === 0 ) {
			ctx.moveTo( ( i * stringSpacing ) + xOffset, yOffset - yInitFret );
			ctx.lineTo( ( i * stringSpacing ) + xOffset, fretboardLength + yOffset );
		}
		else {
			ctx.moveTo( yOffset - yInitFret, ( i * stringSpacing ) + xOffset );
			ctx.lineTo( fretboardLength + yOffset, ( i * stringSpacing ) + xOffset );
		}
        ctx.stroke();
    }
}

function drawFrets() {
    ctx.lineWidth = fretsWidth;

    for ( var i = 1; i < fretboard[0].length - 1; i++ ) {
        ctx.beginPath();
		if ( orientation === 0 ) {
			ctx.moveTo( xOffset, fretboard[0][i][1] + yOffset - yInitFret );
			ctx.lineTo( fretboardWidth + xOffset, fretboard[0][i][1] + yOffset - yInitFret );
		}
		else {
			ctx.moveTo( fretboard[0][i][1] + yOffset - yInitFret, xOffset);
			ctx.lineTo( fretboard[0][i][1] + yOffset - yInitFret, fretboardWidth + xOffset );
		}
        ctx.stroke();
    }
}

//TODO: Draws the root key name.
function drawKey() {
	
}

// Although it is certainly possible for drawLabels to be integrated into 
// drawMarkers (this was case beforehand), keeping the function separate
// allows us to toggle them on and off in the UI. No significant performance
// problems arise. Easier to read.
function drawLabels() {
	var SQRT_3 = Math.sqrt(3),
		labelX, labelY,
		p0x, p1x, p2x, // Label triangles.
		p0y, p1y, p2y,
		fret,
		labelDist = 6.25,
		pLength = 4;

	if ( fretboard.length == 6 ) {
		var i = fretboard[0].length;

		ctx.font = labelFont;
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";

		while ( i-- ) {
			fret = ( i + initFret - 1 ) % 12;
			
			// Draw labels on 3rd, 5th, 7th, 9th, 12th frets.
			if ( fret === 2 || fret === 4 || fret === 6 || fret === 8 || fret == 11 ) {
				if ( orientation === 0 ) {
					labelX = labelDist * stringSpacing + xOffset;
					labelY = 0.5 * ( stdFretboard[0][ i - 1 ][1] + stdFretboard[0][i][1] )  + yOffset - yInitFret;	

					// Coordinates for an equilateral triangle.
					p0x = ( labelDist - 0.75 ) * stringSpacing + xOffset;
					p1x = p0x + ( pLength * SQRT_3 );
					p2x = p1x;
					
					p0y = labelY;
					p1y = labelY - pLength;
					p2y = labelY + pLength;					
				}
				else {
					labelX =  0.5 * ( fretboard[0][ i - 1 ][1] + fretboard[0][i][1] )  + yOffset - yInitFret;
					labelY = canvas.height - ( labelDist * stringSpacing + xOffset );

					// Coordinates for an equilateral triangle.
					p0x = labelX;
					p1x = labelX - pLength;
					p2x = labelX + pLength;
					
					p0y = canvas.height - ( ( labelDist - 0.75 ) * stringSpacing + xOffset);
					p1y = p0y - ( pLength * SQRT_3 );
					p2y = p1y;
				}

				// Draw the label triangles.
				ctx.beginPath();
				ctx.moveTo( p0x, p0y );
				ctx.lineTo( p1x, p1y );
				ctx.lineTo( p2x, p2y );
				ctx.fill();
	
				// Draw the label.
				ctx.fillText( ( fret + 1 ), labelX, labelY );
			}
		}
	}
}


function drawMarkers() {
	var TWO_PI = Math.PI * 2,
		markerX, markerY,
		fret;
	
	// Guitar fretboard markers are at frets 3, 5, 7, 9,  12 (2 dots). Pattern repeats.
	if ( fretboard.length == 6 ) {
		
		var i = fretboard[0].length;
		
		ctx.font = markerFont;
		ctx.fillStyle = markerFill;
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";

		while ( i-- ) {
			fret = ( i + initFret - 1 ) % 12;
			
			ctx.fillStyle = markerFill;

			if ( fret === 2 || fret === 4 || fret === 6 || fret === 8 || fret == 11 ) {
				if ( orientation === 0 ) {
					markerX = 2.5 * stringSpacing + xOffset;
					markerY = 0.5 * ( fretboard[0][ i - 1 ][1] + fretboard[0][i][1] )  + yOffset - yInitFret;
					
					if ( fret === 11 ) {
						markerX = 0.5 * stringSpacing + xOffset;
					}
				}
				else {
					markerX = 0.5 * ( fretboard[0][ i - 1 ][1] + fretboard[0][i][1] )  + yOffset - yInitFret;
					markerY = 2.5 * stringSpacing + xOffset;
					
					if ( fret === 11 ) {
						markerY = 0.5 * stringSpacing + xOffset;
					}
				}

				// Draw the fretboard markers.
				ctx.beginPath();
				ctx.arc( markerX, markerY, markerRadius, 0, TWO_PI, true );
				ctx.fill();

				// Draw second fretboard marker at 12th fret.
				if ( fret === 11 ) {
					if ( orientation === 0 ) {
						markerX = 4.5 * stringSpacing + xOffset;
					}
					else {
						markerY = 4.5 * stringSpacing + xOffset;
					}
					ctx.beginPath();
					ctx.arc( markerX, markerY, markerRadius, 0, TWO_PI, true );
					ctx.fill();
				}
			
				// Draw fret label on markers.
				if ( fret !== 11 ) {
					ctx.fillStyle = backgroundColor;
					ctx.fillText( ( fret + 1 ), markerX, markerY );
				}
			}
		}
	}
}

function drawNotes() {
    var TWO_PI = Math.PI * 2,
		noteX, noteY,
		position,
		scaleDegree;
	
	ctx.lineWidth = noteStrokeWidth;
	ctx.font = noteFont;
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";

    for ( var i = 0; i < fretboard.length; i++ ) {
		
		position = fretboard[i][0][2].scalePosition( scale );
		scaleDegree =  ( scale[ position ] + ( 12 - root ) ) % 12;
		
		if ( position > -1 ) {
			if ( orientation === 0 ) {
				noteX = fretboard[i][0][0] + xOffset;
				noteY = fretboard[i][0][1] + yOffset - yInitFret - nutWidth;
			}
			else {
				noteX = fretboard[i][0][1] + yOffset - yInitFret - nutWidth;
				noteY = canvas.height - (fretboard[i][0][0] + xOffset);
			}

			// Draw note.
			ctx.fillStyle = noteFillArray[ scaleDegree ];

			ctx.beginPath();
			ctx.arc( noteX, noteY, noteRadius, 0, TWO_PI, true );
			ctx.fill();
			ctx.stroke();

			// Draw note name.
			if ( isDrawn.notelabels ) {
				ctx.fillStyle = noteFontFillArray[ scaleDegree ];
				ctx.fillText( fretboard[i][0][2].getNoteName(), noteX, noteY );
			}
        }

		for ( var j = 1; j < fretboard[0].length; j++ ) {

			position = fretboard[i][j][2].scalePosition( scale );
			scaleDegree =  ( scale[ position ] + ( 12 - root ) ) % 12;
			
			if ( position > -1 ) {
				if ( orientation === 0 ) {
					noteX = fretboard[i][j][0] + xOffset;
					noteY = 0.5 * ( fretboard[i][ j - 1 ][1] + fretboard[i][j][1] )  + yOffset - yInitFret;
				}
				else {
					noteX = 0.5 * ( fretboard[i][ j - 1 ][1] + fretboard[i][j][1] ) + yOffset - yInitFret;
					noteY = canvas.height - ( fretboard[i][j][0] + xOffset );
				}

				// Draw note.
				ctx.fillStyle = noteFillArray[ scaleDegree ];
				
				ctx.beginPath();
				ctx.arc( noteX, noteY, noteRadius, 0, TWO_PI, true );
				ctx.fill();
				ctx.stroke();

				// Draw note name.
				if ( isDrawn.notelabels ) {
					ctx.fillStyle = noteFontFillArray[ scaleDegree ];
					ctx.fillText( fretboard[i][j][2].getNoteName(), noteX, noteY );
				}
            }
        }
    }
}

/*
 * The functions canvasZoom and cancelEvent have been modified from the examples in the following tutorial:
 * http://www.switchonthecode.com/tutorials/javascript-tutorial-the-scroll-wheel
 * 
 * Behavior for the canvasZoom function (assume origin is at fretboard center):
 * 1. Translate the fretboard's center to the origin point.
 * 2. Apply the transform using given wheel data.
 * 3. Translate back to original fretboard center coordinates. 
 */
function canvasZoom( e ){
    e = e ? e : window.event;
	
	// Compensate for differences between browser scroll reporting.
	var wheelData = e.detail ? e.detail * -1 : e.wheelDelta / 40,
		// speedFactor = 10;
		// zoomScale = Math.abs( wheelData ) / speedFactor + 1; // If wheelData is 3, zoom will be 1.3. Note that +/-3 should be the standard value for wheelData.
		zoomScale = 1.2; 
		
	if ( wheelData < 0 ) {
		zoomScale = 1 / zoomScale; // Zooming scale is inverted; n scrolls in + n scrolls out = default image.
	}
	
	zoom = zoom * zoomScale;

	ctx.save();
	clearCanvas();
	ctx.restore();

	if ( orientation === 0 ) {
		ctx.translate( ( xOffset + ( 0.5 * fretboardWidth ) ), ( yOffset + ( 0.5 * fretboardLength ) ) );
		ctx.scale( zoomScale, zoomScale );
		ctx.translate( -( xOffset + ( 0.5 * fretboardWidth ) ), -( yOffset + ( 0.5 * fretboardLength ) ) );
	}
	else {
		ctx.translate( ( yOffset + ( 0.5 * fretboardLength ) ), ( xOffset + ( 0.5 * fretboardWidth ) ) );
		ctx.scale( zoomScale, zoomScale ) ;
		ctx.translate( -( yOffset + ( 0.5 * fretboardLength ) ), -( xOffset + ( 0.5 * fretboardWidth ) ) );
	}
	
	draw();

	return cancelEvent( e );
}

/*
	This verision of canvasZoom creates three zoom levels (all values are for orientation of 0):
	1.  Entire fretboard shown. ( fretboardLength + yOffset ) / canvas.height
	2. Subsection shown.
	3, Fits the fretboard width to the corresponding canvas metric. fretboardWidth / canvas.width
	
	Marker labels and fret labels are shown according to zoom levels.
	We will only be able to pan along the major axis.
*/
function canvasZoom2ElectricBoogaloo( e ) {
	var zoom;
	
	if ( orientation === 0 ) {
		zoom = {
			0 : ( fretboardLength + ( 2 * yOffset ) ) / canvas.height,
			1 : ( fretboardWidth + ( 2 * xOffset ) ) / canvas.width,
			2 : ( fretboardWidth + ( 5 * noteRadius ) ) / canvas.width
		};
		
		
		
		
		
	}
	else {
		
	}
}
function keyFunctions ( e ) {
	e = e ? e : window.event;

	switch ( e.keyCode ) {
		case 32: // Spacebar.
			spacebarReset( e );
			break;
		case 70: // F
			toggleFullscreen( e );
			break;
		case 79: // O
			toggleOrientation();
			break;
		case 71: // G TEMP.
			alert(zoom);
			break;
		case 72: // H TEMP.
			testFPS( 20 );
			break;
		case 78: // N
			isDrawn.notelabels = !isDrawn.notelabels;
			draw();
			break;
		case 219: // [
			transposeKey( e );
			break;
		case 221: // ]
			transposeKey( e );
			break;
	}
}
/*
 * Resets zoom if spacebar is hit.
 * TODO: Replace with jQuery function.
 */

function spacebarReset( e  ) {
	e = e ? e : window.event;
	if ( e.keyCode === 32 ) {
		resetZoom();
		return cancelEvent( e );
	}
}

function toggleFullscreen( e ) {
	e = e ? e : window.event;
	
	if ( e.keyCode === 70 ) {
		if ( bFullscreen ) {
			canvas.width = origWidth;
			canvas.height = origHeight;
			bFullscreen = false;
		}
		else {
			canvas.width = window.innerWidth - fullscreenPadding;
			canvas.height = window.innerHeight - fullscreenPadding;
			bFullscreen = true;
		}
	}
	
	// Set fullscreen.
	if ( orientation === 0 ) {
		xOffset = ~~( 0.5 * ( canvas.width - fretboardWidth ) );
		yOffset = ~~( 0.5 * ( canvas.height - fretboardLength ) );
	}
	else  {
		xOffset = ~~( 0.5 * ( canvas.height - fretboardWidth ) );
		yOffset = ~~( 0.5 * ( canvas.width - fretboardLength ) );
	}

	resetZoom();
}

function transposeKey( e ) {
	e = e ? e : window.event;

	var i = scale.length;
	
	if ( e.keyCode === 219 ) {
		while( i-- ) {
			// Apparently, JavaScript's naive modulo function does not like handling negative numbers.
			if ( ( scale[i] - 1 ) === -1 ) {
				scale[i] = 12;
			}	
			scale[i] = ( scale[i] - 1 ) % 12;
		}
	}
	else if ( e.keyCode === 221 ) {
		while( i-- ) {
			scale[i] = ( scale[i] + 1 ) % 12;
		}
	}

	root = scale[0];
	
	draw();
}

function clearCanvas() {
	ctx.setTransform( 1, 0, 0, 1, 0, 0 );
	ctx.clearRect( 0, 0, canvas.width, canvas.height );
}

function resetZoom() {
	zoom = 1.0;
	clearCanvas();
	draw();
}

function cancelEvent( e ) {
	e = e ? e : window.event;
	if ( e.stopPropagation ) {
		e.stopPropagation();
	}
	if ( e.preventDefault ) {
		e.preventDefault();
	}
	e.cancelBubble = true;
	e.cancel = true;
	e.returnValue = false;
	return false;
}

function canvasPan( e ) {
	if ( mouseDown == true ) {
		e = e ? e : window.event;
		
		var currMouseX = e.clientX,
			currMouseY = e.clientY,
			dX = currMouseX - lastMouseX
			dY = currMouseY - lastMouseY;
		
		ctx.save();
		clearCanvas();
		ctx.restore();

		if ( e.shiftKey === true ) {
			if ( orientation === 0  ) {
				ctx.transform( 1, 0, 0, 1, 0, dY / zoom);
			}
			else { 
				ctx.transform( 1, 0, 0, 1, dX / zoom, 0);
			}
		}
		else {
			ctx.transform( 1, 0, 0, 1, dX / zoom, dY / zoom );
		}
		
		lastMouseX = currMouseX;
		lastMouseY = currMouseY;
		draw();
	}
}

function alertCanvas( e ) {
	e = e ? e : window.event;
	testFPS( 50 );
	cancelEvent( e );
}

function canvasRotate( rad ){
	ctx.save();
	clearCanvas();
	ctx.restore();
	ctx.translate( ( xOffset + ( 0.5 * fretboardWidth ) ), ( yOffset + ( 0.5 * fretboardLength ) ) );
	ctx.rotate( rad );
	ctx.translate( -( xOffset + ( 0.5 * fretboardWidth ) ), -( yOffset + ( 0.5 * fretboardLength) ) );
	draw();
}

// TODO: Canvas2image implementation.
