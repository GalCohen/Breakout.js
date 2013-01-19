/*
document.write(
'<canvas id="canvas" width="700" height="600">'+
'If you see this, your browser does not support this feature. Please use Firefox or Chrome.' +
'</canvas>'
'<script type="text/javascript"> setup(); </script>'
);
*/

/******************************* Breakout by Gal Cohen ******************************/
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
		canvas.fillStyle = "#00A308";
		canvas.beginPath();
		canvas.arc(this.xpos, this.ypos, this.radius, 0, Math.PI*2, true);
		canvas.closePath();
		canvas.fill();
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
		canvas.fillStyle = "#F0F0F0";
		canvas.beginPath();
		canvas.rect(this.xpos, this.ypos, this.width, this.height);
		canvas.closePath();
		canvas.fill();
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
			canvas.fillStyle = "#FF0000";
		} else if (this.type === 2){
			canvas.fillStyle = "#00FF00";
		} else if (this.type === 3){
			canvas.fillStyle = "#0000FF";
		} else if (this.type === 4){
			canvas.fillStyle = "#FFFF00";
		}else{
			canvas.fillStyle = "#F0F0F0";
		}
		
		canvas.beginPath();
		canvas.rect(this.xpos, this.ypos, this.width, this.height);
		canvas.closePath();
		canvas.fill();
	};
};
	
	
	


/**
* Set up the canvas, and variables and elements of the entire game.
*/
var setup = function (){
	var context = document.getElementById('canvas');
	canvas = context.getContext('2d');

	WIDTH = $("#canvas").width();
	HEIGHT = $("#canvas").height();
	
	canvasMinX = $("#canvas").offset().left;
	canvasMaxX = canvasMinX + WIDTH;
	
	
	ball = new Ball(12, WIDTH / 2, HEIGHT / 2);
	paddle = new Paddle(WIDTH / 2, HEIGHT - 20, 80, 15);
		
	//brick = new Brick(WIDTH / 2, HEIGHT - 25, 68, 28, 1);	
	initBrickArray(numBlockColumns, numBlockRows);

	
	intervalId = setInterval(draw, 30);
	return intervalId;

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




/* ************************************* DRAWING ************************************** */

/**
* This function represents one iteration of the game loop.This is where the game state machine 
* logic goes and the calls the drawing functions, collision detections, etc. go.
*/
var draw = function (){
	//clear the screen
	clear();

	moveBallDetectCollision();
	ballBrickDetectCollision();
	
	
	ball.draw();
	paddle.draw();
	drawBricks();
	
	
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




/* ************************************ COLLISIONS ************************************ */

/**
* This function provides simple collision detection between the walls of the canvas and the ball
* as well as the ball and the paddle.
*/
var moveBallDetectCollision = function() {
	if ((ball.xpos + ball.speedX + ball.radius) > WIDTH || ball.xpos + ball.speedX - ball.radius < 0){
		ball.speedX = -ball.speedX;
	}
	
	if (ball.ypos + ball.speedY - ball.radius < 0){
		ball.speedY = -ball.speedY;
	}else if (ball.ypos + ball.speedY+ ball.radius > HEIGHT ) {
	
		if (ball.xpos > paddle.xpos && ball.xpos < paddle.xpos + paddle.width) {
			ball.speedX = 8 * ((ball.xpos-(paddle.xpos + paddle.width/2)) / paddle.width);
			ball.speedY = -ball.speedY;
		}else{
			clearInterval(intervalId); 
		}
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
				
				if ((ball.xpos + ball.radius + ball.speedX < brickArray[p][q].width + brickArray[p][q].xpos  ) &&
					(ball.xpos + ball.speedX > brickArray[p][q].xpos)) { // check if the ball is within width of brick(p,q)
					
					if ((ball.ypos + ball.radius + ball.speedY < brickArray[p][q].height + brickArray[p][q].ypos) &&
					(ball.ypos + ball.speedY > brickArray[p][q].ypos)) { // check if ball is within height of brick(p,q)
						brickArray[p][q].isActive = false;
						console.log("hit brick:" + p + ", " + q );
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

$(document).mousemove(onMouseMove);


window.addEventListener('load', setup, false);