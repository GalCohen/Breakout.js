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
		

        //ball.xpos = ball.xpos + ball.speedX;
        //ball.ypos = ball.ypos + ball.speedY;
        for (var i = 0; i < 15; i++) {
            ball.xpos = ball.xpos + (ball.speedX / 15 );
            ball.ypos = ball.ypos + (ball.speedY / 15 );

            if (ballBrickDetectCollision() === true){
                break; 
            }

            if (moveBallDetectCollision() === true){
                ball.xpos = ball.xpos + (ball.speedX / 15 )*10;
                ball.ypos = ball.ypos + (ball.speedY / 15 )*10;
                break;
            }

        }

        paddlePowerUpCollision();

        calculatePaddleSpeed();

		ball.draw();
		paddle.draw();
		drawBricks();
		
		for (var r = 0; r < powerupArray.length; r++){
            if (powerupArray[r].state === 1){
                powerupArray[r].ypos = powerupArray[r].ypos + powerupArray[r].speedY;
                powerupArray[r].draw();
            }
        }

        for (var t = 0; t < activePowerupArray.length; t++){
            activePowerupArray[t].maintainPowerUp();
            if (activePowerupArray[t].state === 2){
                switch(activePowerupArray[t].type) {
                    case 1:
                        paddle.sizeState = 1;  
                        break;
                    case 2:
                        paddle.sizeState = -1;
                        break;
                    case 3:
                        ball.sizeState = 1;
                        break;
                    case 4:
                        ball.sizeState = -1;
                        break;

                    default:
                        // code
                        break;
                }            
            }else if (activePowerupArray[t].state === 3) {
                 switch(activePowerupArray[t].type) {
                    case 1:
                        paddle.sizeState = 0;  
                        break;
                    case 2:
                        paddle.sizeState = 0;
                        break;
                    case 3:
                        ball.sizeState = 0;
                        break;
                    case 4:
                        ball.sizeState = 0;
                        break;

                    default:
                        // code
                        break;
                }

                if (audioWorks === true) {
                    if (activePowerupArray[t].playedsound === false){
                        if (activePowerupArray[t].isGood === true){
                            powerupGoodDownSound.play();
                        }else{
                            powerupBadDownSound.play();
                        }
                        activePowerupArray[t].playedsound = true;
                    }
                }              
            }
        }
	
		canvas.fillStyle="black";
		canvas.fillRect(0, 595, WIDTH, 15);
		
		drawScoreBoard();
		DrawTotalScore();
		
		for (var w = 0; w < scoreArray.length; w++){
			scoreArray[w].draw();
		}
	
        for (var q = 0; q < brickExplosionArray.length; q++ ){
            brickExplosionArray[q].draw();
        }


		if (brickHitCounter === 0){
			score = score + (combo * 15);
			combo = 0;
			if (level === LAST_LEVEL){
				gameState = GAME_WON;
			}else{
				gameState = NEXT_LEVEL;
			}
		}
		
	}else if (gameState === PAUSED  ) {
		pauseGame();
	}else if (gameState === GAME_OVER) {
		gameOver();
	}else if (gameState === NEXT_LEVEL) {
		nextLevel();
	}else if (gameState === GAME_WON) {
		gameWon();
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
};



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





var gameWon = function(){
	canvas.drawImage(gameWonImg, (WIDTH/2)-(gameWonImg.width/2), (HEIGHT/2)-(gameWonImg.height/2), gameWonImg.width, gameWonImg.height);
	
	canvas.font="30px Rockwell";
	canvas.fillStyle = "rgb(0,0, 0)";
	
	var offset = 0;
	var temp = score;
	while(temp > 0){
		temp = temp / 10;
		temp = Math.floor(temp);
		offset++;

	}
	
	canvas.fillText(score , (WIDTH/2)-offset*5, (HEIGHT/2)+15);
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
	canvas.fillText(score , WIDTH-14-(offset*8), HEIGHT-4);
};



