/****************************************** LEVELS **************************************/



/**
* Calls the functions that set the Bricks up according to the appropriate level.
*/
var loadNextLevel = function() {
	if (level === 1){
        levelOne();
	}else if (level === 2){
		levelTwo();
  	}else if (level === 3){
		levelThree(); 
	}else if (level === 4){
		levelFour();
	}else if (level === 5){
        levelFive();
    }
};


var levelOne= function() {
	brickArray[0][0].isActive = false;
	brickArray[0][1].isActive = false;
	brickArray[0][2].isActive = false;
	brickArray[0][3].isActive = false;
	brickArray[0][4].isActive = false;
	brickArray[0][5].isActive = false;
	brickArray[0][6].isActive = false;
	brickArray[0][7].isActive = false;
	brickArray[0][8].isActive = false;
	brickArray[0][9].isActive = false;
	brickArray[0][10].isActive = false;
	
	brickArray[9][0].isActive = false;
	brickArray[9][1].isActive = false;
	brickArray[9][2].isActive = false;
	brickArray[9][3].isActive = false;
	brickArray[9][4].isActive = false;
	brickArray[9][5].isActive = false;
	brickArray[9][6].isActive = false;
	brickArray[9][7].isActive = false;
	brickArray[9][8].isActive = false;
	brickArray[9][9].isActive = false;
	brickArray[9][10].isActive = false;
	
	brickArray[0][0].isActive = false;
	brickArray[1][0].isActive = false;
	brickArray[2][0].isActive = false;
	brickArray[3][0].isActive = false;
	brickArray[4][0].isActive = false;
	brickArray[5][0].isActive = false;
	brickArray[6][0].isActive = false;
	brickArray[7][0].isActive = false;
	brickArray[8][0].isActive = false;
	brickArray[9][0].isActive = false;
	
	brickArray[0][1].isActive = false;
	brickArray[1][1].isActive = false;
	brickArray[2][1].isActive = false;
	brickArray[3][1].isActive = false;
	brickArray[4][1].isActive = false;
	brickArray[5][1].isActive = false;
	brickArray[6][1].isActive = false;
	brickArray[7][1].isActive = false;
	brickArray[8][1].isActive = false;
	brickArray[9][1].isActive = false;
	
	brickArray[3][4].isActive = false;
	brickArray[4][4].isActive = false;
	brickArray[5][4].isActive = false;
	brickArray[6][4].isActive = false;
	
	brickArray[3][5].isActive = false;
	brickArray[4][5].isActive = false;
	brickArray[5][5].isActive = false;
	brickArray[6][5].isActive = false;
	
	brickArray[3][6].isActive = false;
	brickArray[4][6].isActive = false;
	brickArray[5][6].isActive = false;
	brickArray[6][6].isActive = false;
	
	brickArray[3][7].isActive = false;
	brickArray[4][7].isActive = false;
	brickArray[5][7].isActive = false;
	brickArray[6][7].isActive = false;
	
	brickArray[3][8].isActive = false;
	brickArray[4][8].isActive = false;
	brickArray[5][8].isActive = false;
	brickArray[6][8].isActive = false;

	
};

