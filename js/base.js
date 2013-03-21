


//window.onload = function() {

 
var tones = ["c","c#","d","d#","e","f","f#","g","g#","a","a#","h"]; 

var saite = ["e","h","g","D","A","E"];

// e:0	h:1	g:2	D:3	A:4	E:5

var fredboard = {  

    tones: function() {  
    var start_tones =[4,11,7,2,9,4]; 
    var bar_tones = [];
    var num_bars =12;

    for(i=0; i<start_tones.length; i++) { 
	  var bund = new Array();
	  for(j=0; j<num_bars; j++) { 
		bund[j] = (start_tones[i]+j) % 12;					
	  }	
	    bar_tones[i] = bund;	
      }     
      return bar_tones;
    }  
};



//	C:0	D:2	E:4	F:5	G:7	A:9	H:11
var chord_pattern = [0,4,7,11];
var key = 0;
var range = [3, 4]; //[Startbund, anzhl. Bünde]



var chord_tones;// = filterChordNotes(chord_pattern, range, fredboard.tones(), key);
var stringset_tones;// = findStringsetTones (chord_tones, chord_pattern);



var chordtone = { 
		stringsets: function(pattern, chordtones) { 
			console.log(pattern)
			var allcords = [];
			var counter = null;
				for(var i in chordtones){
					var chord = constructChord(pattern,chordtones[i]);
					if(chord.playable == true){
						counter++;
						allcords.push(chord);
						}
	
				}	
			return allcords;
			}
}


var stringset_chordtones;// = chordtone.stringsets(chord_pattern,stringset_tones);






//};

