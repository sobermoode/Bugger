// Enemies our player must avoid
var Enemy = function( startY, orientation ) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.orientation = ( orientation % 2 === 0 ) ? "going right" : "going left";
    this.sprite = ( this.orientation === "going right" ) ? 'images/enemy-bug.png' : 'images/enemy-bug-R.png';
    this.x = ( this.orientation === "going right" ) ? -101 : 589;
    this.y = startY * 83; // each enemy appears on the next row

    // enemy speed can vary between 25 and 150;
    // some bugs may be fast and can have a speed
    // of up to 200;
    // getSpeed() returns a random value based on
    // this criteria
    this.speed = this.getSpeed();

    return this;
}

Enemy.prototype.getSpeed = function()
{
    var isFast = Math.floor( ( Math.random() * 2 ) + 1 );
    var speed = 0;

    // determination if the enemy is "fast";
    // base speed and max speed is increased by 25
    if( isFast === 2 )
    {
        speed = Math.floor( ( Math.random() * 175 ) + 50 );
    }

    else
    {
        speed = Math.floor( ( Math.random() * 150 ) + 25 );
    }

    // multiply speed by -1 if the bug is "going left"
    speed *= ( this.orientation === "going right" ) ? 1 : -1;

    return speed;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += ( this.speed * dt );

    // check to see if the bug has gone off its respective edge;
    // if so, put it back in its starting position;
    // it's speed is re-randomized, as well
    if( this.orientation === "going right" )
    {
        if( this.x > 588 )
        {
            this.x = -101;
            this.speed = this.getSpeed();
            return;
        }
    }

    else if( this.orientation === "going left" )
    {
        if( this.x < -101 )
        {
            this.x = 589;
            this.speed = this.getSpeed();
            return;
        }
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// reset() re-randomizes all the bug's attributes and puts it offscreen
Enemy.prototype.reset = function( orientation )
{
    this.orientation = ( orientation % 2 === 0 ) ? "going right" : "going left";
    this.sprite = ( this.orientation === "going right" ) ? 'images/enemy-bug.png' : 'images/enemy-bug-R.png';
    this.x = ( this.orientation === "going right" ) ? -101 : 589;
    this.speed = this.getSpeed();
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function( startX, startY )
{
    // image chosen for the player
    this.sprite = 'images/char-boy.png';

    // player will start at the given location
    this.x = startX;
    this.y = startY;

    // initialize the movement to zero
    this.changeX = 0;
    this.changeY = 0;

    return this;
};

Player.prototype.update = function()
{
    // player attempts to move off the left edge of the board
    if( this.x + this.changeX < 0 )
    {
        this.x = 0;
    }

    // player attempts to move off the right edge of the board
    else if( this.x + this.changeX > 404 )
    {
        this.x = 404;
    }

    // player attempts to move off the top edge of the board
    else if( this.y + this.changeY < 0 )
    {
        this.y = 0;
    }

    // player attempts to move off the bottom edge of the board
    else if( this.y + this.changeY > 435 )
    {
        this.y = 435;
    }

    else
    {
        this.x += this.changeX;
        this.y += this.changeY;
    }

    // reset current movement
    this.changeX = 0;
    this.changeY = 0;
}

Player.prototype.render = function()
{
    ctx.drawImage( Resources.get( this.sprite ), this.x, this.y );
}

// this function uses the even listener defined below to determine
// which key was pressed and then how to move the player
// original movement was X:+-83 / Y:+-101 -
// +=30 gives the player more control and the game becomes
// more fast-paced.
Player.prototype.handleInput = function( key )
{
    switch( key )
    {
        case 'left':
            this.changeX = -30;
            break;

        case 'up':
            this.changeY = -30;
            break;

        case 'right':
            this.changeX = 30;
            break;

        case 'down':
            this.changeY = 30;
            break;

        default:
            break;
    }
}

// reset() puts the player back at the starting position with no movement values
Player.prototype.reset = function()
{
    this.x = 200;
    this.y = 600;

    this.changeX = 0;
    this.changeY = 0;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

// number of enemies to start with
var totalEnemies = 5;
var allEnemies = [];

// add the enemies to the allEnemies array
// the counter determines which row the enemy appears on
for( var enemyCounter = 0; enemyCounter < totalEnemies; enemyCounter++ )
{
    allEnemies.push( new Enemy( enemyCounter, Math.floor( ( Math.random() * 100 ) + 1 ) ) );
}

// Place the player object in a variable called player
var player = new Player( 200, 600 );

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
