/*
document.write(
'<canvas id="canvas" width="700" height="650">'+
'If you see this, your browser does not support this feature. Please use Firefox or Chrome.' +
'</canvas>' +
'<script type="text/javascript"> setup(); </script>'
);
*/

//TODO: hitting the ball faster makes it bounce off faster
//TODO: sound on hits
//TODO: restart game
//TODO: extra levels
//TODO: lives left count
//TODO: countdown animation



/********************************* Breakout by Gal Cohen ********************************/
var canvas;
var gameEnded = false;
var intervalId = 0;

var canvasMinX = 0;
var canvasMaxX = 0;

var WIDTH = 0;
var HEIGHT = 0;

var numBlockRows = 11;
var numBlockColumns = 10;

var brickArray;

var rightKeyDown = false;
var leftKeyDown = false;

/**
* Keeps track of the current state of the game.
* 0 = splash
* 1 = playing game
* 2 = paused
* 3 = game over
*/
var gameState = 0; 

var pauseImg;
var endImg;
var nextLevelImg;
var scoreBoardImg;
var splashImg;

var brick1Img;
var brick2Img;
var brick3Img;
var brick4Img;

var ballImg;
var paddleImg;

var livesLeft = 5;
var BrickHitCounter = 0;



/**
* The Ball Object constructor, contains the fields regarding the dimensions and
* location of the ball as well as methods such as Ball.Draw to draw the ball on the canvas.
*/
var Ball = function (rad, x, y){
	this.radius = rad;
	this.xpos = x;
	this.ypos = y;
	this.speedX = 7;
	this.speedY = 7;

	this.draw = function (){
		//canvas.fillStyle = "#00A308";
		//canvas.beginPath();
		//canvas.arc(this.xpos, this.ypos, this.radius, 0, Math.PI*2, true);
		//canvas.closePath();
		//canvas.fill();
		
		canvas.drawImage(ballImg, this.xpos, this.ypos, ballImg.width, ballImg.height);
	};
};




/** 
* The Paddle Object constructor defines the dimensions and location of the paddle, 
* as well as methods such as Paddle.Draw to place the paddle on the canvas.
*/
var Paddle = function (x, y, w, h){
	this.xpos = x;
	this.ypos = y;
	this.width = w;
	this.height = h;
	
	this.draw = function (){
		//canvas.fillStyle = "#F0F0F0";
		//canvas.beginPath();
		//canvas.rect(this.xpos, this.ypos, this.width, this.height);
		//canvas.closePath();
		//canvas.fill();
		
		canvas.drawImage(paddleImg, this.xpos, this.ypos, this.width, this.height);
	};
};




/** 
* The Brick Object constructor defines the dimensions and location of the brick, 
* as well as methods such as Brick.Draw to place the paddle on the canvas.
*/
var Brick = function (x, y, w, h, brickType){
	this.xpos = x;
	this.ypos = y;
	this.width = w;
	this.height = h;
	this.type = brickType;
	
	this.isActive = true; 
	
	this.draw = function (){
		if (this.type === 1){
			//canvas.fillStyle = "#FF0000";
			canvas.drawImage(brick1Img, this.xpos, this.ypos, this.width, this.height);
		} else if (this.type === 2){
			//canvas.fillStyle = "#00FF00";
			canvas.drawImage(brick2Img, this.xpos, this.ypos, this.width, this.height);
		} else if (this.type === 3){
			//canvas.fillStyle = "#0000FF";
			canvas.drawImage(brick3Img, this.xpos, this.ypos, this.width, this.height);
		} else if (this.type === 4){
			//canvas.fillStyle = "#FFFF00";
			canvas.drawImage(brick4Img, this.xpos, this.ypos, this.width, this.height);
		}else{ 
			canvas.fillStyle = "#F0F0F0";
			canvas.beginPath(); 
			canvas.rect(this.xpos, this.ypos, this.width, this.height);
			canvas.closePath();
			canvas.fill();
		}
		
		//canvas.beginPath();
		//canvas.rect(this.xpos, this.ypos, this.width, this.height);
		//canvas.closePath();
		//canvas.fill();
	};
};
	
	
	


/**
* Set up the canvas, and variables and elements of the entire game.
*/
var setup = function (){
	var context = document.getElementById('canvas');
	canvas = context.getContext('2d');
	
	pauseImg = new Image();
	pauseImg.src = 'pause.jpg';
	
	endImg = new Image();
	endImg.src = 'gameover.jpg';
	
	brick1Img = new Image();
	brick1Img.src = 'brick1.jpg';
	
	brick2Img = new Image();
	brick2Img.src = 'brick2.jpg';
	
	brick3Img = new Image();
	brick3Img.src = 'brick3.jpg';
	
	brick4Img = new Image();
	brick4Img.src = 'brick4.jpg';
	
	paddleImg = new Image();
	paddleImg.src = 'paddle.jpg';
	
	ballImg = new Image();
	ballImg.src = 'ball.png';
	
	nextLevelImg = new Image();
	nextLevelImg.src = 'nextlevel.jpg';
	
	scoreBoardImg = new Image();
	scoreBoardImg.src = 'scoreboard.jpg';
	
	splashImg = new Image();
	splashImg.src = 'splashScreen.jpg';
	
	

	WIDTH = 700; //$("#canvas").width();
	HEIGHT =  600; //$("#canvas").height();
	
	canvasMinX = $("#canvas").offset().left;
	canvasMaxX = canvasMinX + WIDTH;
	
	
	ball = new Ball(12, WIDTH / 2, HEIGHT / 2);
	paddle = new Paddle(WIDTH / 2, HEIGHT - 20, 80, 15);
		
	//brick = new Brick(WIDTH / 2, HEIGHT - 25, 68, 28, 1);	
	initBrickArray(numBlockColumns, numBlockRows);

	
	//intervalId = setInterval(draw, 30);
	splash();
	//return intervalId;

};





