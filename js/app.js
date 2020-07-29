// Global variables
let topRight;
let ctx;
let pontiff;
let artorius;
let p1Image;
let p2Image;
let gravity = 5;
let keyArray = [];
let pontAnimations = {
  column: [0, 300, 600, 900, 1200],
  idle: [0],
  walking: [0],
}
let horaceAnimations = {
  column: [0, 300, 600, 900, 1200],
  idle: [0],
  walking: [0]
}

// function to get player1 to move
const playerActionHandler = () => {


  if (keyArray['KeyA']) {
    if (player1.x + 50 > 0) {
      player1.x -= 3;
      player1.actionState = 'walking';
    }
  } else if (keyArray['KeyD']) {
    if (player1.x + player1.width < game.width) {
      player1.x += 3;
      player1.actionState = 'walking';
    }
  } else {
    player1.actionState = 'idle';
  }

  if (keyArray['KeyW']) {
    if (player1.y > 0) {
      player1.y -= 50;
    }
  }

  if (keyArray['ArrowLeft']) {
    if (player2.x > 0) {
      player2.x -= 3;
      player2.actionState = 'walking';
    }
  } else if (keyArray['ArrowRight']) {
    if (player2.x + player2.width < game.width) {
      player2.x += 3;
      player2.actionState = 'walking';
    }
  } else {
    player2.actionState = 'idle';
  }

  if (keyArray['ArrowUp']) {
    if (player2.y > 0) {
      player2.y -= 50;
    }
  }

  if (keyArray['Space']) {
    player1.attackState == true;
    playerAttackHandler();
    
    console.log(player2.health)
  }

  if (keyArray['ControlRight']) {
    player2.attackState == true;
    playerAttackHandler();
    console.log(player1.health)
  }
}

const playerAnimationHandler = () => {
  if (player1.actionState == 'walking') {
    if (player1.movementStep < 4) {
      player1.movementStep++;
    } else {
      player1.movementStep = 0;
    }
  }

  if (player2.actionState == 'walking') {
    if (player2.movementStep < 4) {
      player2.movementStep++;
    } else {
      player2.movementStep = 0;
    }
  }
}

// Applies gravity to the characters in a primitive manner
const checkForGround = () => {
  if (player1.y + player1.height <= 1000) {
    player1.y += gravity;
  } 
  if (player2.y + player2.height <= 1000) {
    player2.y += gravity;
  }


}

const playerAttackHandler = () => {
  if (player1.attackState == true) {

    player2.health = player2.health - player1.damage

  }
  if (player2.attackState = true) {
    player1.health = player1.health - player2.damage
  }
}

// Detect hit for players
const hitDetection = () => {
  if (player1.x + player1.width - 200 > player2.x &&
    player1.x + 200 < player2.x + player2.width
  ) {
    player1.attackState = true;
    player2.attackState = true;
  } else {
    player1.attackState = false;
    player2.attackState = false;
  }

}

// Detect if players are alive, if one is dead, game over
const winFunction = () => {
  topRight = document.getElementById('top-right')
  if (player1.health === 0) {
    player1.alive == false;
    topRight.innerText = 'Pontiff Sulyvahn has been banished';
    player1.health === 0;
  }
  if (player2.health === 0) {
    player2.alive == false;
    topRight.innerText = 'Artorius has been banished';
    player2.health === 0;
  }
  
}


// Create characters
const gamePlay = () => {
  ctx.clearRect(0, 0, game.width, game.height);
  playerActionHandler();
  hitDetection();
  checkForGround()
  

  // Check if Pontiff and Artorius are alive, if so, render them
  if (player1.alive || player2.alive) {
    player1.render();
    player2.render();
  }

  winFunction();


}

// Function to create player 1, not sure how to get image loaded properly
function Player(x, y, width, height, playerCharacter, playerNumber) {
  // Current Location where player lands
  this.x = x;
  this.y = y;
  // Size of the player
  this.width = width;
  this.height = height;

  // Chooses character
  this.playerCharacter = playerCharacter;
  this.playerNumber = playerNumber;
  // Sets health and Damage
  this.health = 200;
  this.damage = 1;
  // Sets player to alive, to be changed after taking 50 damage
  this.alive = true;
  // Set a players attack state to help with animation this.attackState =
  this.attackState = false;
  this.actionState = 'idle';
  this.attackStep = 0;
  this.movementStep = 0;
  this.actionRow = 0;
  this.attackRow = 0;
  this.render = function () {
    let charImage;
    let charAnimations;

    if (playerCharacter === 'Pontiff') { charImage = pontiff; charAnimations = pontAnimations }
    if(playerCharacter === 'Horace') { charImage = horace; charAnimations = horaceAnimations }
    // Idle render

    ctx.drawImage(
      charImage, // Character Image
      charAnimations['column'][this.movementStep], // Passes the first array, column key of pontAnimations, and the number of its movementStep, movementStep increases through the column array.
      charAnimations[this.actionState][this.actionRow], // Passes the action state key and the index of 0 to provide an idle setting.
      300,
      300,
      this.x, this.y, this.width, this.height)
  }
}

// Loads Dom, has game variable, as well as sets game attributes and trying to render my characters
document.addEventListener('DOMContentLoaded', () => {

  // Grabs canvas

  let game = document.getElementById('game');



  // Sets canvas attributes for size and type
  game.setAttribute('height', 1000);
  game.setAttribute('width', 1000);
  ctx = game.getContext('2d');

  // create images for characters
  pontiff = new Image();
  horace = new Image();
  // Load Spritesheets
  pontiff.src = './images/PontiffSprite.png';
  horace.src = './images/HoraceSprite.png';


  // Create player models
  player1 = new Player(50, 700, 300, 300, 'Pontiff', 1);
  player2 = new Player(600, 700, 300, 300, 'Horace', 2);


  // Listen for Keys tied to moveList
  document.addEventListener('keydown', (e) => {
    keyArray[e.code] = true;
  });
  document.addEventListener('keyup', (e) => {
    keyArray[e.code] = false;
  });


  let runGame = setInterval(gamePlay, 5);
  let animationInterval = setInterval(playerAnimationHandler, 80);





})