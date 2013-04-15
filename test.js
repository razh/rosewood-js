/*
 * Testing functions.
 */
//console.time("test");

// log/asset/addMethod - By John Resig (MIT Licensed)
function assert(pass, msg){
    var type = pass ? "PASS" : "FAIL";
    document.write("<li class='" + type + "'><b>" + type + "</b> " + msg + "</li>");
//    $("#results").append("<li class='" + type + "'><b>" + type + "</b> " + msg + "</li>");
}

function log(){
    var msg = "";
    for (var i = 0; i < arguments.length; i++) {
        msg += " " + arguments[i];
    }
    document.write("<li class='LOG'><b>LOG</b> " + msg + "</li>");
//	$("results").append("<li class='LOG'><b>LOG</b> " + msg + "</li>");
}

function addMethod(object, name, fn){
    var old = object[name];
    if (old) 
        object[name] = function(){
            if (fn.length == arguments.length) 
                return fn.apply(this, arguments);
            else 
                if (typeof old == 'function') 
                    return old.apply(this, arguments);
        };
    else 
        object[name] = fn;
}

function clone(obj){
    if (obj == null || typeof(obj) != 'object') 
        return obj;
    var temp = new obj.constructor(); // changed (twice)
    for (var key in obj) 
        temp[key] = clone(obj[key]);
    return temp;
}

document.write("V. 02<p>")
document.write("Test results:");

var dx = 5;
var x = 2;
x += dx;
assert(x == 7, "Basic math test. Hello world.");

var matrixA = new Array(5, 1, 2, 5, 3, 4);
var matrixB = new Array(2, 4, 5, 5, 4, 6);
var matrixC = new Array(18, 22, 35, 30, 35, 38);
//alert(multiplyMatrix(matrixA, matrixB));
//alert(matrixC);
//assert(toString(multiplyMatrix(matrixA, matrixB)) == toString(matrixC), "Matrix multiplication works.")
//assert(matrixC == "18,22,35,30,35,38", "Matrix mult. result verified.");
//
//var matrix180 = multiplyMatrix(new Array(1, 0, 0, 1, 0, 0), rotateMatrix((Math.PI * 1.5)));
////alert(matrix180);

var note = Note(0, 4);
var note2 = new Note(1, 5);
var note3 = new Note(60);
assert(note == "C4", "Ignores lack of new keyword. Initializes Note object with note and octave. toString functions correctly.");
assert(note2 == "C\u266F5", "Initializes Note object with note and octave.");
assert(note3 == "C4", "Initializes Note object with midi note.");
note2.setOctave(3);
assert(note2 == "C\u266F3", "setOctave functions correctly.");

note2.setOctave(-1);
assert(note2 == "C\u266F-1", "setOctave with value of -1 functions correctly. (in bounds).");
note.setOctave(9);
assert(note == "C9", "setOctave with a value of 9 functions correctly (in bounds).");
note.setOctave(10);
assert(note2 == "C\u266F-1", "setOctave with a value of 10 functions correctly (out of bounds doesn't do anything).");
note2.setOctave(-2);
assert(note2 == "C\u266F-1", "setOctave with a value of -2 functions correctly (out of bounds doesn't do anything).");

var note4 = Note(8, 9);
assert(note4 == "C-1", "Note/Octave initialization does not go above bounds.");

note3.transpose(4);
assert(note3 == "E4", "Transpose functions works.");
var noteNOTEXIST = new Note(128);
assert(noteNOTEXIST == "C-1", "Out of bounds midi notes initializes to C-1.");

note4.setMidiNote(60);
assert(note4 == "C4", "setMidiNote works.");

note4.setNote(2);
assert(note4 == "D4", "setNote works.");

// DEPRECATED FROM SOURCE. THERE IS NO NEED FOR A WEAKTRANSPOSE.
// note4.weakTranspose(2);
// assert(note4 == "E4", "weakTranspose works.");
// note4.weakTranspose(-14);
// assert(note4 == "D3", "weakTranspose backwards works.");
// noteNOTEXIST.weakTranspose(1202);
// assert(noteNOTEXIST == "D99", "weakTranspose has no morals and will transpose like a mad man.");

