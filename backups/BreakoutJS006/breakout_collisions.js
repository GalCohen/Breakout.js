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
			score = score + (combo * 15);
			//score = Math.round(score);
			
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

                        if (brickExplosionArray.length < 5){
				        	brickExplosionArray.push(new DrawBrickExplosion(brickArray[p][q].xpos, brickArray[p][q].ypos, brickArray[p][q].width, brickArray[p][q].height ));
			        	}else{
				        	scoreArray.shift();
                            brickExplosionArray.push(new DrawBrickExplosion(brickArray[p][q].xpos, brickArray[p][q].ypos, brickArray[p][q].width, brickArray[p][q].height ));
			        	
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




