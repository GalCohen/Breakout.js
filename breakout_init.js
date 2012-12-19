//TODO: ball stuck in paddle bug
//TODO: ball stuck in wall bug
//TODO: sound effect for winning, countdown timer
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

var currentSpeed = 0;
var sampledPos = 0;
var lastSampledPos = 0;

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
var gameWonImg;

var oneImg;
var twoImg;
var threeImg;

var brick1Img;
var brick2Img;
var brick3Img;
var brick4Img;

var brick1_1;
var brick1_2;
var brick1_3;
var brick1_4;
var brick1_5;
var brick1_6;
var brick1_7;
var brick1_8;
var brick1_9;
var brick1_10;
var brick1_11;
var brick1_12;


var ballImg;
var paddleImg;

var ballLargeImg;
var ballSmallImg;
var paddleLargeImg;
var paddleSmallImg;

var livesLeft = 5;
var brickHitCounter = 0;
var level = 1;


var frame = 0;
var endSoundPlayed = false;

var score = 0; 
var combo = 0;
var paddleHit = false;

var scoreArray = []; 
var brickExplosionArray = []; 
var powerupArray = []; 
var activePowerupArray =[];

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

ballLargeImg = new Image();
ballLargeImg.src = 'ball_large.png';

ballSmallImg = new Image();
ballSmallImg.src = 'ball_small.png';

paddleLargeImg = new Image();
paddleLargeImg.src = 'paddle_large.png';

paddleSmallImg = new Image();
paddleSmallImg.src = 'paddle_small.png';

nextLevelImg = new Image();
nextLevelImg.src = 'nextlevel.jpg';

scoreBoardImg = new Image();
scoreBoardImg.src = 'scoreboard.jpg';

splashImg = new Image();
splashImg.src = 'splashScreen.jpg';

gameWonImg = new Image();
gameWonImg.src = 'gamewon.jpg';

oneImg = new Image();
oneImg.src = 'One.png';

twoImg = new Image();
twoImg.src = 'Two.png';

threeImg = new Image();
threeImg.src = 'Three.png';



var powerup_ball_large_img;
var powerup_ball_small_img;
var powerup_paddle_large_img;
var powerup_paddle_small_img;

powerup_paddle_small_img = new Image();
powerup_paddle_small_img.src = 'powerup_paddle_small.png';

powerup_paddle_large_img = new Image();
powerup_paddle_large_img.src = 'powerup_paddle_large.png';

powerup_ball_small_img = new Image();
powerup_ball_small_img.src = 'powerup_ball_small.png';

powerup_ball_large_img = new Image();
powerup_ball_large_img.src = 'powerup_ball_large.png';


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
var powerupGoodUpSound = document.createElement('audio');  
var powerupGoodDownSound = document.createElement('audio');  
var powerupBadUpSound = document.createElement('audio');  
var powerupBadDownSound = document.createElement('audio');  

var audioWorks = false;

if (brickSound.canPlayType('audio/ogg') === "probably" || brickSound.canPlayType('audio/ogg') === "maybe") {
	brickSound.setAttribute('src', 'brickSound.ogg');
	paddleSound.setAttribute('src', 'paddleSound.ogg');
	wallSound.setAttribute('src', 'wallSound.ogg');
	pauseSound.setAttribute('src', 'pauseSound.ogg');
	endSound.setAttribute('src', 'endSound.ogg');
    powerupGoodUpSound.setAttribute('src', 'powerupGoodUpSound.ogg');
    powerupGoodDownSound.setAttribute('src', 'powerupGoodDownSound.ogg');
    powerupBadUpSound.setAttribute('src', 'powerupBadUpSound.ogg');
    powerupBadDownSound.setAttribute('src', 'powerupBadDownSound.ogg');

	audioWorks = true;
	
} else if (brickSound.canPlayType('audio/mpeg') === "probably" || brickSound.canPlayType('audio/mpeg') === "maybe") {
	brickSound.setAttribute('src', 'brickSound.mp3');
	paddleSound.setAttribute('src', 'paddleSound.mp3');
	wallSound.setAttribute('src', 'wallSound.mp3');
	pauseSound.setAttribute('src', 'pauseSound.mp3');
	endSound.setAttribute('src', 'endSound.mp3');
    powerupGoodUpSound.setAttribute('src', 'powerupGoodUpSound.mp3');
    powerupGoodDownSound.setAttribute('src', 'powerupGoodDownSound.mp3');
    powerupBadUpSound.setAttribute('src', 'powerupBadUpSound.mp3');
    powerupBadDownSound.setAttribute('src', 'powerupBadDownSound.mp3');

	audioWorks = true;
	
} else {
	brickSound.setAttribute('src', 'brickSound.wav');
	paddleSound.setAttribute('src', 'paddleSound.wav');
	wallSound.setAttribute('src', 'wallSound.wav');
	pauseSound.setAttribute('src', 'pauseSound.wav');
	endSound.setAttribute('src', 'endSound.wav');
    powerupGoodUpSound.setAttribute('src', 'powerupGoodUpSound.wav');
    powerupGoodDownSound.setAttribute('src', 'powerupGoodDownSound.wav');
    powerupBadUpSound.setAttribute('src', 'powerupBadUpSound.wav');
    powerupBadDownSound.setAttribute('src', 'powerupBadDownSound.wav');

	audioWorks = true;
}