var note5 = transposeClone(note3, -4);
assert(note5 == "C4", "transposeClone clones.");
assert(note3 == "E4", "transposeClone does not copy.");

var majScale = [0, 2, 4, 5, 7, 9, 11];
var majPentScale = [0, 2, 4, 7, 9];
var CMajScale = new Scale(0, majScale);
assert(note5.scalePosition(CMajScale) === 0, "scalePosition for in-scale notes works.");
assert(note2.scalePosition(CMajScale) === -1, "scalePosition for out-of-scale notes works.");
assert(isNote("F5") == true, "Regex test 1/12.");
assert(isNote("A#10") == false, "Regex test 2/12.");
assert(isNote("C-1") == true, "Regex test 3/12.");
assert(isNote("CAA-1") == false, "Regex test 4/12.");
assert(isNote("a-1") == false, "Regex test 5/12.");
assert(isNote("2318275408") == false, "Regex test 6/12.");
assert(isNote("H5") == false, "Regex test 7/12.");
assert(isNote("C4") == true, "Regex test 8/12.");
assert(isNote("FABULOUS") == false, "Regex test 9/12.");
assert(isNote("C9") == true, "Regex test 10/12.");
assert(isNote("C#2") == true, "Regex test 11/12.");
assert(isNote("Gb4") == true, "Regex test 11/12.");

assert(getMidiValue("C4") == 60, "getMidiValue generic works.");
assert(getMidiValue("D-1") == 2, "getMidiValue valid negative octave works.");
assert(getMidiValue("Db5") == 73, "getMidiValue accidental sharp works.");
assert(getMidiValue("B#5") == 84, "getMidiValue accidental flat works.");
assert(getMidiValue("Z12") == 0, "getMidiValue out of bounds octave works.");
assert(getMidiValue("Z#1") == 0, "getMidiValue out of bounds octave accidental works.");
assert(getMidiValue("G-3") == 7, "getMidiValue lower bounds octave works.");

/*
 * Testing which version of transposeClone works faster. Verdict? Both are the same speed.
 * We will use the simpler version for ease of reading.
 */
//function transposeClone2(note, halfSteps){
//    var midiNote = note.getMidiNote();
//    midiNote += halfSteps;
//    var newNote = new Note(midiNote);
//    return newNote;
//	
//var note6 = new Note(60);
//var tTransposeClone1 = new Date().getTime()
//for (var i = 0; i < 10000; i++)
//{
//	var j = i % 12;
//	var note6temp = transposeClone2(note6, j);
//}
//var tTransposeClone2 = new Date().getTime()
//
//log("transposeClone2 time for 10000 iterations: " + (tTransposeClone2 - tTransposeClone1));
//
//var note6 = new Note(60);
//var tTransposeClone1 = new Date().getTime()
//for (var i = 0; i < 10000; i++)
//{
//	var j = i % 12;
//	var note6temp = transposeClone(note6, j);
//}
//var tTransposeClone2 = new Date().getTime()
//
//log("transposeClone time for 10000 iterations: " + (tTransposeClone2 - tTransposeClone1));


var E3 = new Note(getMidiValue("E3"));
assert(E3 == "E3", "Midi note conversion pipeline generic works.")
var A3 = new Note(getMidiValue("A3"));
var D4 = new Note(getMidiValue("D4"));
var G4 = new Note(getMidiValue("G4"));
var B4 = new Note(getMidiValue("B4"));
var E5 = new Note(getMidiValue("E5"));
var stdTuning = new Array(E3, A3, D4, G4, B4, E5);
assert(stdTuning == "E3,A3,D4,G4,B4,E5", "Standard tuning array functionality works.");

var fretDistArray = calcFretDist(1000, 24);
assert(fretDistArray[0] == 0, "Fret distance at 0th fret correct.");
assert(fretDistArray[12] == 500, "Fret distance at 12th fret correct.");
assert(fretDistArray[24] == 750, "Fret distance at 24th fret correct.");

