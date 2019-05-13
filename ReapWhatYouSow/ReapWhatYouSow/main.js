var game = new Phaser.Game(600, 400, Phaser.AUTO, 'phaser');


var Menu = function(game) {};
Menu.prototype = {
    
    preload: function() {
        game.load.image('office', 'assets/img/tempoffice.png');
        game.load.image('daybg', 'assets/img/officebgtemp.png');
        game.load.image('textbar', 'assets/img/textbar.png');
        game.load.image('avocado', 'assets/img/avocado.png');
        game.load.spritesheet('player', 'assets/img/george.png', 48, 48);
        
        //Source: https://freesound.org/people/timgormly/sounds/170142/
        game.load.audio('textaud', 'assets/audio/temptextsound.mp3');
        //Source: https://incompetech.filmmusic.io/song/3930-isolated/
        game.load.audio('officebgm', 'assets/audio/tempofficebgm.mp3');
    },
    create: function() { // Loads menu & instructions
        game.stage.backgroundColor = '#000000'; // sets background color
        words = game.add.text(0, 100, 'Look at this hot hot menu', { font: '30px Courier New', fill: '#FFFFFF', align:'center' });
       
    },
    
    update: function() {
        if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
        {
            game.state.start('Intro'); //moves to menu phase when player presses space
        }
        if (words.events.onInputOver)
        {
            words.text = 'look at this sexy sexy menu';
        }
    }
}