if (audioWorks === true){
	brickSound.load();
	paddleSound.load();
	wallSound.load();
	pauseSound.load();
	endSound.load();
    powerupGoodUpSound.load();
    powerupGoodDownSound.load();
    powerupBadUpSound.load();
    powerupBadDownSound.load();
}

/**
* The Ball Object constructor, contains the fields regarding the dimensions and
* location of the ball as well as methods such as Ball.Draw to draw the ball on the canvas.
*/
var Ball = function (rad, x, y) {
	this.radius = rad;
	this.xpos = x;
	this.ypos = y;
	this.speedX = 0;
	this.speedY = 10;
    this.sizeState = 0; // 0 = normal, 1 = larger, -1 = smaller

	this.draw = function () {
        if (this.sizeState === 0){
            this.radius = ballImg.width / 2 + 2;
            canvas.drawImage(ballImg, this.xpos, this.ypos, ballImg.width, ballImg.height);
        }else if (this.sizeState === 1){
            this.radius = ballLargeImg.width / 2 + 2;
            canvas.drawImage(ballLargeImg, this.xpos, this.ypos, ballLargeImg.width, ballLargeImg.height);
        }else if (this.sizeState === -1){
            this.radius = ballSmallImg.width / 2 + 2;
            canvas.drawImage(ballSmallImg, this.xpos, this.ypos, ballSmallImg.width, ballSmallImg.height);
        } 
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
    this.sizeState = 0; // 0 = normal, 1 = bigger, -1 = smaller

	this.draw = function () {
		if (this.sizeState === 0){
            this.width = paddleImg.width;
            canvas.drawImage(paddleImg, this.xpos, this.ypos, this.width, this.height);
        }else if (this.sizeState === 1){
            this.width = paddleLargeImg.width;
            canvas.drawImage(paddleLargeImg, this.xpos, this.ypos, this.width, this.height);
        }else if (this.sizeState === -1) {
            this.width = paddleSmallImg.width;
           canvas.drawImage(paddleSmallImg, this.xpos, this.ypos, this.width, this.height);
        }
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
			canvas.drawImage(brick1Img, this.xpos, this.ypos, this.width, this.height);
		} else if (this.type === 2) {
			canvas.drawImage(brick2Img, this.xpos, this.ypos, this.width, this.height);
		} else if (this.type === 3) {
			canvas.drawImage(brick3Img, this.xpos, this.ypos, this.width, this.height);
		} else if (this.type === 4) {
			canvas.drawImage(brick4Img, this.xpos, this.ypos, this.width, this.height);
		} else {
			canvas.fillStyle = "#F0F0F0";
			canvas.beginPath();
			canvas.rect(this.xpos, this.ypos, this.width, this.height);
			canvas.closePath();
			canvas.fill();
		}
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
	};
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
	};
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

    scoreArray = []; 
    brickExplosionArray = []; 
    powerupArray = [];  
    activePowerupArray = []; 

	ball = new Ball(14, WIDTH / 2 - 50, HEIGHT / 2 + 50);
	paddle = new Paddle(WIDTH / 2, HEIGHT - 20, 80, 15);

    sampledPos = paddle.xpos;
    lastSampledPos = paddle.xpos;
    currentSpeed = ball.speedY;

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



/* *
 * This object is responsible for the creation and maintenance of the various powerups the player can pick up.
 * 
 * */
