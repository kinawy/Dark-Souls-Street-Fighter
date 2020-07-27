// Create image elements to then change source of to the url for the pixel art


// Global variables
let ctx;
let pontiff;
let artorius;
let p1Image;
let p2Image;

// function to get player1 to move
const play1Move = (e) => {
  // Switch statement for the two keys P1 will be using
  switch(e.code) {
      case "KeyA":
          if(pontiff.x > 0) {
              pontiff.x -= 50;
          }
          break
      case "KeyD":
          if(pontiff.x + pontiff.width < game.width) {
              pontiff.x += 50
          }
          break
  }
}
// function to get player2 to move
const play2Move = (e) => {
  
  // Switch statement for the two keys P2 will be using
  
  switch(e.code) {
    
      case "ArrowLeft":
          if(artorius.x  > 0) {
              artorius.x -= 50;
              console.log("artorius is movin")
              console.log(artorius.x)
          }
          break
      case "ArrowRight":
          if(artorius.x + artorius.width < game.width) {
              artorius.x += 50
          }
          break
  }
}


// Create characters
const gamePlay = () => {
  ctx.clearRect(0, 0, game.width, game.height);
  // Check if Pontiff and Artorius are alive, if so, render them
  if (pontiff.alive || artorius.alive) {
    pontiff.render();
    artorius.render();
  }


}



// Function to create player 1, not sure how to get image loaded properly
function Player1(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.health = 50;
    this.damage = 10;
    this.alive = true;
    this.render = function() {
        
      ctx.drawImage(p1Image, this.x, this.y, this.width, this.height);
        
    }
  }
  // Function to create player 2, identical to Player 1 but not sure about adding images
  function Player2(x, y, width, height) {
      this.x =x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.health = 50;
      this.damage = 10;
      this.alive = true;
      this.render = function () {
        
        ctx.drawImage(p2Image, this.x, this.y, this.width, this.height)
      }
  }





// Loads Dom, has game variable, as well as sets game attributes and trying to render my characters
document.addEventListener('DOMContentLoaded', () => {
    
    
    let game = document.getElementById('game');

    
    
    
    game.setAttribute('height', 1000);
    game.setAttribute('width', 1000);
    ctx = game.getContext('2d');

    p1Image = document.createElement('img');
    p2Image = document.createElement('img');

    p1Image.src = './images/Pontiff.gif';
    p2Image.src = './images/Artorius.gif';

    pontiff = new Player1(50, 500, 400, 400);
    artorius = new Player2(600, 500, 400, 400);
    
    // pontiff.render();
    // artorius.render();
    document.addEventListener('keydown', play1Move);
    document.addEventListener('keydown', play2Move);

    let runGame = setInterval(gamePlay, 60);

    
    
})