// Global variables
let topRight;
let ctx;
let pontiff;
let horace;
let p1Image;
let p2Image;
let menu;
let mySound;
let gravity = 5;
let keyArray = [];
// Animation object for player1
let pontAnimations = {
  column: [0, 300, 600, 900, 1200],
  idle: [0],
  walking: [0],
}
// Animation object for player2
let horaceAnimations = {
  column: [0, 300, 600, 900, 1200],
  idle: [0],
  walking: [0]
}

// function to provide each player with a moveset
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
    if (player1.y > 700) {
      player1.y -= 500;
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
    if (player2.y > 700) {
      player2.y -= 500;
    }
  }

  if (keyArray['Space']) {
    console.log(player1.attackRange)
    if (player1.attackRange == true) {
      player1.attackState = true;
      playerAttackHandler();

      console.log('player2.health', player2.health, player2)
    }
  }
  else {
    player1.attackState = false;
  }

  if (keyArray['Numpad0']) {
    if (player2.attackRange == true) {
      player2.attackState = true;
      playerAttackHandler();
      console.log('player1.health', player1.health, player1)
    }
  }
  else {
    player2.attackState = false;
  }
}

// Animates the walking of each character
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

// Deals damage for each player
const playerAttackHandler = () => {
  if (player1.attackState === true) {

    player2.health -= player1.damage

  }
  if (player2.attackState === true) {

    player1.health -= player2.damage
  }
}

// Detect hit for players
const hitDetection = () => {
  if (player1.x + player1.width - 200 > player2.x &&
    player1.x + 200 < player2.x + player2.width
  ) {

    player1.attackRange = true;
    player2.attackRange = true;
  } else {

    player1.attackRange = false;
    player2.attackRange = false;
  }

}

// const mainMenu = () => {
  
//   container = document.querySelector('#container');
//   menu = document.createElement('aside');
//   menu.setAttribute('id', 'top-left')
//   console.log(container, menu)
//   container.prepend(menu)


// }

// Create function to create game over screen
const gameOver = () => {
  document.getElementById('gameover').style.display = 'block';
} 


// Detect if players are alive, if one is dead, game over
const winFunction = () => {
  topRight = document.getElementById('top-right')
  if (player1.health === 0) {
    clearInterval(runGame, animationInterval)
    gameOver()
    topRight.innerText = 'Pontiff Sulyvahn has been banished';
    

  }
  if (player2.health === 0) {
    clearInterval(runGame, animationInterval)
    gameOver()
    topRight.innerText = 'Horace has been banished';

  }
  
}




// Create characters
const gamePlay = () => {

  ctx.clearRect(0, 0, game.width, game.height);
  player1.render();
  player2.render();
  playerActionHandler();
  hitDetection();
  checkForGround();
  winFunction();


}

// Function to create player 1, not sure how to get image loaded properly
function Creator(x, y, width, height, playerCharacter, playerNumber, health) {
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
  this.health = health;
  this.damage = 1;
  // Sets player to alive, to be changed after taking 50 damage
  this.alive = true;
  // Set a players attack state to help with animation
  this.attackState = false;
  this.attackRange = false;
  this.actionState = 'idle';
  this.movementStep = 0;
  this.actionRow = 0;
  this.render = function () {
    let charImage;
    let charAnimations;

    if (playerCharacter === 'Pontiff') { charImage = pontiff; charAnimations = pontAnimations }
    if (playerCharacter === 'Horace') { charImage = horace; charAnimations = horaceAnimations }
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

  let audio1 = document.getElementById('playme');
  audio1.volume = .2;
  
  // Grabs canvas
  
  game = document.getElementById('game');



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
  player1 = new Creator(50, 700, 300, 300, 'Pontiff', 1, 200);
  player2 = new Creator(600, 700, 300, 300, 'Horace', 2, 200);


  // Listen for Keys tied to moveList
  document.addEventListener('keydown', (e) => {
    keyArray[e.code] = true;
  });
  document.addEventListener('keyup', (e) => {
    keyArray[e.code] = false;
  });

  


  runGame = setInterval(gamePlay, 5);
  animationInterval = setInterval(playerAnimationHandler, 80);





})
document.getElementById('start').addEventListener('click', () => {
  topRight.innerText = '';
  document.getElementById('container').style.display = 'grid';
  document.getElementById('menu').style.display = 'none';
  
})

document.getElementById('newmenu').addEventListener('click', () => {
  document.getElementById('container').style.display = 'none'
  document.getElementById('menu').style.display = 'block';
})
document.getElementById('restart').addEventListener('click', () => {
  topRight.innerText = '';
  document.getElementById('gameover').style.display = 'none';

    // Grabs canvas

    game = document.getElementById('game');



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
    player1 = new Creator(50, 700, 300, 300, 'Pontiff', 1, 200);
    player2 = new Creator(600, 700, 300, 300, 'Horace', 2, 200);
  
  
    // Listen for Keys tied to moveList
    document.addEventListener('keydown', (e) => {
      keyArray[e.code] = true;
    });
    document.addEventListener('keyup', (e) => {
      keyArray[e.code] = false;
    });
  
    
  
  
    runGame = setInterval(gamePlay, 5);
    animationInterval = setInterval(playerAnimationHandler, 80);
})