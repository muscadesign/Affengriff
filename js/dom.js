
var playable = [];



$(document).ready(function() {



	

	//populateSelect();
		
	function populateSelect(){
		
		$('select').remove();
		var selbox = $('<select>');
		//selectbox erzeugen 
		if(stringset_chordtones.length >0){
			selbox.appendTo('#content');
			for(var i in stringset_chordtones) {
 				selbox.append($("<option>").attr('value',i).text(i));
 			}
 			//ersten Akkord schonmal plotten
 			plotChord(stringset_chordtones[0].tones, range[0]);
 		}		
		
 		selbox.change(function() {		
			plotChord(stringset_chordtones[this.value].tones, range[0]);
		
		});
	
	
	}
	






	//Cord Textfeld
	$("#chord").click(function(){
	
			var str = $("input[name='chordstring']").val();

			var tones = [];
					tones['c'] = 0;
					tones['c#'] = 1;
					tones['db'] = 1;
					tones['d'] = 2;
					tones['d#'] = 3;
					tones['eb'] = 3;
					tones['e'] = 4;
					tones['fb'] = 4;
					tones['f'] = 5;
					tones['f#'] = 6;
					tones['gb'] = 6;
					tones['g'] = 7;
					tones['g#'] = 8;
					tones['ab'] = 8;
					tones['a'] = 9;
					tones['a#'] = 10;
					tones['bb'] = 10;
					tones['hb'] = 10;
					tones['b'] = 11;
					tones['h'] = 11;
			
//	C:0	D:2	E:4	F:5	G:7	A:9	H:11
						
			var chordpatt = [];
					chordpatt['m'] = [0,3,7];
					chordpatt['-'] = [0,3,7];
					chordpatt['m7'] = [0,3,7,10];
					chordpatt['-7'] = [0,3,7,10];
					chordpatt['7'] = [0,4,7,10];
					chordpatt['M7'] = [0,4,7,11];
					chordpatt['Maj7'] = [0,4,7,11];
					chordpatt['maj7'] = [0,4,7,11];
			
			
			var strg = '';							
			var rootnote=/[cdefgahb][#|b]{0,1}/i;			
			var rootnote=str.match(rootnote);
			 strg = rootnote[0].toLowerCase();
			
				
				
			var chord = /[-|m]{0,1}[67911|M7|maj7]{1,4}/;
				chord=str.match(chord);
				



			chord_tones = filterChordNotes(chordpatt[chord], range, fredboard.tones(), tones[strg]);
			stringset_tones = findStringsetTones (chord_tones, chord_pattern);
			stringset_chordtones = chordtone.stringsets(chordpatt[chord],stringset_tones);
			
			
			populateSelect();



	
	});

	

});




function playableChords(cordpattern, tones){
	var arr =[];
	var counter = null;
	for(var i in tones){
		var foundCord = constructChord(cordPattern,tones[i]);
		if(foundCord.playable == true){
			counter++;
			arr.push(foundCord);
		}
		
	}
	
	return arr;

}








function plotChord(cord, bundnr){


	$(".saite div").removeClass();
	$(".saite div").text("");

	for(j=0; j<cord.length; j++) { 

		var sait = saite[cord[j][0]]; 
		var bund = cord[j][1];
		var interval = cord[j][2];
		var tone = cord[j][3];

			var elm = $("#"+ sait+bund);
				
				//elm.text(tone);	
						
				switch (interval){
			
				case 0:
				 	elm.addClass("root");break;
				case 3:
				case 4:
					elm.addClass("ter");break;
				
				case 5:
					elm.addClass("qua");break;			
				case 7:	
					elm.addClass("qui");break;			
				case 9:	
					elm.addClass("sex");break;
				case 10:	
					elm.addClass("sep");break;
				case 11:	
					elm.addClass("sep");break;				
			}

	
		}
		
		var bund = $("#bund").text(bundnr);
 
}