var levelTwo = function() {
	brickArray[1][0].isActive = false;
	brickArray[1][1].isActive = false;
	brickArray[1][2].isActive = false;
	brickArray[1][3].isActive = false;
	brickArray[1][4].isActive = false;
	brickArray[1][5].isActive = false;
	brickArray[1][6].isActive = false;
	brickArray[1][7].isActive = false;
	brickArray[1][8].isActive = false;
	brickArray[1][9].isActive = false;
	brickArray[1][10].isActive = false;
	
	brickArray[3][0].isActive = false;
	brickArray[3][1].isActive = false;
	brickArray[3][2].isActive = false;
	brickArray[3][3].isActive = false;
	brickArray[3][4].isActive = false;
	brickArray[3][5].isActive = false;
	brickArray[3][6].isActive = false;
	brickArray[3][7].isActive = false;
	brickArray[3][8].isActive = false;
	brickArray[3][9].isActive = false;
	brickArray[3][10].isActive = false;
	
	brickArray[5][0].isActive = false;
	brickArray[5][1].isActive = false;
	brickArray[5][2].isActive = false;
	brickArray[5][3].isActive = false;
	brickArray[5][4].isActive = false;
	brickArray[5][5].isActive = false;
	brickArray[5][6].isActive = false;
	brickArray[5][7].isActive = false;
	brickArray[5][8].isActive = false;
	brickArray[5][9].isActive = false;
	brickArray[5][10].isActive = false;
	
	brickArray[7][0].isActive = false;
	brickArray[7][1].isActive = false;
	brickArray[7][2].isActive = false;
	brickArray[7][3].isActive = false;
	brickArray[7][4].isActive = false;
	brickArray[7][5].isActive = false;
	brickArray[7][6].isActive = false;
	brickArray[7][7].isActive = false;
	brickArray[7][8].isActive = false;
	brickArray[7][9].isActive = false;
	brickArray[7][10].isActive = false;
	
	brickArray[9][0].isActive = false;
	brickArray[9][1].isActive = false;
	brickArray[9][2].isActive = false;
	brickArray[9][3].isActive = false;
	brickArray[9][4].isActive = false;
	brickArray[9][5].isActive = false;
	brickArray[9][6].isActive = false;
	brickArray[9][7].isActive = false;
	brickArray[9][8].isActive = false;
	brickArray[9][9].isActive = false;
	brickArray[9][10].isActive = false;
	
/*	for (var p = 0; p < brickArray.length; p++){
		for (var q = 0; q < brickArray[p].length; q++){
			brickArray[p][q].isActive = false;
		}
	}
	brickArray[5][5].isActive = true;
*/	
};


var levelThree = function() {
	brickArray[0][1].isActive = false;
	brickArray[1][1].isActive = false;
	brickArray[2][1].isActive = false;
	brickArray[3][1].isActive = false;
	brickArray[4][1].isActive = false;
	brickArray[5][1].isActive = false;
	brickArray[6][1].isActive = false;
	brickArray[7][1].isActive = false;
	brickArray[8][1].isActive = false;
	brickArray[9][1].isActive = false;
	
	
	
	brickArray[0][3].isActive = false;
	brickArray[1][3].isActive = false;
	brickArray[2][3].isActive = false;
	brickArray[3][3].isActive = false;
	brickArray[4][3].isActive = false;
	brickArray[5][3].isActive = false;
	brickArray[6][3].isActive = false;
	brickArray[7][3].isActive = false;
	brickArray[8][3].isActive = false;
	brickArray[9][3].isActive = false;
	
	
	
	brickArray[0][5].isActive = false;
	brickArray[1][5].isActive = false;
	brickArray[2][5].isActive = false;
	brickArray[3][5].isActive = false;
	brickArray[4][5].isActive = false;
	brickArray[5][5].isActive = false;
	brickArray[6][5].isActive = false;
	brickArray[7][5].isActive = false;
	brickArray[8][5].isActive = false;
	brickArray[9][5].isActive = false;
	
	brickArray[0][7].isActive = false;
	brickArray[1][7].isActive = false;
	brickArray[2][7].isActive = false;
	brickArray[3][7].isActive = false;
	brickArray[4][7].isActive = false;
	brickArray[5][7].isActive = false;
	brickArray[6][7].isActive = false;
	brickArray[7][7].isActive = false;
	brickArray[8][7].isActive = false;
	brickArray[9][7].isActive = false;
	
	brickArray[0][9].isActive = false;
	brickArray[1][9].isActive = false;
	brickArray[2][9].isActive = false;
	brickArray[3][9].isActive = false;
	brickArray[4][9].isActive = false;
	brickArray[5][9].isActive = false;
	brickArray[6][9].isActive = false;
	brickArray[7][9].isActive = false;
	brickArray[8][9].isActive = false;
	brickArray[9][9].isActive = false;
	
/*	for (var p = 0; p < brickArray.length; p++){
		for (var q = 0; q < brickArray[p].length; q++){
			brickArray[p][q].isActive = false;
		}
	}
	brickArray[5][5].isActive = true;
*/	
};


