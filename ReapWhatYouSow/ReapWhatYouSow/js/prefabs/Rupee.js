function Rupee(game, key, x, y, type) {
    Phaser.Sprite.call(this, game, x, y, key); //calls the sprite method
    
    this.scale.x = .5; //sets the scale for the sprite
    this.scale.y = .5;
    game.physics.enable(this); //enables game physics
    this.body.collideWorldBounds = false; // disables bound collisions
    this.type = type;
}

Rupee.prototype = Object.create(Phaser.Sprite.prototype); // specifies prefab prototype
Rupee.prototype.constructor = Rupee; // specifies prefab's constructor

