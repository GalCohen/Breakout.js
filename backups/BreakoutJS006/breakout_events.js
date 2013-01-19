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

 