var levelFour = function() {
	brickArray[1][1].isActive = false;
	brickArray[1][2].isActive = false;
	brickArray[1][3].isActive = false;
	brickArray[1][4].isActive = false;
	brickArray[1][5].isActive = false;
	brickArray[1][6].isActive = false;
	brickArray[1][7].isActive = false;
	brickArray[1][8].isActive = false;
	// brickArray[1][9].isActive = false;
	
	
	brickArray[1][1].isActive = false;
	brickArray[2][1].isActive = false;
	brickArray[3][1].isActive = false;
	brickArray[4][1].isActive = false;
	brickArray[5][1].isActive = false;
	brickArray[6][1].isActive = false;
	brickArray[7][1].isActive = false;
	brickArray[8][1].isActive = false;
	
	brickArray[8][1].isActive = false;
	brickArray[8][2].isActive = false;
	brickArray[8][3].isActive = false;
	brickArray[8][4].isActive = false;
	brickArray[8][5].isActive = false;
	brickArray[8][6].isActive = false;
	brickArray[8][7].isActive = false;
	brickArray[8][8].isActive = false;
	//brickArray[8][9].isActive = false;
	
	brickArray[1][8].isActive = false;
	brickArray[2][8].isActive = false;
	brickArray[3][8].isActive = false;
	brickArray[4][8].isActive = false;
	brickArray[5][8].isActive = false;
	brickArray[6][8].isActive = false;
	brickArray[7][8].isActive = false;
	brickArray[8][8].isActive = false;
	
	brickArray[3][3].isActive = false;
	brickArray[3][4].isActive = false;
	brickArray[3][5].isActive = false;
	brickArray[3][6].isActive = false;
	
	brickArray[6][3].isActive = false;
	brickArray[6][4].isActive = false;
	brickArray[6][5].isActive = false;
	brickArray[6][6].isActive = false;
  
};


var levelFive = function(){
	brickArray[0][0].isActive = false;
    brickArray[1][1].isActive = false;
	brickArray[2][2].isActive = false;
	brickArray[3][3].isActive = false;
	brickArray[4][4].isActive = false;
	brickArray[5][5].isActive = false;
	brickArray[6][6].isActive = false;
	brickArray[7][7].isActive = false;
	brickArray[8][8].isActive = false;
	brickArray[9][9].isActive = false;
 	
/*    brickArray[0][2].isActive = false;
    brickArray[1][3].isActive = false;
	brickArray[2][4].isActive = false;
	brickArray[3][5].isActive = false;
	brickArray[4][6].isActive = false;
	brickArray[5][7].isActive = false;
	brickArray[6][8].isActive = false;
	brickArray[7][9].isActive = false;
    brickArray[8][10].isActive = false;
*/
    brickArray[0][1].isActive = false;
    brickArray[1][2].isActive = false;
	brickArray[2][3].isActive = false;
	brickArray[3][4].isActive = false;
	brickArray[4][5].isActive = false;
	brickArray[5][6].isActive = false;
	brickArray[6][7].isActive = false;
	brickArray[7][8].isActive = false;
	brickArray[8][9].isActive = false;
	brickArray[9][10].isActive = false;

/*    brickArray[0][10].isActive = false;
    brickArray[1][10].isActive = false;
	brickArray[2][10].isActive = false;
	brickArray[3][10].isActive = false;
	brickArray[4][10].isActive = false;
	brickArray[5][10].isActive = false;
	brickArray[6][10].isActive = false;
	brickArray[7][10].isActive = false;
	brickArray[8][10].isActive = false;
	brickArray[9][10].isActive = false;
*/
    brickArray[0][0].isActive = false;
    brickArray[1][0].isActive = false;
	brickArray[2][0].isActive = false;
	brickArray[3][0].isActive = false;
	brickArray[4][0].isActive = false;
	brickArray[5][0].isActive = false;
	brickArray[6][0].isActive = false;
	brickArray[7][0].isActive = false;
	brickArray[8][0].isActive = false;
	brickArray[9][0].isActive = false;

    brickArray[0][10].isActive = false;
    brickArray[1][9].isActive = false;
	brickArray[2][8].isActive = false;
	brickArray[3][7].isActive = false;
	brickArray[4][6].isActive = false;
	brickArray[5][5].isActive = false;
	brickArray[6][4].isActive = false;
	brickArray[7][3].isActive = false;
	brickArray[8][2].isActive = false;
    brickArray[9][1].isActive = false;
   
	brickArray[1][10].isActive = false;
    brickArray[2][9].isActive = false;
	brickArray[3][8].isActive = false;
	brickArray[4][7].isActive = false;
	brickArray[5][6].isActive = false;
	brickArray[6][5].isActive = false;
	brickArray[7][4].isActive = false;
	brickArray[8][3].isActive = false;
	brickArray[9][2].isActive = false;
    
};
