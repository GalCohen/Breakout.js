
/* ************************************* DRAWING ************************************** */

/**
* This function represents one iteration of the game loop.This is where the game state machine 
* logic goes and the calls the drawing functions, collision detections, etc. go.
*/
var draw = function (){
	//clear the screen
	
	if (gameState === PLAYING_GAME  ){
		clear();
	
		if (rightKeyDown) {
			paddle.xpos = paddle.xpos + 9;
		} else if (leftKeyDown) { 
			paddle.xpos = paddle.xpos - 9;
		}
		
		moveBallDetectCollision();
		ballBrickDetectCollision();
		
		ball.draw();
		paddle.draw();
		drawBricks();
		
		canvas.fillStyle="black";
		canvas.fillRect(0, 595, WIDTH, 15);
		
		drawScoreBoard();
		DrawTotalScore();
		
		//console.log(scoreArray.length);
		for (var w = 0; w < scoreArray.length; w++){
			scoreArray[w].draw();
		}
		
		if (brickHitCounter === 0){
			// go to next level
			//console.log('go to next level');
			score = score + score  * (combo/100);
			score = Math.round(score);
			combo = 0;
			
			gameState = NEXT_LEVEL;
		}
		
	}else if (gameState === PAUSED  ) {
		pauseGame();
	}else if (gameState === GAME_OVER) {
		gameOver();
	}else if (gameState === NEXT_LEVEL) {
		nextLevel();
	}else if (gameState === COUNTDOWN_ANIMATION  ) {
		clear();
		ball.draw();
		
		if (rightKeyDown) {
			paddle.xpos = paddle.xpos + 9;
		} else if (leftKeyDown) { 
			paddle.xpos = paddle.xpos - 9;
		}
		
		paddle.draw();
		drawBricks();
		drawScoreBoard();
		DrawTotalScore();
		if (frame < 30){
			countdown(frame, 3);
			frame++;
		} else if (frame >= 30 && frame < 60) {
			countdown(frame, 2);
			frame++;
		}else if (frame >= 60 && frame < 90) {	
			countdown(frame, 1);
			frame++;
		} else {
			frame = 0;
			gameState = PLAYING_GAME;
		}		
	}
};




/**
* This function iterates through the bricks array and draw all the ones that are considered
* active. Active means that they have not yet been hit by the ball.
*/
var drawBricks = function () {
	for (var p = 0; p < brickArray.length; p++){
		for (var q = 0; q < brickArray[p].length; q++){
			if (brickArray[p][q].isActive === true){
				brickArray[p][q].draw();
			}
		}
	}
};





/**
* Clears the canvas for the next iteration of the game loop
*/
var clear = function () {
	//clears the canvas
	//canvas.clearRect(0,0,WIDTH,HEIGHT);
	
	//draws the background
	canvas.fillStyle="black";
	canvas.fillRect(0,0,WIDTH,HEIGHT);
};




/**
* Draws the scoreboard on the bottom of the screen. Includes the number of lives (balls) left
* as well as the current level the player is on.
*/
var drawScoreBoard = function (){
	canvas.drawImage(scoreBoardImg, 0, 600, scoreBoardImg.width, scoreBoardImg.height);
	
	var xpos = 32;
	var ypos = 613;
	
	canvas.font="20px Rockwell";
	canvas.fillText(level , 309, 633);
	
	if (livesLeft === 0){
		
		
	} else if (livesLeft === 1){
		canvas.drawImage(ballImg, xpos+30, ypos, ballImg.width, ballImg.height);
	
	} else if ( livesLeft === 2){
		canvas.drawImage(ballImg, xpos+30, ypos, ballImg.width, ballImg.height);
		canvas.drawImage(ballImg, xpos+70, ypos, ballImg.width, ballImg.height);
		
	} else if (livesLeft === 3){
		canvas.drawImage(ballImg, xpos+30, ypos, ballImg.width, ballImg.height);
		canvas.drawImage(ballImg, xpos+70, ypos, ballImg.width, ballImg.height);
		canvas.drawImage(ballImg, xpos+110, ypos, ballImg.width, ballImg.height);

	} else if (livesLeft === 4){
		canvas.drawImage(ballImg, xpos+30, ypos, ballImg.width, ballImg.height);
		canvas.drawImage(ballImg, xpos+70, ypos, ballImg.width, ballImg.height);
		canvas.drawImage(ballImg, xpos+110, ypos, ballImg.width, ballImg.height);
		canvas.drawImage(ballImg, xpos+150, ypos, ballImg.width, ballImg.height);
	
	} else if (livesLeft === 5){
		canvas.drawImage(ballImg, xpos+30, ypos, ballImg.width, ballImg.height);
		canvas.drawImage(ballImg, xpos+70, ypos, ballImg.width, ballImg.height);
		canvas.drawImage(ballImg, xpos+110, ypos, ballImg.width, ballImg.height);
		canvas.drawImage(ballImg, xpos+150, ypos, ballImg.width, ballImg.height);
		canvas.drawImage(ballImg, xpos+190, ypos, ballImg.width, ballImg.height);
	}
}