var noteDistArray = calcNoteDist(fretDistArray);
assert(noteDistArray[0] == 28.063, "Note distance at 1st fret correct.");

var stdFretboard = new Fretboard(stdTuning, 0, 12, 1000, 100);
assert(stdFretboard[2][12] == "200,500,D5", "Fretboard generic creation works as far as I can tell.");
assert(stdFretboard[0][0] == "0,0,E3", "Fretboard bottom left bounding works (1/4).");
assert(stdFretboard[5][0] == "500,0,E5", "Fretboard top left bounding works (2/4).");
assert(stdFretboard[0][12] == "0,500,E4", "Fretboard bottom right bounding works (3/4).");
assert(stdFretboard[5][12] == "500,500,E6", "Fretboard top right bounding works (4/4).");
//for (var i=0; i<6; i++) {
//	log(i + ": " + stdFretboard[i][0] +  "&nbsp;&nbsp;&nbsp;" + stdFretboard[i][5] + "&nbsp;&nbsp;&nbsp;"+ stdFretboard[i][12]);
//};
assert(stdFretboard[0][0][0] == "0", "Fretboard specific string value is correct (1/3).");
assert(stdFretboard[0][0][1] == "0", "Fretboard specific fret value is correct (2/3).");
assert(stdFretboard[0][0][2] == "E3", "Fretboard specific note value is correct (3/3).");
assert(stdFretboard[4][0][0] == "400", "Fretboard specific string value 2 is correct (1/3).");
assert(stdFretboard[0][12][1] == "500", "Fretboard specific fret value 2 is correct (2/3).");
assert(stdFretboard[3][11][2] == "F\u266F5", "Fretboard specific note value 2 is correct (3/3).");

//Visual verification.
var initFret = 0;
var endFret = 12;
var scaleLength = 1000;
var stringSpacing = 30;
var fretSpacing = 30;
var stdFretboard = new Fretboard(stdTuning, initFret, endFret, scaleLength, stringSpacing, fretSpacing);
var xOffset = 150;
var yOffset = 100;
var noteRadius = 7;

var bordersWidth = 3;
var stringsWidth = 2;
var fretsWidth = 2;
var nutWidth = 5;
var noteStrokeWidth = 2;


var fretboardLength = stdFretboard[0][endFret - initFret][1] - stdFretboard[0][0][1];
var fretboardWidth = (stdFretboard.length - 1) * fretSpacing;
var yInitFret = stdFretboard[0][0][1];

var canvas = Raphael(500, 50, fretboardLength + 100, Math.round(0.8 * scaleLength) + 100);
var set = canvas.set();

log("Drawing fretboard borders.");

var nut = [["M", xOffset, yOffset - nutWidth], ["L", fretboardWidth + xOffset, yOffset - nutWidth]];
var nutPath = canvas.path(nut).attr({
    "stroke-width": nutWidth + 1
});
set.push(nutPath);

//Draw border.
var fretboardBorders = canvas.rect(xOffset, yOffset, fretboardWidth, fretboardLength).attr({
	stroke: "#000",
	"stroke-width": bordersWidth
});
set.push(fretboardBorders);

assert((stdFretboard[0][1][1] - yInitFret) == Math.round(56.12568 * scaleLength)/1000,"First fret distance is correct.");
assert((stdFretboard[0][12][1] - yInitFret) == Math.round(500 * scaleLength)/1000,"Twelfth fret distance is correct.");
var fretboardRatio = (stdFretboard[0][1][1] - yInitFret)/(stdFretboard[0][2][1] - stdFretboard[0][1][1] - yInitFret);
//log(stdFretboard[0][2][1] - yInitFret + ", " + (stdFretboard[0][1][1] - yInitFret));
assert(Math.round(fretboardRatio * 1000)/1000 == 1.059, "Fretboard ratios are correct.");
//log(Math.round(fretboardRatio * 1000)/1000);