var Intro = function(game) {};
Intro.prototype = {
    init: function() {
        office = game.add.sprite(0,0, 'office'); //adds office background
        
        //I'm intentionally changing to quotes so the script stands out
        //Array of script strings
        this.msgs = [
        /*0*/ "Ah, you're here. Thanks for coming in.",
        /*1*/"I appreciate your agency agreeing to work\nwith us, Ms ...",
        /*2*/"I'm so sorry, remind me your name again?",
        /*3*/"This is a line that will never be used",
        /*4*/"My name is " + this.name,
        /*5*/"Oh! Ms. " + this.name + ", of course!"
                     ];
        ///////////
        this.pcSprite = [4]; //array of all line #s that need PC sprite on screen
        this.bossSprite = [0, 1, 2, 5]; //array of all line #s that need the boss sprite on screen
        this.textObj = game.add.text(10, 300, 'wow', { font: '20px Courier New', fill: '#FFF'}); //Text object used for displying typewriter script text
        this.progtextObj = game.add.text(470, 375, '', { font: '15px Courier New', fill: '#FFF', align: 'right'});
        this.index = 0; //which line of the script we're pulling from
        this.i = 0; //what character of the sentence the typewriter is on
        this.counter = 0; //counter to slow down the typewriter.
        this.name = ''; // the name of the character, inputted later by player
        this.inputCreated = false; //checks if the user has reached the textbox screen yet
        this.temp; //text object to be used for instructions
        
    },
    preload: function() {
        game.load.image('boss', 'assets/img/bosstemp.png');
        game.load.image('PC', 'assets/img/pctemp.png');
    },
    create: function() { // Loads game state
        game.stage.backgroundColor = '#000'; // sets background color
        /* Plugin source: https://github.com/azerion/phaser-input*/
        this.input = game.add.plugin(PhaserInput.Plugin)
        pc = game.add.sprite(10, 140, 'PC');
        boss = game.add.sprite(450, 125, 'boss');
        boss.scale.x = .6;
        boss.scale.y = .6;
        pc.alpha = 0;
        this.textaud = game.add.audio('textaud');
        
    },
    
    update: function() {
        
        //if user pressed space to progress the dialogue OR if user presseed enter on text box
        if((game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) || game.input.keyboard.justPressed(Phaser.Keyboard.ENTER)) && !this.inputCreated)
        {
            this.progtextObj.text = ''
            if(this.i < this.msgs[this.index].length)
            {
                this.i = this.msgs[this.index].length;
                this.textObj.text = this.msgs[this.index];
                if(this.index == 0) //displays instruction on first line
                {
                    this.progtextObj.text = 'Press space >>'
                }
                else //trusts that the player now knows >> = press space
                {
                    this.progtextObj.x = 575
                    this.progtextObj.text = '>>'
                }
            }
            else
            {
            this.index++;
            this.i = 0;
            this.counter = 0;
            if(this.pcSprite.includes(this.index)) //checks if we're on a line that needs the PC sprite on screen
            {
                pc.alpha = 1;
                boss.alpha = 0;
            }
            else // we're on a line that needs boss' sprite on screen
            {
                pc.alpha = 0;
                boss.alpha = 1;
            }
            }
        }
        //TODO: remove dev cheat skip key
        if(office.alpha <= 0 || game.input.keyboard.justPressed(Phaser.Keyboard.X))
        {
            game.state.start('Day');
        }
        else if(this.index >= this.msgs.length)
        {
            office.alpha -= .02;
            this.textObj.text = '';
            this.progtextObj.text = '';
            boss.alpha -= .02;
            pc.alpha -= .02;
        }
        /**** Writes text to screen, ONLY while there are still messages in the array ****/
        if(this.index < this.msgs.length && this.counter % 2 == 0) //displays each letter every 2 frames
        {
            if(this.index == 3)
            {
                this.textObj.text = '';
            }
            else if(this.i <= this.msgs[this.index].length)
            {
                this.typewriter(this.msgs[this.index], this.textObj, this.i); //calls typewriter function
                this.i++; //moves us to the next letter
            }
            if(this.i == this.msgs[this.index].length)
            {
                if(this.index == 0) //displays instruction on first line
                {
                    this.progtextObj.text = 'Press space >>'
                }
                else //trusts that the player now knows >> = press space
                {
                    this.progtextObj.x = 575
                    this.progtextObj.text = '>>'
                }
            }
            
        }
        // If there are still messages left
        if(this.index < this.msgs.length && this.i <= this.msgs[this.index].length)
        {
            this.counter++; //counter, updates every frame
        }

        /**** Deals with input box *****/
        if(this.index == 3 && !this.inputCreated) //If we're waiting for text input
        {
            this.temp = game.add.text(180, 300, 'Enter your first name', { font: '20px Courier New', fill: '#FFF'});
            // Adds text box to screen
            inputBox = game.add.inputField
            (200, 325, {
             fill: '#000000', font: '45px Courier New', width: 200, height: 50, backgroundColor: '#FFFFFF', borderColor: '#aba000', borderWidth: 2, focusOurOnEnter: true});
            this.inputCreated = true; //we've created the input box now, so true
            inputBox.blockInput = false; //Ignores other keystrokes while user is typing
            inputBox.startFocus(); //sets textbox to be active
        }
        // Checks if user has pressed enter on text box yet & if there's actually an active text box on screen
        if(this.inputCreated && game.input.keyboard.justPressed(Phaser.Keyboard.ENTER))
           {
           this.temp.destroy();
           inputBox.endFocus(); //sets textbox inactive
           this.name = inputBox.value; //sets the name field to whatever the user entered
           inputBox.destroy(); //destroys the textbox
           this.inputCreated = false; //we no longer have an active textbox, so false
           this.index++; //advances to the next line of dialogue
           this.msgs[4] = "My name is " + this.name + ".";
           this.msgs[5] = "Oh! Ms. " + this.name + ", of course!"; //updates the script with next name
            pc.alpha = 1;
            boss.alpha = 0;
           }
    },
    // Moderately unnecessary function for typewriter text display, but it looks nice to have things as their own function so I made this.
    typewriter: function(msg, textObj, i) {
        //console.log(msg);
        textObj.text = msg.substr(0, i);
        if(this.counter % 4 == 0)
        this.textaud.play('', 0, .125, false);
    }
    
}