/**
* The initial splash screen, called before the game has begun.
*/
var splash = function(){
	canvas.drawImage(splashImg, 0, 0, splashImg.width, splashImg.height);
	
};




/**
* draw the game over screen
* call can ending functions like displaying the score
*/
var gameOver = function() {
	//clearInterval(intervalId);
	canvas.drawImage(endImg, (WIDTH/2)-(endImg.width/2), (HEIGHT/2)-(endImg.height/2), endImg.width, endImg.height);
	if (endSoundPlayed === false){
		if (audioWorks === true){
			endSound.play();
		}
		endSoundPlayed = true;
	}
	
};




/**
* This function pauses the game. When it is called, depending on the state of the game it 
* will either pause the game, or unpause it.
*/
var pauseGame = function (){
	clearInterval(intervalId);
	canvas.drawImage(pauseImg, (WIDTH/2)-(pauseImg.width/2), (HEIGHT/2)-(pauseImg.height/2), pauseImg.width, pauseImg.height);
	if (audioWorks === true){
		pauseSound.play();
	}
};




/**
* This function draws image that alerts the user that they have finished the level and 
* can now press the N button to start the next one.
*/
var nextLevel = function() {
	canvas.drawImage(nextLevelImg, (WIDTH/2)-(nextLevelImg.width/2), (HEIGHT/2)-(nextLevelImg.height/2), nextLevelImg.width, nextLevelImg.height);
};





/**
* This function is used to animate a countdown of three seconds. The animation display an 
* image of a 3 for 30 frames, each frame shrinking it a little, then 2 for 30 frames, then
* 1 for 30 frames. the frame parameter is the current from the countdown animation should 
* be on and the num parameter is the number 1, 2, or 3 to display.
*/
var countdown = function(frame, num) {
	//canvas.drawImage(nextLevelImg, (WIDTH/2)-(nextLevelImg.width/2), (HEIGHT/2)-(nextLevelImg.height/2), nextLevelImg.width, nextLevelImg.height);
	
	var w = 120;
	var h = 120;
	
	canvas.fillStyle = "#fc001b";
	canvas.beginPath();
	canvas.rect(WIDTH/2 - w/2, HEIGHT/2- h/2, w, h);
	canvas.closePath();
	canvas.fill();
	
	canvas.fillStyle = "#833b14";
	canvas.beginPath();
	canvas.rect(WIDTH/2 - w/2 +5, HEIGHT/2- h/2+5, w+-10, h-10);
	canvas.closePath();
	canvas.fill();
	
	
	frame = frame % 30;
	//console.log(frame);
	frame = frame * 3;
		
	if (num === 1) {
		canvas.drawImage(oneImg, (WIDTH/2)-((oneImg.width/2)-(frame/2)), (HEIGHT/2)-((oneImg.height/2)-(frame/2)), oneImg.width-frame, oneImg.height-frame);
	} else if (num === 2) {
		canvas.drawImage(twoImg, (WIDTH/2)-((twoImg.width/2)-(frame/2)), (HEIGHT/2)-((twoImg.height/2)-(frame/2)), twoImg.width-frame, twoImg.height-frame);
	} else if (num === 3) {
		canvas.drawImage(threeImg, (WIDTH/2)-((threeImg.width/2)-(frame/2)), (HEIGHT/2)-((threeImg.height/2)-(frame/2)), threeImg.width-frame, threeImg.height-frame);
	}
	
};






var DrawTotalScore = function() {
	canvas.font="20px Rockwell";
	canvas.fillStyle = "rgb(255, 255, 224)";
	var offset = 0;
	var temp = score;
	while(temp > 0){
		temp = temp / 10;
		temp = Math.floor(temp);
		offset++;

	}
	//console.log(offset);
	canvas.fillText(score , WIDTH-14-(offset*8), HEIGHT-4);
};





/* ************************************ COLLISIONS ************************************ */

/**
* This function provides simple collision detection between the walls of the canvas and the ball
* as well as the ball and the paddle.
*/
var moveBallDetectCollision = function() {
	
	if ((ball.xpos + ball.speedX + ball.radius) > WIDTH || ball.xpos + ball.speedX + ball.radius < 0){
		ball.speedX = -ball.speedX;
		//wallSound.play();
		if (audioWorks === true) {
			wallSound.play();
		}
		//paddleHit = false;
	}
	
	if (ball.ypos + ball.speedY + ball.radius < 0){
		ball.speedY = -ball.speedY;
		//wallSound.play();
		if (audioWorks === true) {
			wallSound.play();
		}
		//paddleHit = false;
		
	}else if (ball.ypos + ball.speedY + ball.radius > HEIGHT-paddle.height-15 &&
		ball.xpos + ball.radius + ball.speedX > paddle.xpos &&
	 	ball.xpos - ball.radius + ball.speedX < paddle.xpos + paddle.width) {
			
			ball.speedX = 8 * ((ball.xpos-(paddle.xpos + paddle.width/2)) / paddle.width);
			ball.speedY = -ball.speedY;
			
			//paddleSound.play();
			if (audioWorks === true) {
				paddleSound.play();
			}
			
			paddleHit = true;
			//score = score + 10;
			var old = score;
			score = score + score  * (combo/100);
			score = Math.round(score);
			
			if (combo > 2){
				if (scoreArray.length < 5){
					scoreArray.push(new DrawScore(WIDTH/2-30, HEIGHT/2, true,score-old));
				}else{
					scoreArray.shift();
					scoreArray.push(new DrawScore(WIDTH/2-30, HEIGHT/2, true,score-old));
				}
			}
			combo = 0;
			
					
		
	}else if (ball.ypos + ball.speedY + ball.radius > HEIGHT){
		roundOver(); //gameState = 3; //gameOver();
	}
	
	ball.xpos = ball.xpos + ball.speedX;
	ball.ypos = ball.ypos + ball.speedY;
};