log(" Drawing strings.")
//Draw strings.
for (var i = 1; i < stdFretboard.length - 1; i++) {
	var string = [["M", (i * fretSpacing) + xOffset, yOffset], ["L", (i * fretSpacing) + xOffset, fretboardLength + yOffset]];
	var stringPath = canvas.path(string).attr({
	"stroke-width": stringsWidth
	});
	set.push(stringPath);
}

log("Drawing frets.");
//Draw frets.
for (var i = 1; i < stdFretboard[0].length - 1; i++) {
	var fret = [["M", xOffset, stdFretboard[0][i][1] + yOffset - yInitFret], ["L", fretboardWidth + xOffset, stdFretboard[0][i][1] + yOffset - yInitFret]];
	var fretPath = canvas.path(fret).attr({
	"stroke-width": fretsWidth
	});
	set.push(fretPath);
}

//Draw intersections.
//log("x: " + stdFretboard.length + " y: " + stdFretboard[0].length);
//for (var i = 0; i < stdFretboard.length; i++) {
//	for (var j = 0; j < stdFretboard[0].length; j++) {
//		canvas.circle(
//		(stdFretboard[i][j][0] + xOffset), 
//		(stdFretboard[i][j][1] + yOffset),
//		noteRadius).attr({
//			fill: "#000",
//			"stroke-width": "2"
//		});
//	}
//}

log("Drawing notes.");
var GMajScale = new Scale(7, majScale);
var GMajPentScale = new Scale(7, majPentScale);
var currentScale = GMajScale;
//assert(typeof stdFretboard[0][0][2] == "Note", "Third element in fretboard array is a Note.");
assert(stdFretboard[0][3][2].scalePosition(GMajScale) > -1, "In-scale note is in scale.");
assert(stdFretboard[0][4][2].scalePosition(GMajScale) === - 1, "Out-of-scale note is not in scale.");
//Draw notes.
for (var i = 0; i < stdFretboard.length; i++) {
	if (stdFretboard[i][0][2].scalePosition(currentScale) > -1) {
		var note = canvas.circle((stdFretboard[i][0][0] + xOffset), (stdFretboard[i][0][1]  + yOffset - yInitFret - nutWidth), noteRadius).attr({
				fill: "#fff",
				"stroke-width": noteStrokeWidth
			});
	}
	for (var j = 1; j < (stdFretboard[0].length); j++) {
		if (stdFretboard[i][j][2].scalePosition(currentScale) > -1) {
			var note = canvas.circle((stdFretboard[i][j][0] + xOffset), (0.5 * (stdFretboard[i][j - 1][1] + stdFretboard[i][j][1]) + yOffset - yInitFret), noteRadius).attr({
				fill: "#fff",
				"stroke-width": noteStrokeWidth
			});
			set.push(note);
		}
	}
}

//for (var i = 0; i < stdFretboard.length; i++) {
//    for (var j = 0; j < (stdFretboard[0].length - 1); j++) {
//		log(stdFretboard[i][j][2] + ": " + (stdFretboard[i][j][2].inScale(currentScale)));
////        log(stdFretboard[i][j][2]);
//        var note = canvas.circle((stdFretboard[i][j][0] + xOffset), (0.5 * (stdFretboard[i][j][1] + stdFretboard[i][j + 1][1]) + yOffset - yInitFret), noteRadius).attr({
//            fill: "#000",
//            "stroke-width": "2"
//        });
//        set.push(note);
//    }
//}

//var rotation = [-90, xOffset, fretboardLength + yOffset];
////canvas.circle(xOffset, fretboardLength + yOffset, 5);
////set.hide();
////var set2 = set.clone();
//set.rotate(rotation);
////set.animate({rotation: rotation}, 200);
//set.translate(fretboardLength - xOffset + 10, 0);
//$(document).ready(function(){
//
//$("results").append("V. 02<p>");
//$("results").append("Test results:");
// });


//console.timeEnd("test");