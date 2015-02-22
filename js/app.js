// Enemies our player must avoid
var Enemy = function( startX, startY ) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = startX;
    this.y = startY;

    // the standard movement factor is 1, otherwise, the
    // bugs move too slowly, +1 is added to the random
    // number generated for the initial speed. some bugs
    // may be fast and move at double speed.
    var isFast = Math.floor( Math.random() + 2 );
    if( isFast == 2 )
    {
        this.speed = ( Math.random() + 1 ) * 2;
    }

    else
    {
        this.speed = Math.random() + 1;
    }

    return this;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += ( this.speed * dt );

    // check to see if the bug has gone off the right edge;
    // if so, put it back on the left side
    // it's speed is re-randomized, as well
    if( ( this.x * 101 ) > 505 )
    {
        this.x = 0;
        this.speed = Math.random() + 1;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83);
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

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

// number of enemies to start with
var totalEnemies = 5;
var allEnemies = [];

// add the enemies to the allEnemies array
// the counter determines which row the enemy appears on
for( var enemyCounter = 0; enemyCounter < totalEnemies; enemyCounter++ )
{
    allEnemies.push( new Enemy( 0, enemyCounter ) );
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
