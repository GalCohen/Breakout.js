/* ************************************ COLLISIONS ************************************ */

/**
* This function provides simple collision detection between the walls of the canvas and the ball
* as well as the ball and the paddle.
*/
var moveBallDetectCollision = function() {
	
	if ((ball.xpos + ball.speedX + ball.radius) > WIDTH || ball.xpos + ball.speedX - ball.radius < 0){
		ball.speedX = -ball.speedX;
		if (audioWorks === true) {
			wallSound.play();
		}
	}
	
	if (ball.ypos + ball.speedY - ball.radius < 0){
		ball.speedY = -ball.speedY;
		if (audioWorks === true) {
			wallSound.play();
		}
		
	}else if (ball.ypos + ball.speedY + ball.radius > HEIGHT-paddle.height-15 &&
		ball.xpos + ball.radius + ball.speedX > paddle.xpos &&
        ball.xpos - ball.radius + ball.speedX < paddle.xpos + paddle.width) {
			

            var speed  = paddle.width/2;
            speed = paddle.xpos + speed;
            speed = ball.xpos - speed;
            speed = (speed / paddle.width);
            speed = speed * 8;
            ball.speedX = speed;
            ball.speedX = Math.round(ball.speedX);

            //ball.speedY = -ball.speedY;
			
            speed = (0.3 * ball.speedY) + (0.7 * currentSpeed);
            
            //ensure that the speed is never less than |9|
            if ((speed < 0) === true && speed < -9) {
               speed = -9;
            };
            if ((speed > 0) === true && speed < 9) {
               speed = 9;
            };

            ball.speedY = -Math.round(speed);

            //console.log(ball.speedY);

			if (audioWorks === true) {
				paddleSound.play();
			}
			
			paddleHit = true;
			var old = score;
			score = score + (combo * 15);
			
			if (combo > 2){
				if (scoreArray.length < 5){
					scoreArray.push(new DrawScore(WIDTH/2-30, HEIGHT/2, true,score-old));
				}else{
					scoreArray.shift();
					scoreArray.push(new DrawScore(WIDTH/2-30, HEIGHT/2, true,score-old));
				}
			}
			combo = 0;
			
					
		
	} else if (ball.ypos + ball.speedY + ball.radius > HEIGHT){
		roundOver(); 
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
                        
                        randomizePowerUp(brickArray[p][q].xpos, brickArray[p][q].ypos);
						paddleHit = false;
						
					}
				}
			}
		}
	}
};



/* *
 * This function handles the logic of the collisions between the paddle and a powerup. If a collision occurs, 
 * the powerup is activated, and lasts until its duration runs out or a new powerup is collides with it.
 * */
var paddlePowerUpCollision = function(){
    //iterate through all the powerups and check if the ball is within their area.
    for (var r = 0; r < powerupArray.length; r++){
        if (powerupArray[r].state === 1){
            if (powerupArray[r].ypos + powerupArray[r].speedY + powerupArray[r].height > HEIGHT-paddle.height-15 &&
                powerupArray[r].xpos + powerupArray[r].width > paddle.xpos &&
                powerupArray[r].xpos - powerupArray[r].width < paddle.xpos + paddle.width) {
                            
                var newPowerup = new PowerUp(1, 1, 1);
                newPowerup.type = powerupArray[r].type;
                newPowerup.activate(); 
                
                powerupArray[r].state = 3;
                //console.log("hit powerup");
                if (activePowerupArray.length < 5){
					activePowerupArray.push(newPowerup);
				}else{
                    activePowerupArray.shift();
					activePowerupArray.push(newPowerup);
				}

                if (audioWorks === true) {
                    if (newPowerup.isGood === true){
                        powerupGoodUpSound.play();
                    }else{
                        powerupBadUpSound.play();
                    }
                }	

                removeOppositePowerup(newPowerup.type);
                score = score + 15;
            }
        }
    }

};


var calculatePaddleSpeed = function(){
    lastSampledPos = sampledPos; 
    sampledPos = paddle.xpos;

    currentSpeed = Math.abs(lastSampledPos - sampledPos);
    currentSpeed = currentSpeed / 2; //difference in the displacement over time(2 frames?)
    //console.log("currentSpeed:"+currentSpeed);
    
    if (currentSpeed > 20){
        currentSpeed = 20;
    }

    if (currentSpeed < 9 ){
        currentSpeed = 9;
    }
};

