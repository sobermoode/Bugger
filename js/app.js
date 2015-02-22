// Enemies our player must avoid
var Enemy = function( locX, locY ) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = locX;
    this.y = locY;

    return this;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x *= dt;
    this.y *= dt;
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
    this.sprite = 'images/char-boy.png';
    this.x = startX;
    this.y = startY;
    this.changeX = 0;
    this.changeY = 0;

    return this;
};

Player.prototype.update = function( dt )
{
    // this.x *= dt;
    // this.y *= dt;
    this.x += this.changeX;
    this.y += this.changeY;

    this.changeX = 0;
    this.changeY = 0;
}

Player.prototype.render = function()
{
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function( key )
{
    switch( key )
    {
        case 'left':
            this.changeX = -83;
            break;

        case 'up':
            this.changeY = -101;
            break;

        case 'right':
            this.changeX = 83;
            break;

        case 'down':
            this.changeY = 101;
            break;

        default:
            break;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var enemy1 = new Enemy(1, 1);
var enemy2 = new Enemy(2, 2);
var allEnemies = [ enemy1, enemy2 ];

// Place the player object in a variable called player
var player = new Player( 0, 6 );

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