var PowerUp = function(x, y, t) {
    this.type = t;
    this.duration = 0;
    this.xpos = x;
    this.ypos = y;
    this.speedY = 6;
    this.counter = 0;
    this.width = powerup_ball_large_img.width - 5;
    this.height = powerup_ball_large_img.width - 5;
    this.state = 1;
    this.isGood = true;
    this.playedsound = false;

    //according to the type of the powerup, change the duration it is visible for, the image that will be 
    //drawn, and the speed at which it falls down the screen.
    switch (this.type){

        case 1: //incease paddle size
            this.duration = 180;
            this.speedY = 8;
            this.isGood = true;
            break;
        case 2: //decrease paddle size
            this.duration = 210;
            this.speedY = 5;
            this.isGood = false;
            break;
        case 3: // increase ball size
            this.duration = 180; 
            this.speedY = 7;
            this.isGood = true;
            break;
        case 4: // decrease ball size
            this.duration = 210; 
            this.speedY = 4;
            this.isGood = false;
            break;
    }
    
    //console.log("x:"+this.xpos+", y:"+this.ypos+", speed:"+this.speedY+", type:"+this.type);
    

    this.draw = function(){
    
            if (this.state === 1) {
                switch(this.type) {
                    case 1:
                         canvas.drawImage(powerup_paddle_large_img, this.xpos, this.ypos, powerup_paddle_large_img.width-5 , powerup_paddle_large_img.height-5);
                         break;
                    case 2:
                         canvas.drawImage(powerup_paddle_small_img, this.xpos, this.ypos, powerup_paddle_small_img.width-5, powerup_paddle_small_img.height-5);
                         break;
                    case 3:
                        canvas.drawImage(powerup_ball_large_img, this.xpos, this.ypos, powerup_ball_large_img.width-5 ,powerup_ball_large_img.height-5);
                        break;
                    case 4:
                        canvas.drawImage(powerup_ball_small_img, this.xpos, this.ypos, powerup_ball_small_img.width-5  , powerup_ball_small_img.height-5);
                        break;
                    default:
                        console.log("error drawing powerup. type:"+this.type);
                }

                //console.log("powerup drawn");

                if (this.ypos + this.speedY > HEIGHT ){
                    console.log("powerup fell through");
                    this.state = 4;
                }
            }
    };
    

    this.activate = function(){
        //console.log("power up on!");
        this.state = 2;
        //according to the type of the powerup, change the duration it is visible for, the image that will be 
        //drawn, and the speed at which it falls down the screen.
        switch (this.type){

            case 1: //incease paddle size
                this.duration = 130;
                this.speedY = 8;
                this.isGood = true;
                break;
            case 2: //decrease paddle size
                this.duration = 180;
                this.speedY = 5;
                this.isGood = false;
                break;
            case 3: // increase ball size
                this.duration = 130; 
                this.speedY = 7;
                this.isGood = true;
                break;
            case 4: // decrease ball size
                this.duration = 180; 
                this.speedY = 4;
                this.isGood = false;
                break;
        }

    };



    this.maintainPowerUp = function(){
        if (this.state === 2){
            this.counter++;

            if (this.counter >= this.duration){
                //deactivate powerup
                this.state = 3;
                //console.log("powerup done");
            }
        }    
    };
    
};



var removeOppositePowerup = function(type){
    var oppType;

    if (activePowerupArray.length === 1){
        return;
    }

    switch(type) {
        case 1:
            oppType = 2;
            break;
        case 2:
             oppType = 1;
             break;
        case 3:
            oppType = 4;
            break;
        case 4:
             oppType = 3;
             break;
        default:
            console.log("error here");
            break;
    }


    //go through the list of powerups in reverse order and remove the firs
    //item that is of opposite powerup type.
    var firstfound = false;
    var poweruptoremove;
    for (var t = activePowerupArray.length-1; t >= 0; t--){
        if (activePowerupArray[t].state === 2 && activePowerupArray[t].type === oppType){
            //activePowerupArray[t].state = 4;           
           /* if (firstfound === false){
                poweruptoremove = t;
                firstfound = true;
            }else if (firstfound === true){
                activePowerupArray[poweruptoremove].state = 4; 
                console.log("removed old opposing powerup");
                break;
            }
            */
            activePowerupArray[t].state = 4;
            console.log("remove opp powerup");
            break;
        }
    }

   //if two of the same powerups are in the list, remove the second.
   //keep the most recent
    firstfound = false;
   for (t = 0; t < activePowerupArray.length; t++){
        if (activePowerupArray[t].state === 2 && activePowerupArray[t].type === type){
            if (firstfound === false) {
                //this first find of the given powerup
                firstfound = true;
            }else if (firstfound === true){
                //the second find of the same powerup
                activePowerupArray[t].state = 4;
                break;
            }
        }
   }

};


/* *
 * Placed after a brick collision, this function randomly decides if a powerup object
 * should be created and of which type of powerup.
 * */
var randomizePowerUp = function(brickx, bricky){
    var randomNumber = Math.floor(Math.random()*40);
    var type;
    var chosen = false;

    if (randomNumber === 5){
       // console.log("powerup increase paddle size randomized");
        type = 1;
        chosen = true;
    }else if (randomNumber === 10){
        //console.log("powerup decrease paddle size randomized");
        type = 2;
        chosen = true;
    }else if (randomNumber === 15){
        //console.log("powerup increase ball size  randomized");
        type = 3; 
        chosen = true;
    }else if (randomNumber === 20){
        //console.log("powerup decrease ball size randomized");
        type = 4;
        chosen = true;
    }


    if (chosen === true){
         if (powerupArray.length < 5){
             powerupArray.push(new PowerUp(brickx, bricky, type));
         }else{
             powerupArray.shift();
            powerupArray.push(new PowerUp(brickx, bricky, type));
         }
    }
   
};


var ball = new Ball(14, WIDTH / 2 - 50, HEIGHT / 2 + 50);
var paddle = new Paddle(WIDTH / 2, HEIGHT - 20, 80, 15);


