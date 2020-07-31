# Dark-Souls-Fight-Club
Project 1 for General Assembly required me to make a game, I chose to do a Dark Souls style Street Fighter mini clone, it turned out awesome.

## Where to find
Play Dark Souls Street Fighter here: 
[Dark Souls Street Fighter](https://kinawy.github.io/Dark-Souls-Street-Fighter/)

### You just need a web browser to play this game.

## HTML

I used HTML Canvas for this project, and it was a love hate relationship, on the one hand I recognize it's a powerful tool, on the other I could absolutely live without the limitations on manipulation for it.

I found it easier to put my canvas inside of a main div, then used divs for all of the other stuff I chose not to append through JS, then hid them.

```html
<div id="menu">
        <h1>Dark Souls Fight Club</h1>
        <button id="start">Start Game</button>
        <button id="instruct">Instructions</button>


    </div>
    <div id="container">
        <aside id="top-left">
            <h2>Dark Souls Fight Club</h2>
        </aside>
        <aside id="top-right">
            <h2 id="movement"></h2>
        </aside>

        <main>
            <canvas id="game">
            </canvas>
            <div id="gameover">
                <button id="restart">Rekindle your Ember?</button>
                <button id="newmenu">Main Menu</button>
            </div>
        </main>
    </div>
    <div id="instructions">
        <h1>How To Play</h1>
        <ol>
            <li>You do not talk about Dark Souls Fight Club</li>
            <li>Run, Jump, and Slash your way to victory over you're opponent.</li>
            <li>If you are Pontiff use W,A,D to move, and Space to attack.</li>
            <li>if you are Horace use Up, Left, Right arrows to move, and Numpad0 to attack.</li>
        </ol>
    </div>


    

    <audio id="playme" autoplay loop>
    <source src="sounds/DS3Menu.mp3"></source>
    </audio>
```

As you can see I also added an audio tag, that comes hidden automatically.

## CSS

For CSS I drew a little bit from the Canvas Crawler we had done, but also added plenty of my own styling. I changed fonts a couple times, and found it easier to set things display to none and style them up, before they would actually appear.

```css
#gameover {
  display: none;
  width: 500px;
  height: 250px;
  border: solid black 5px;
  border-radius: 10px;
  background-image: url("../images/YouDied.png");
  background-repeat: no-repeat;
  background-size: 500px 250px;
  position: relative;
  left: 250px;
  top: -500px;
  margin-right: 0;
  margin-left: 0;
  z-index: 2;
  text-align: center;
}

#instructions {
  display: none;
  width: 500px;
  height: 250px;
  border: solid black 5px;
  border-radius: 10px;
  background-repeat: no-repeat;
  background-size: 500px 250px;
  position: relative;
  left: 400px;
  top: 100px;
  margin-right: 0;
  margin-left: 0;
  z-index: 2;
  text-align: center;
  color: white;
  font-size: large;
}
```

## JS

The JavaScript was certainly the hardest part of the game, what I had initially assumed would be a relatively light undertaking, turned out taking the most time.
While canvas is powerful, animating sprites proved to be quite the undertaking.  My player constructor was quite large, and not super DRY, but I plan on touching it up over time, especially if I can get a sprite package for my code.

```javascript
function Creator(x, y, width, height, playerCharacter, playerNumber) {
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
  this.health = 300;
  this.damage = 1;
  // Sets player to alive, to be changed after taking 50 damage
  this.alive = true;
  // Set a players attack state to help with animation
  this.attackState = false;
  this.attackRange = false;
  // Set actionState to idle to help with animation
  this.actionState = "idle";
  this.movementStep = 0;
  this.color = "red";
  this.actionRow = 0;
  this.render = function () {
    let charImage;
    let charAnimations;

    // Sets the image and animation object for each character
    if (playerCharacter === "Pontiff") {
      charImage = pontiff;
      charAnimations = pontAnimations;
    }
    if (playerCharacter === "Horace") {
      charImage = horace;
      charAnimations = horaceAnimations;
    }
    // Idle render
    // Draws the characters
    ctx.drawImage(
      charImage, // Character Image
      charAnimations["column"][this.movementStep], // Passes the first array, column key of pontAnimations, and the number of its movementStep, movementStep increases through the column array.
      charAnimations[this.actionState][this.actionRow], // Passes the action state key and the index of 0 to provide an idle setting.
      300, // Size of image height and width
      300,
      this.x, // X and Y coordinates passed to it
      this.y,
      this.width,
      this.height
    );
  };
  this.attackRender = function () {
    charImage = pontiff;
    charAnimations = pontAnimations;
    ctx.drawImage(
      charImage, // Character Image
      charAnimations["column"][this.movementStep], // Passes the first array, column key of pontAnimations, and the number of its movementStep, movementStep increases through the column array.
      charAnimations["attackRow"][this.actionRow], // Passes the action state key of the attackRow which is set to 300 isntead of 0 to provide an attack Idle setting.
      300, // Size of image height and width
      300,
      this.x, // X and Y coordinates passed to it
      this.y,
      this.width,
      this.height
    );
  };
  this.rotateFunction = function () {
    charImage = horaceAngle;
    charAnimations = horaceAngleAnimations;
    ctx.drawImage(
      charImage, // Character Image
      charAnimations["column"][this.movementStep], // Passes the first array, column key of pontAnimations, and the number of its movementStep, movementStep increases through the column array.
      charAnimations[this.actionState][this.actionRow], // Passes the action state key of the attackRow which is set to 300 isntead of 0 to provide an attack Idle setting.
      300, // Size of image height and width
      300,
      this.x, // X and Y coordinates passed to it
      this.y,
      this.width,
      this.height
    );
  };
}
```

As you can see, it's almost 100 lines of code just for the constructor, I look forward to understanding a cleaner method in the future though.

## Author
- Sameh Kinawy
- Feel free to contribute!!

This project is built with HTML, CSS, and JS

## Thank You's

Thanks to FromSoftware for making such a great adventure, I was happy to use them as inspiration, and look forward to doing so in the future.

Special thanks to Anthony Gregis for helping to understand animation, Brandon Goldenberg for helping me to understand gravity, and all the GA instructors who helped me to push through some obstacles.

### Thanks for checking out Dark Souls Fight Club, and always remember the first rule...