var Day = function(game) {};
Day.prototype = {
    

    create: function() { //Creates the day stage
        cursors = game.input.keyboard.createCursorKeys();
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#000'; // sets background color
        game.world.setBounds(0, 0, 1600, 1000);
        daybg = game.add.sprite(0, 0, 'daybg');
        daybg.alpha = 0;
        this.officebgm = game.add.audio('officebgm');
        this.officebgm.play('', 0, .5, true);
        player = game.add.sprite(50, 165, 'player');
        textbar = game.add.sprite(0, 286, 'textbar');
        player.scale.x = 1.5; player.scale.y = 1.5;
        game.physics.arcade.enable(player);
        player.animations.add('left', [1, 5, 9, 13], 10, true);
        player.animations.add('right', [3, 7, 11, 15], 10, true);
        player.animations.add('up', [2, 6, 10, 14], 10, true);
        player.animations.add('down', [0, 4, 8, 12], 10, true);
        //player.enableBody = true;
        player.body.collideWorldBounds = true;
        i = 0; //placeholder for typewriter
        textObj = game.add.text(10, 300, '', { font: '20px Courier New', fill: '#FFF'});
        msg = 'You can move around the office\nusing the arrow keys or WASD.';
        counter = 0; // frame counter
        moved = false; // checks if the move message was destroyed yet
        
        objs = game.add.group();
        objs.enableBody = true;
        avo1 = objs.create(800, 200, 'avocado');
        avo2 = objs.create(700, 400, 'avocado');
        avo3 = objs.create(1000, 600, 'avocado');
        avo1.body.immovable = true;
        avo2.body.immovable = true;
        avo3.body.immovable = true;
        game.physics.arcade.enable(objs);
        SPEED = 150; //dev speed constant, default is 100
        
    },
    
    update: function() {
        // Fade in BG
        if(daybg.alpha < 1)
        {
            daybg.alpha += .025;
        }
        else if(daybg.alpha >= 1 && counter % 2 == 0 && !moved && i <= msg.length)
        {
            textObj.text = msg.substr(0, i);
            i++;
            counter++;
        }
        else if(daybg.alpha >= 1 && !moved)
        {
            counter++;
        }
        
        if(moved && textObj.alpha >= 0)
        {
            textObj.alpha -= .025;
            textbar.alpha -= .025;
        }
        game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN);
        //textbar.x = game.camera.x; textbar.y = game.camera.y + 286;
        //lets the player move with WASD or arrow keys
        if(cursors.left.isDown || game.input.keyboard.isDown(Phaser.Keyboard.A))
        {
            player.body.velocity.x = SPEED * -1;
            player.animations.play('left');
            if(!moved)
            {
                moved = true;
            }
        }
        else if(cursors.right.isDown || game.input.keyboard.isDown(Phaser.Keyboard.D))
        {
            player.body.velocity.x = SPEED;
            player.animations.play('right');
            if(!moved)
            {
                moved = true;
            }
        }
        else if(cursors.up.isDown || game.input.keyboard.isDown(Phaser.Keyboard.W))
        {
            player.body.velocity.y = SPEED * -1;
            player.animations.play('up');
            if(!moved)
            {
                moved = true;
            }
        }
        else if(cursors.down.isDown || game.input.keyboard.isDown(Phaser.Keyboard.S))
        {
            player.body.velocity.y = SPEED;
            player.animations.play('down');
            if(!moved)
              {
                moved = true;
              }
        }
        else
        {
            player.animations.stop();
            player.body.velocity.x = 0;
            player.body.velocity.y = 0;
        }
        
        game.physics.arcade.collide(player, objs);
    }
}
    
var Battle = function(game) {};
Battle.prototype = {
    create: function() { //
        game.stage.backgroundColor = '#facade'; // sets background color
        game.add.text(0, 100, 'hahahah u done fucked up', { font: '30px Courier New', fill: '#000', align:'center' });
        
    },
    
    update: function() {
        
    }
}





//Adds game states
game.state.add('Menu', Menu); //adds intro state
game.state.add('Intro', Intro); // adds play state
game.state.add('Day', Day); //adds main menu state
game.state.add('Battle', Battle); // adds battle state
game.state.start('Menu'); // starts the game at the main menu