/**
* Creates a two dimensional array by creating an array of arrays and instantiates it 
* with the Brick objects.
*/
var initBrickArray = function (cols, rows){
	//create a brick array by creating an array of columns each containing an array of rows
	brickArray = new Array(cols);
	for (var i = 0; i < cols; i++) {
		brickArray[i] = new Array(rows);
	}
	
	var counter = 1;
	
	// instantiate the "2d" array by adding a Brick object to each value.
	for (var p = 0; p < brickArray.length; p++){
		for (var q = 0; q < brickArray[p].length; q++){
			
			//give 1 of 4 values to the Brick object. used to color the bricks differently.
			counter = counter + 1;
			if (counter > 4){
				counter = counter % 4;
			}
			
			brickArray[p][q] = new Brick(p * 70, q * 30, 68, 28, counter);
		}
	}
};





/**
* This function pauses the game. When it is called, depending on the state of the game it 
* will either pause the game, or unpause it.
*/
var pauseGame = function (){
	/*
	* 0 = splash
	* 1 = playing game
	* 2 = paused
	* 3 = game over
	*/
/*	if (gameState === 2){ //if the game is already paused, unpause it
		gameState = 1;
		
		//call countdown animation
		
		//continue draw loop
		//intervalId = setInterval(draw, 30);
		
		console.log("unpause");
	}else if (gameState === 1) { //if the game is going on, on pause it
		gameState = 2;
		//clearInterval(intervalId); //stop the draw loop
		//display pause screen
		canvas.drawImage(pauseImg, (WIDTH/2)-(pauseImg.width/2), (HEIGHT/2)-(pauseImg.height/2), pauseImg.width, pauseImg.height);
		console.log("pause");
	}
*/
	canvas.drawImage(pauseImg, (WIDTH/2)-(pauseImg.width/2), (HEIGHT/2)-(pauseImg.height/2), pauseImg.width, pauseImg.height);
	
};



/* ************************************* DRAWING ************************************** */

/**
* This function represents one iteration of the game loop.This is where the game state machine 
* logic goes and the calls the drawing functions, collision detections, etc. go.
*/
var draw = function (){
	//clear the screen
	
	if (gameState === 1){
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
	}else if (gameState === 2) {
		pauseGame();
	}else if (gameState === 3){
		gameOver();
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
	
	// fill(0, 0,0);
	//  textFont(fontA, 20);
	// text(level, 309, 633);
	
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
};





/* ************************************ COLLISIONS ************************************ */

/**
* This function provides simple collision detection between the walls of the canvas and the ball
* as well as the ball and the paddle.
*/
var moveBallDetectCollision = function() {
	if ((ball.xpos + ball.speedX + ball.radius) > WIDTH || ball.xpos + ball.speedX - ball.radius < 0){
		ball.speedX = -ball.speedX;
	}
	
/*	if (ball.ypos + ball.speedY - ball.radius < 0){
		ball.speedY = -ball.speedY;
	}else if (ball.ypos + ball.speedY+ ball.radius > HEIGHT) {
	
		if (ball.xpos + ball.radius + ball.speedX > paddle.xpos && ball.xpos - ball.radius + ball.speedX < paddle.xpos + paddle.width) {
			ball.speedX = 8 * ((ball.xpos-(paddle.xpos + paddle.width/2)) / paddle.width);
			ball.speedY = -ball.speedY;
		}else{
			clearInterval(intervalId); 
			
		}
	}
*/
	if (ball.ypos + ball.speedY - ball.radius < 0){
		ball.speedY = -ball.speedY;
	}else if (ball.ypos + ball.speedY+ ball.radius > HEIGHT-paddle.height &&
		ball.xpos + ball.radius + ball.speedX > paddle.xpos &&
	 	ball.xpos - ball.radius + ball.speedX < paddle.xpos + paddle.width) {
			
			ball.speedX = 8 * ((ball.xpos-(paddle.xpos + paddle.width/2)) / paddle.width);
			ball.speedY = -ball.speedY;
		
	}else if (ball.ypos + ball.speedY+ ball.radius > HEIGHT){
		gameState = 3; //gameOver();
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
						console.log("hit brick:" + p + ", " + q );
						//ball.speedY = -ball.speedY;
						ball.speedX = 8 * ((ball.xpos-(brickArray[p][q].xpos + brickArray[p][q].width/2)) / brickArray[p][q].width);
						console.log(ball.speedX);
						ball.speedY = -ball.speedY;
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
		if (gameState === 1){
			gameState = 2;
		}else if (gameState === 2) {
			gameState = 1;
		}
	}else if (e.keyCode === 32){ //restart game
		if (gameState === 0){
			intervalId = setInterval(draw, 30);
			gameState = 1;
			return intervalId;
		}else if (gameState === 2 || gameState === 3){
			gameState = 1;
			//restart game
		}
	}else if (e.keyCode === 78){ //next level
	
	}
}



$(document).mousemove(onMouseMove);

$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);
$(document).keyup(onKeyPress);

window.addEventListener('load', setup, false);