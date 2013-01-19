
//TODO: hitting the ball faster makes it bounce off faster
//TODO: add misc sounds
//TODO: ball stuck in paddle bug
//TODO: end of game state
//TODO: possible brick exploding animation?
//TODO: powerups: increase ball size, increase/decrese speed, increase/decrease paddle size

/********************************* Breakout by Gal Cohen ********************************/

var canvas;
var gameEnded = false;
var intervalId = 0;

var canvasMinX = 0;
var canvasMaxX = 0;

var WIDTH = 0;
var HEIGHT = 0;

var numBrickRows = 11;
var numBrickColumns = 10;

var brickArray;

var rightKeyDown = false;
var leftKeyDown = false;


/**
* Keeps track of the current state of the game.
* 0 = splash
* 1 = playing game
* 2 = paused
* 3 = game over
* 4 = next level
* 7 = countdown animation
*/


var SPLASH = 0;
var PLAYING_GAME = 1;
var PAUSED = 2;
var GAME_OVER = 3;
var NEXT_LEVEL = 4;
var COUNTDOWN_ANIMATION = 7;
var GAME_WON = 8;
var LAST_LEVEL = 5; /* Update this as more levels are added */

var gameState = SPLASH;

var pauseImg;
var endImg;
var nextLevelImg;
var scoreBoardImg;
var splashImg;

var oneImg;
var twoImg;
var threeImg;

var brick1Img;
var brick2Img;
var brick3Img;
var brick4Img;

var ballImg;
var paddleImg;

var livesLeft = 5;
var brickHitCounter = 0;
var level = 1;


var frame = 0;
var endSoundPlayed = false;

var score = 0; 
var combo = 0;
var paddleHit = false;

var scoreArray = new Array();
var brickExplosionArray = new Array();

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

gameWonImg = new Image();
gameWonImg.src = 'gameWon.jpg';

oneImg = new Image();
oneImg.src = 'One.png';

twoImg = new Image();
twoImg.src = 'Two.png';

threeImg = new Image();
threeImg.src = 'Three.png';



// brick explosion images
brick1_1 = new Image();
brick1_1.src = 'brick1_1.png';

brick1_2  = new Image();
brick1_2.src = 'brick1_2.png';

brick1_3 = new Image();
brick1_3.src = 'brick1_3.png';

brick1_4 = new Image();
brick1_4.src = 'brick1_4.png';

brick1_5 = new Image();
brick1_5.src = 'brick1_5.png';

brick1_6 = new Image();
brick1_6.src = 'brick1_6.png';

brick1_7 = new Image();
brick1_7.src = 'brick1_7.png';

brick1_8 = new Image();
brick1_8.src = 'brick1_8.png';

brick1_9 = new Image();
brick1_9.src = 'brick1_9.png';

brick1_10 = new Image();
brick1_10.src = 'brick1_10.png';

brick1_11 = new Image();
brick1_11.src = 'brick1_11.png';

brick1_12 = new Image();
brick1_12.src = 'brick1_12.png';


var brickSound = document.createElement('audio');
var paddleSound =  document.createElement('audio'); 
var wallSound = document.createElement('audio'); 
var pauseSound = document.createElement('audio');  
var endSound = document.createElement('audio');  

var audioWorks = false;

if (brickSound.canPlayType('audio/ogg') === "probably" || brickSound.canPlayType('audio/ogg') === "maybe") {
	brickSound.setAttribute('src', 'brickSound.ogg');
	paddleSound.setAttribute('src', 'paddleSound.ogg');
	wallSound.setAttribute('src', 'wallSound.ogg');
	pauseSound.setAttribute('src', 'pauseSound.ogg');
	endSound.setAttribute('src', 'endSound.ogg');
	audioWorks = true;
	
} else if (brickSound.canPlayType('audio/mpeg') === "probably" || brickSound.canPlayType('audio/mpeg') === "maybe") {
	brickSound.setAttribute('src', 'brickSound.mp3');
	paddleSound.setAttribute('src', 'paddleSound.mp3');
	wallSound.setAttribute('src', 'wallSound.mp3');
	pauseSound.setAttribute('src', 'pauseSound.mp3');
	endSound.setAttribute('src', 'endSound.mp3');
	audioWorks = true;
	
} else {
	brickSound.setAttribute('src', 'brickSound.wav');
	paddleSound.setAttribute('src', 'paddleSound.wav');
	wallSound.setAttribute('src', 'wallSound.wav');
	pauseSound.setAttribute('src', 'pauseSound.wav');
	endSound.setAttribute('src', 'endSound.wav');
	audioWorks = true;
}