/**
* This function provides simple collision detection between the ball and the bricks.
*/
var ballBrickDetectCollision = function() {
	for (var p = 0; p < brickArray.length; p++){
		for (var q = 0; q < brickArray[p].length; q++){ //for each brick, 
			if (brickArray[p][q].isActive === true){ //if the brick exists, 
				
				if ((ball.xpos - ball.radius + ball.speedX < brickArray[p][q].width + brickArray[p][q].xpos  ) &&
					(ball.xpos + ball.speedX  + ball.radius > brickArray[p][q].xpos)) { // check if the ball is within width of brick(p,q)
					
					if ((ball.ypos - ball.radius + ball.speedY < brickArray[p][q].height + brickArray[p][q].ypos) &&
					(ball.ypos + ball.speedY + ball.radius > brickArray[p][q].ypos)) { // check if ball is within height of brick(p,q)
						brickArray[p][q].isActive = false;
						
						//ball.speedX = 8 * ((ball.xpos-(brickArray[p][q].xpos + brickArray[p][q].width/2)) / brickArray[p][q].width); @@@
						ball.speedY = -ball.speedY;
						
						brickHitCounter = brickHitCounter - 1;
						
						//brickSound.play();
						if (audioWorks === true) {
							brickSound.play();
						}
						
						//var combo = false;
						if (paddleHit === true) { //if the paddle was hit, add the regular score of a hit, plus  combo% of it.
							score = score + 10;
							//combo = false;						
						}else{ // as long as the paddle wasnt hit, keep adding 10pts, and counting the combo
							combo++;
							score = score + 10;
							//combo = true;
						}
						
						if (scoreArray.length < 5){
							scoreArray.push(new DrawScore(ball.xpos, ball.ypos, false,0));
						}else{
							scoreArray.shift();
							scoreArray.push(new DrawScore(ball.xpos, ball.ypos, false,0));
						}
						
						//console.log(scoreArray.length);
						
						paddleHit = false;
						console.log("score:"+score+", "+"combo:"+combo);
					}
				}
			}
		}
	}
};




/* ************************************* EVENTS  ****************************************/

/**
* the Mouse movement event. Responsible for updating the game of the current coordinates
* of the mouse cursor on the page.
*/
var onMouseMove = function (e) {
  if (e.pageX > canvasMinX && e.pageX < canvasMaxX) {
    paddle.xpos = e.pageX - canvasMinX;
  }
}



/**
* On Key down event. When the right of left keys are down, set the corresponding variables to true.
*/
function onKeyDown(e) {
	if (e.keyCode === 39){
		rightKeyDown = true;
	} else if (e.keyCode === 37) {
		leftKeyDown = true;
	}
}




/**
* On Key up event. When the right of left keys are released, set the corresponding variables to false.
*/
function onKeyUp(e) {
	if (e.keyCode === 39){
		rightKeyDown = false;
	}else if (e.keyCode === 37) {
  		leftKeyDown = false;
	}
}




/**
* On Key Press event. When a key on the keyboard is pressed, call the corresponding functions.
*/
function onKeyPress(e){
	if (e.keyCode === 80){ //pause game
		if (gameState === PLAYING_GAME){
			gameState = PAUSED;
		}else if (gameState === PAUSED) {
			gameState = PLAYING_GAME;
			intervalId = setInterval(draw, 30);
		}
	}else if (e.keyCode === 32){ //restart game
		if (gameState === SPLASH){
			intervalId = setInterval(draw, 30);
			//gameState = 1;
			gameState = COUNTDOWN_ANIMATION;
		}else if (gameState === PLAYING_GAME || gameState === GAME_OVER ){
			initializeGame(false); 
			//gameState = 1;
			gameState = COUNTDOWN_ANIMATION  ;
		}
		
	}else if (e.keyCode === 78){ //next level
		if (gameState === NEXT_LEVEL){
			level = level + 1;
			initializeGame(true);
			gameState = COUNTDOWN_ANIMATION  ;
			//gameState = 1;
		}
	}
}



$(document).mousemove(onMouseMove);

$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);
$(document).keyup(onKeyPress);

window.addEventListener('load', setup, false);

 

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
