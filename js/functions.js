
//findDoubleSaite(saite);

// Input: saite [	[saite,bund,intervak,tone],[...]... ]
// Return:  gefunden Saiten {	E:5	A:4   D:3 	g:2  h:1   e:0 }
// Array[[saite,bund,interv,tone],[...]...];

function findDoubleSaite(arr){
  var doubles = [];
  for(var i in arr){
	    var count = 0;
    	for(var j in arr){
      		if(arr[i][0] == arr[j][0]){
        
        		count++;
        	if(count > 1){
          		doubles.push(arr[i]);
        	}
      	}    
    }   
  }
  return doubles.length>0 ? doubles: false;
}


//
// Suche nach doppelten Intervallen
//
// Input: intv[0,1,2...]; saite [	[saite,bund,intervak,tone],[...]... ]
// Return: gefunden Intervalle 
// Array[[saite,bund,interv,tone],[...]...];
//
function findDoubleInv(intv,saite){
  
  var doubles = [];
  var foundInv = null;
  for(var i in intv){  
      var count = 0;
        for(var j in saite){
          if(saite[j][2] == intv[i]){
             count++
             if(count >= 2){
                foundInv = intv[i]; 
             }   
          }
       }
    }
  
  	for(var j in saite){
    	if(saite[j][2] == foundInv){
      		doubles.push(saite[j]);
    	}
  
  	}
	return doubles.length>0 ? doubles: false;
}

// constructChord
// Input: intv[0,1,2...]; saite [	[saite,bund,intervak,tone],[...]... ]
// Return:
// Array, alle Töne pro saite
//Array[[saite,bund,interv,tone],[...]...];

function constructChord(intv,saite){
 	
 	console.log("======= " + intv +" =======");	
	var thechord = {};
			thechord.playable = false;
			thechord.missingInterval = null;	
			thechord.tones = null;
				
	var saitenname = ["e","h","g","D","A","E"];	
	var chord = [];
	var doublesaite =  findDoubleSaite(saite); 
/*
			if(doublesaite)
				doublesaite = doublesaite[0][0];
*/
	
	var doubleintv =  findDoubleInv(intv,saite); 
/*
			if(doubleintv)
				doubleintv = doubleintv[0][2];	
*/
	
	
	console.log(doublesaite);
	 
	 for(var i in intv){  
       		for(var j in saite){				 
				 if( intv[i] == saite[j][2]){				 	
				 	chord.push(saite[j]);
				 	console.log(saitenname[saite[j][0]] + " : " +saite[j][2] + " bund " + saite[j][1]);

				 }					
			}
						
	}


 // Prüfe alle doppelten Saiten auf 
 // doppelte Intervalle
 // doublesaite = false / {0-5}
 // chord: alle Töne die bisher den Akkord ausmachen
 // Array[[saite,bund,interv,tone],[...]...];

console.log(doublesaite);
	
	for(var i in doublesaite){
		for(var j in doubleintv){
			for(var c in chord){
				// wenn doppelte Saite UND doppelteltes Interval, enterfen diesen Ton(Interval)
				if(doublesaite[i][0] == chord[c][0] && doubleintv[j][2] == chord[c][2]){
					chord.splice(c,1);
				
				}	
				//Wenn doppelte Saite ein doppeltes Intervall gefunden wird
				// entferne dieses!

				
				
				//if(doublesaite[i][2] == doubleintv[j][2])
					//alert("ds "+doublesaite[i][2] + " intv "+doubleintv[j][2]);
				
			}
		}	
	}


	
	// Fehlende Intervalle ermitteln
	// dump_inrv [interval{0..11}, ...]	
	var  missing_intv = []
			missing_intv = missing_intv.concat(intv);					
		for (var ii in missing_intv){
			for(var c in chord){
				if(chord[c][2] == missing_intv[ii])	
				missing_intv.splice(ii,1);
			}
		
		}		

	thechord.missingInterval = missing_intv;
	
	
	console.log("---CORD---")
	
	count = 0;
	for(var c in chord){
		console.log(saitenname[chord[c][0] ] +" :" +chord[c][2] + " bund " + chord[c][1] );
		if(chord[c][0] == doublesaite){
			count ++;
		}
	}	
	if (count>=2){
		thechord.playable = false;
	}
		


	thechord.tones = chord;
	
	// ist der Akkord spielbar?
	// er ist spielbar, wenn nur die 7 (5te) beim 4 Klang fehlt
	if(missing_intv[0] == 7  && intv.length >= 4 && missing_intv.length == 1){
		thechord.playable = true;
	}else{
		thechord.playable = false;
	}
	
	

	
	//Akkod ist spielbar, wenn kein Intervall fehlt
	if(missing_intv.length == 0)
		thechord.playable = true;
	
	
	console.log(thechord.tones);
	console.log(thechord.playable);
	console.log(thechord.missingInterval);
	console.log("=======   ENDE   =======");
	return thechord;
}



function findStringsetTones (toneshape, chordpattern) {

	var saitenname = ["e","h","g","D","A","E"];	
	var stringsets = [ [5,4,3,2], [4,3,2,1], [3,2,1,0], [4,2,1,0], [5,3,2,1], [5,2,1,0] ];	
	var stringset_dump = [];
	
	//console.log("Interval " + chordpattern);	
	//alle stringsetz und deren saiten durchlaufen
		
	for (var j in stringsets) {	

		var chord =[];
		var interval_counter = 0;
		console.log("stringset " + stringsets[j]);
		var stringtones = [];
		
		for (var ii in stringsets[j]) {	
		 	var curr_saite = stringsets[j][ii];  
		 	var anz =0;
		  	
		 	
			for (var t in toneshape) {

					if(toneshape[t][0] == curr_saite){
					  anz++;
					 stringtones.push(toneshape[t]);	
					 console.log(saitenname[toneshape[t][0] ] +" :" +toneshape[t][2]);			  
					}
			}		

		  stringset_dump[j] = stringtones; 
		
		}

	}
		
return 	stringset_dump;

}// end findStringsetTones



// 
//	Input: pattern intv[0,4,7..]
// 	range[[start, länge]]
//  tones[]
//	key 0-11;

function filterChordNotes(pattern, range, tones, key){
	var toneshape = []; 
	var start = range[0];
	var end   = (start + range[1]) % 12;
		
	for(j=0; j<tones.length; j++) { 
		
		var bund = 0;
		for(i=start; i<end; i++) { 
			for(cp=0; cp<pattern.length; cp++)	{
					
					var target_note = (key + pattern[cp])%12;
					
					if( tones[j][i] ==target_note){
						//alert("Saite "+saite[j] + " bar "+i);		
						var saite = j;
						var interval = pattern[cp];
						var tone =  tones[j][i]; 
						var triple = [saite,bund, interval, tone ];
						toneshape.push(triple);						
					}
			}			
			bund++;
		}	
	}
	
	return toneshape;	
}



/*
function addElement (note,mark) {
  	 var elm = null;
  	 var elm = document.createElement("span");
  		elm.setAttribute("class",mark);
 	 var txt = document.createTextNode(note);
  		elm.appendChild(txt); 
 document.getElementById("my").appendChild(elm);
 	
}


for(j=0; j<barTones.length; j++) { 
	for(i=0; i<barTones[j].length; i++) { 
	
		var hit ="n";
		for(cp=0; cp<cordPattern.length; cp++)	{
				if( barTones[j][i] ==cordPattern[cp]){
				hit = "x";
				}
		}
		addElement (barTones[j][i],hit);	

	}
	var br = document.createElement("br");
	document.getElementById("my").appendChild(br);
}
*/