if (audioWorks === true){
	brickSound.load();
	paddleSound.load();
	wallSound.load();
	pauseSound.load();
	endSound.load();
}


/*
var play1 = document.createElement('audio');
var play2 = document.createElement('audio');
var play3 = document.createElement('audio');
play1.setAttribute('src', 'brickSound.ogg');
play2.setAttribute('src', 'brickSound.ogg');
play3.setAttribute('src', 'brickSound.ogg');
play1.load();
play2.load();
play3.load();
play1.play();
play2.play();
play3.play();
*/

/**
* The Ball Object constructor, contains the fields regarding the dimensions and
* location of the ball as well as methods such as Ball.Draw to draw the ball on the canvas.
*/
var Ball = function (rad, x, y) {
	this.radius = rad;
	this.xpos = x;
	this.ypos = y;
	this.speedX = 0;
	this.speedY = 9;

	this.draw = function () {
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
var Paddle = function (x, y, w, h) {
	this.xpos = x;
	this.ypos = y;
	this.width = w;
	this.height = h;

	this.draw = function () {
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
var Brick = function (x, y, w, h, brickType) {
	this.xpos = x;
	this.ypos = y;
	this.width = w;
	this.height = h;
	this.type = brickType;

	this.isActive = true;

	this.draw = function () {
		if (this.type === 1) {
			//canvas.fillStyle = "#FF0000";
			canvas.drawImage(brick1Img, this.xpos, this.ypos, this.width, this.height);
		} else if (this.type === 2) {
			//canvas.fillStyle = "#00FF00";
			canvas.drawImage(brick2Img, this.xpos, this.ypos, this.width, this.height);
		} else if (this.type === 3) {
			//canvas.fillStyle = "#0000FF";
			canvas.drawImage(brick3Img, this.xpos, this.ypos, this.width, this.height);
		} else if (this.type === 4) {
			//canvas.fillStyle = "#FFFF00";
			canvas.drawImage(brick4Img, this.xpos, this.ypos, this.width, this.height);
		} else {
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
* The DrawScore object contains the fields and functions required to draw on the screen
* the points earned after a ball hit a brick. The score will show up with 10 or 20 frames
* depending on the type of score (bonus or not) and slowly fade out
*/
var DrawScore = function(x, y, bonus, scr) {
	this.count = 0;
	this.alpha = 1.0;
	this.xpos = x;
	this.ypos = y;
	this.bonus = bonus;
	this.score = scr;
	
	this.draw = function(){
		if (this.bonus === false){
			if (this.count < 10) {
				canvas.font="17px Rockwell";
				canvas.fillStyle = "rgba(255, 255, 224,"+ this.alpha +")";
				canvas.fillText("+10" , this.xpos, this.ypos);
				this.alpha = this.alpha - 0.1;
				this.count++;
			}
		}else{
			if (this.count < 20) {
				canvas.font="25px Rockwell";
				canvas.fillStyle = "rgba(255, 255, 224,"+ this.alpha +")";
				canvas.fillText("COMBO: +"+this.score, this.xpos, this.ypos);
				this.alpha = this.alpha - 0.05;
				this.count++;
			}
		}
	}
};



/**
* The DrawBrickExplosion object contains the fields and functions required to draw on the screen
* brick explosion animation when a brick is hit. The brick will show up with 10 or 20 frames
* and slowly fade out and disappear.
*/
var DrawBrickExplosion = function(x, y, w, h ) {
	this.count = 1;
	this.alpha = 1.0;
	this.xpos = x;
	this.ypos = y;
    this.width = w;
    this.height = h;
	
	this.draw = function(){
        if (this.count < 25){
             switch (this.count){
                case 1:
                    canvas.drawImage(brick1_1, this.xpos, this.ypos, this.width, this.height);
                    break;
                case 2:
                    canvas.drawImage(brick1_1, this.xpos, this.ypos, this.width, this.height);
                    break;
                case 3:
                    canvas.drawImage(brick1_2, this.xpos, this.ypos, this.width, this.height);
                    break;
                case 4:
                    canvas.drawImage(brick1_2, this.xpos, this.ypos, this.width, this.height);
                    break;
                case 5:
                    canvas.drawImage(brick1_3, this.xpos, this.ypos, this.width, this.height);
                    break;
                case 6:
                    canvas.drawImage(brick1_3, this.xpos, this.ypos, this.width, this.height);
                    break;
                case 7:
                    canvas.drawImage(brick1_4, this.xpos, this.ypos, this.width, this.height);
                    break;
                case 8:
                    canvas.drawImage(brick1_4, this.xpos, this.ypos, this.width, this.height);
                    break;
                case 9:
                    canvas.drawImage(brick1_5, this.xpos, this.ypos, this.width, this.height);
                    break;
                case 10:
                    canvas.drawImage(brick1_5, this.xpos, this.ypos, this.width, this.height);
                    break;
                case 11:
                    canvas.drawImage(brick1_6, this.xpos, this.ypos, this.width, this.height);
                    break;
                case 12:
                    canvas.drawImage(brick1_6, this.xpos, this.ypos, this.width, this.height);
                    break;
                 case 13:
                    canvas.drawImage(brick1_7, this.xpos, this.ypos, this.width, this.height);
                    break;
                case 14:
                    canvas.drawImage(brick1_7, this.xpos, this.ypos, this.width, this.height);
                    break;
                case 15:
                    canvas.drawImage(brick1_8, this.xpos, this.ypos, this.width, this.height);
                    break;
                case 16:
                    canvas.drawImage(brick1_8, this.xpos, this.ypos, this.width, this.height);
                    break;
                case 17:
                    canvas.drawImage(brick1_9, this.xpos, this.ypos, this.width, this.height);
                    break;
                case 18:
                    canvas.drawImage(brick1_9, this.xpos, this.ypos, this.width, this.height);
                    break;
                case 19:
                    canvas.drawImage(brick1_10, this.xpos, this.ypos, this.width, this.height);
                    break;
                case 20:
                    canvas.drawImage(brick1_10, this.xpos, this.ypos, this.width, this.height);
                    break;
                case 21:
                    canvas.drawImage(brick1_11, this.xpos, this.ypos, this.width, this.height);
                    break;
                case 22:
                    canvas.drawImage(brick1_11, this.xpos, this.ypos, this.width, this.height);
                    break;
                case 23:
                    canvas.drawImage(brick1_12, this.xpos, this.ypos, this.width, this.height);
                    break;
                case 24:
                    canvas.drawImage(brick1_12, this.xpos, this.ypos, this.width, this.height);
                    break;
                default:
                    break;

            }
            
            //this.alpha = this.alpha - 0.1;
			this.count++;
        }  
	}
};




/**
* Set up the canvas, and variables and elements of the entire game.
*/
var setup = function () {
	var context = document.getElementById('canvas');
	canvas = context.getContext('2d');

	
	gameState = SPLASH;
	splash();

	initializeGame(false);

};



/**
* Initializes all the components of the game. to be called whenever starting a new game or 
* restarting the game.
*/
var initializeGame = function (nextlev) {

	gameEnded = false;
	WIDTH = 0;
	HEIGHT = 0;

	numBrickRows = 11;
	numBrickColumns = 10;

	brickArray = null;

	rightKeyDown = false;
	leftKeyDown = false;


	brickHitCounter = 0;
	
	endSoundPlayed = false;
	combo = 0;
	paddleHit = false;

	WIDTH = 700; //$("#canvas").width();
	HEIGHT =  600; //$("#canvas").height();

	canvasMinX = $("#canvas").offset().left;
	canvasMaxX = canvasMinX + WIDTH;


	ball = new Ball(12, WIDTH / 2 - 50, HEIGHT / 2 + 50);
	paddle = new Paddle(WIDTH / 2, HEIGHT - 20, 80, 15);

	//brick = new Brick(WIDTH / 2, HEIGHT - 25, 68, 28, 1);	
	initBrickArray(numBrickColumns, numBrickRows);

	if (nextlev === false) {
		level = 1;
		livesLeft = 5;
		score = 0;
	}

	loadNextLevel();

	bricksLeft();

};





/**
* Creates a two dimensional array by creating an array of arrays and instantiates it 
* with the Brick objects.
*/
var initBrickArray = function (cols, rows) {
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
* This function iterates the arrays of Brick objects and counts how many bricks are currently
* in the active state, meaning that they are visible on the board.
*/
var bricksLeft = function () {
	for (var p = 0; p < numBrickColumns; p++){
		for (var q = 0; q < numBrickRows; q++){
			if (brickArray[p][q].isActive === true){
        		brickHitCounter++;
      		}
    	}
	}
};




/*
* Performs the necessary operations once the ball hits the floor. Includes subtracting a life, 
* resetting the ball, countdown animation, starting the next round.
*/
var roundOver = function() {
	livesLeft = livesLeft - 1;
	
	if (livesLeft < 0){
		gameState = GAME_OVER;
	}else{
		ball.xpos = WIDTH / 2 - 50;
		ball.ypos =  HEIGHT / 2 + 50;
		ball.speedX = 0;
		
		// count down animation
		gameState = COUNTDOWN_ANIMATION;
	}
};


