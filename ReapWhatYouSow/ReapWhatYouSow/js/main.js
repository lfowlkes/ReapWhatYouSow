/* Creators: Kristy Mihalyi, Kendra Shu, and Lauren Fowlkes
 * Group 26: Reap What You Sow
 * Github: https://github.com/lfowlkes/ReapWhatYouSow
 * Theme: Eternal
 */
var game = new Phaser.Game(800, 560, Phaser.AUTO, 'phaser');


var name = ''; // the name of the character, inputted later by player
var musicOn = true; //if the player wants music on
var soundOn = true; // if the player wants sound effects on

var Menu = function(game) {};
Menu.prototype = {
    
    preload: function() {
        /* Note that these are all placeholder images as of now and will not exist in the final build*/
        game.load.image('office', 'assets/img/tempoffice.png');
        game.load.image('daybg', 'assets/img/officetest.png');
        game.load.image('textbar', 'assets/img/textbar.png');
        game.load.image('titletext', 'assets/img/titletext.png');
        game.load.image('opttext', 'assets/img/opttext.png');
        game.load.image('playtext', 'assets/img/playtext.png');
        game.load.image('creditstext', 'assets/img/creditstext.png');
        game.load.image('quittext', 'assets/img/quittext.png');
        game.load.image('housebg', 'assets/img/temphouse.png');
        game.load.image('ally', 'assets/img/ally.png');
        game.load.image('ekey', 'assets/img/ekey.png');
        game.load.image('copmac', 'assets/img/copymachine.png');
        game.load.image('board', 'assets/img/board.png');
        game.load.image('npc1', 'assets/img/npc1.png');
        game.load.image('desk', 'assets/img/desk.png');
        game.load.spritesheet('player', 'assets/img/player.png', 32, 32);
        game.load.tilemap('offmap', 'assets/img/onetilesheet.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('officetile', 'assets/img/officetest4 - Copy.png');
        game.load.tilemap('housemap', 'assets/img/houseonetilesheet.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('housetile', 'assets/img/house5.png');
        
        //Source: https://freesound.org/people/timgormly/sounds/170142/
        game.load.audio('textaud', 'assets/audio/temptextsound.mp3');
        //Source: https://incompetech.filmmusic.io/song/3930-isolated/
        game.load.audio('officebgm', 'assets/audio/tempofficebgm.mp3');
        //Source: https://soundimage.org/dark-ominous/ - into the haunted forest
        game.load.audio('menubgm', 'assets/audio/menubgm.mp3');
    },
    create: function() { // Loads menu & instructions
        game.stage.backgroundColor = '#000000'; // sets background color
        titletext = game.add.sprite(80, 30, 'titletext');
        titletext.scale.setTo(1, 1); titletext.alpha = 0;
        playtext = game.add.sprite(298, 190, 'playtext');
        playtext.scale.setTo(1.25, 1.25); playtext.alpha = 0; playtext.inputEnabled = true;
        opttext = game.add.sprite(130, 290, 'opttext');
        opttext.scale.setTo(.75, .75); opttext.alpha = 0; opttext.inputEnabled = true;
        creditstext = game.add.sprite(485, 291, 'creditstext');
        creditstext.scale.setTo(.75, .75); creditstext.alpha = 0; creditstext.inputEnabled = true;
        quittext = game.add.sprite(336, 390, 'quittext');
        quittext.scale.setTo(.75, .75); quittext.alpha = 0; quittext.inputEnabled = true;
        ALPHARATE = .03; //Rate at which things fade in/out
        this.menubgm = game.add.audio('menubgm');
        if(musicOn == true)
        {
           console.log(musicOn);
           this.menubgm.play('', 0, .5, true);
        }
    },
    
    update: function() {
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        
        /**** Fades in text *****/
        if(titletext.alpha < .9)
        {
            titletext.alpha += ALPHARATE;
        }
        if(titletext.alpha >=.9 && playtext.alpha <= .9)
        {
            playtext.alpha += ALPHARATE;
        }
        if(playtext.alpha >= .9 && opttext.alpha <=.9)
        {
            opttext.alpha += ALPHARATE;
        }
        if(opttext.alpha >=.9 && quittext.alpha <=.9)
        {
            quittext.alpha += ALPHARATE;
        }
        if(quittext.alpha >=.9 && creditstext.alpha <=.9)
        {
            creditstext.alpha += ALPHARATE;
        }
        
        
        /***** Scales up on hover *****/
        playtext.events.onInputOver.add(this.hoverPlay, this);
        playtext.events.onInputOut.add(this.stopPlayHover, this);
        opttext.events.onInputOver.add(this.hoverOpt, this); // for some reason this doesn't work but we'll figure out why later
        opttext.events.onInputOut.add(this.stopOptHover, this);
        creditstext.events.onInputOver.add(this.hoverCredits, this);
        creditstext.events.onInputOut.add(this.stopCreditsHover, this);
        quittext.events.onInputOver.add(this.hoverQuit, this);
        quittext.events.onInputOut.add(this.stopQuitHover, this);
        /**** Handles moving to different screens ****/
        playtext.events.onInputDown.add(this.startPlay, this);
    },
    /***** All the functions for handling text hover events *****/
    hoverPlay: function() {
        playtext.scale.setTo(1.5, 1.5);
        playtext.x -= 12;
        playtext.y -= 10;
    },
    
    stopPlayHover: function() {
        playtext.scale.setTo(1.25, 1.25);
        playtext.x += 12;
        playtext.y += 10;
    },
    
    hoverOpt: function() {
        opttext.scale.setTo(1, 1);
        opttext.x -= 12;
        opttext.y -= 10;
    },
    
    stopOptHover: function() {
        opttext.scale.setTo(.75, .75);
        opttext.x += 12;
        opttext.y += 10;
    },
    hoverCredits: function() {
        creditstext.scale.setTo(1, 1);
        creditstext.x -= 12;
        creditstext.y -= 10;
    },
    
    stopCreditsHover: function() {
        creditstext.scale.setTo(.75, .75);
        creditstext.x += 12;
        creditstext.y += 10;
    },
    hoverQuit: function() {
        quittext.scale.setTo(1, 1);
        quittext.x -= 12;
        quittext.y -= 10;
    },
    
    stopQuitHover: function() {
        quittext.scale.setTo(.75, .75);
        quittext.x += 12;
        quittext.y += 10;
    },
    startPlay: function() {
        game.state.start('Intro');
        this.menubgm.stop();
    }
}

var Intro = function(game) {};
Intro.prototype = {
    init: function() {
        office = game.add.sprite(0,0, 'office'); //adds office background
        office.scale.setTo(1.34, 1.4);
        //I'm intentionally changing to quotes so the script stands out
        //Array of script strings
        this.msgs = [
        /*0*/"Welcome, come in.",
        /*1*/"You're the temp I hired, right? Your buddy came in earlier.",
        /*2*/"Sorry, remind me of your name again?",
        /*3*/"This is a line that will never be used",
        /*4*/"My name is " + name + ".",
        /*5*/"It's a pleasure meeting you, " + name + ".",
        /*6*/"We spoke on the phone, but I'll debrief you once more:",
        /*7*/"I suspect one of my employees, Bob, has been skimming funds\nfrom this company.",
        /*8*/"And you or your management aren't investigating this yourselves...\nwhy?",
        /*9*/"I can't go looking into it myself; my employees already resent me\nenough as it is, and my managers already have their hands full.",
        /*10*/"I want you to find enough evidence to prove that he's indeed\nbehind this.",
        /*11*/"Feel free to talk to his coworkers or search the office\nfor information.",
        /*12*/"As far as my other employees are concerned, you're our\nnew research analyst.",
        /*13*/"Your boss spoke very highly of you -— Don't let me down.",
        /*14*/"Ha, I'm sure he did. You got it, chief."
                     ];
        ///////////
        this.pcSprite = [4, 8, 14]; //array of all line #s that need PC sprite on screen
        this.bossSprite = [0, 1, 2, 5, 6, 7, 8, 10, 11, 12, 13]; //array of all line #s that need the boss sprite on screen
        this.textObj = game.add.text(10, 420, 'wow', { font: '20px Courier New', fill: '#FFF'}); //Text object used for displying typewriter script text
        this.progtextObj = game.add.text(670, 535, '', { font: '15px Courier New', fill: '#FFF', align: 'right'});
        this.index = 0; //which line of the script we're pulling from
        this.i = 0; //what character of the sentence the typewriter is on
        this.counter = 0; //counter to slow down the typewriter.
        this.inputCreated = false; //checks if the user has reached the textbox screen yet
        this.temp; //text object to be used for instructions
        
    },
    preload: function() {
        game.load.image('boss', 'assets/img/bosstemp.png');
        game.load.image('PC', 'assets/img/player_profile.png');
    },
    create: function() { // Loads game state
        game.stage.backgroundColor = '#000'; // sets background color
        /* Plugin source: https://github.com/azerion/phaser-input*/
        this.input = game.add.plugin(PhaserInput.Plugin)
        pc = game.add.sprite(162, 116, 'PC'); pc.scale.setTo(-.3, .3);
        boss = game.add.sprite(660, 200, 'boss');
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
                    this.progtextObj.x = 775
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
                console.log('pc');
                pc.alpha = 1;
                boss.alpha = 0;
            }
            else // we're on a line that needs boss' sprite on screen
            {
                console.log('no pc: ' + this.index);
                pc.alpha = 0;
                boss.alpha = 1;
            }
            }
        }
        //TODO: remove dev cheat skip key
        if((office.alpha <= 0 || game.input.keyboard.justPressed(Phaser.Keyboard.X)) && this.index != 3)
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
                    this.progtextObj.x = 775
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
            this.temp = game.add.text(280, 420, 'Enter your first name', { font: '20px Courier New', fill: '#FFF'});
            // Adds text box to screen
            inputBox = game.add.inputField
            (300, 445, {
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
           name = inputBox.value; //sets the name field to whatever the user entered
           inputBox.destroy(); //destroys the textbox
           this.inputCreated = false; //we no longer have an active textbox, so false
           this.index++; //advances to the next line of dialogue
           this.msgs[4] = "My name is " + name + ".";
           this.msgs[5] = "It's a pleasure meeting you, " + name +"."; //updates the script with next name
           if(this.index == 4)
            {
                pc.alpha = 1;
                boss.alpha = 0;
            }
           }
    },
    // Moderately unnecessary function for typewriter text display, but it looks nice to have things as their own function so I made this.
    typewriter: function(msg, textObj, i) {
        //console.log(msg);
        textObj.text = msg.substr(0, i);
        if(this.counter % 4 == 0 && soundOn == true)
        this.textaud.play('', 0, .125, false);
    }
    
}

var Day = function(game) {};
Day.prototype = {
    

    create: function() { //Creates the day stage
        cursors = game.input.keyboard.createCursorKeys(); //creates arrow key tracking
        game.physics.startSystem(Phaser.Physics.ARCADE); //turns on arcade physics
        game.stage.backgroundColor = '#000'; // sets background color
        game.world.setBounds(0, 0, 2000, 934); //sets world bounds
        
        map = game.add.tilemap('offmap'); //creates tilemaps
        map.addTilesetImage('officetest4 - Copy', 'officetile'); //add tiles
        floors = map.createLayer('floorss'); //create floor layer
        objects = map.createLayer('objects'); //create object layer
        walls = map.createLayer('walls'); //create wall layer
        floors.resizeWorld(); //resizes map to world bounds
        objects.resizeWorld();
        walls.resizeWorld();
        //collision debug
        //objects.debug = true;
        map.setCollisionBetween(0, 10501, true, 'walls'); //enables collisions on walls layer
        map.setCollisionBetween(0, 130491, true, 'objects'); //enables collisions with object layer
        
        daybg = game.add.sprite(0, 0, 'textbar'); daybg.scale.setTo(10,10); //background for fade
        daybg.alpha = 1; //sets opacity to 100%
        this.officebgm = game.add.audio('officebgm');
        if(musicOn == true) //only adds BGM if music option is enabled
        {
            this.officebgm.play('', 0, .5, true);
        }
        //default: 314 x 426ish
        player = game.add.sprite(314, 426, 'player'); //adds player sprite
        textbar = game.add.sprite(0, 532, 'textbar'); //adds background for text
        textbar2 = game.add.sprite(-100, -100, 'textbar'); //second text bar for interaction text
        textbar.scale.setTo(1.5, 1.5); //resizes text bar
        textbar2.scale.setTo(2, 1.5);
        player.scale.setTo(1.5,1.5);
        game.physics.arcade.enable(player); //turns on player physics
        player.animations.add('left', [4, 3, 4, 5], 10, true); //left walking animation
        player.animations.add('right', [7, 6, 7, 8], 10, true); //right walking animation
        player.animations.add('up', [10, 9, 10, 11], 10, true); //up walking animation
        player.animations.add('down', [1, 0, 1, 2], 10, true); //down walking animation
        //player.enableBody = true;
        player.body.collideWorldBounds = true; //enables player collisions
        i = 0; //placeholder for typewriter
        textObj = game.add.text(10, 545, '', { font: '20px Courier New', fill: '#FFF'}); //text object for dialogue
        msg = 'You can move around the office using the arrow keys or WASD.'; //intro message
        counter = 0; // frame counter
        moved = false; // checks if the move message was destroyed yet
        activeText = false; //checks if the user is in the middle of a dialogue spot
        
        SPEED = 150; //dev speed constant, default is 150

        /***** Interaction objects *****/
        objs = game.add.group(); //creates group for interaction sprites
        objs.enableBody = true; //enables intraction sprite body
        /*0*/copymach = objs.create(2315, 722, 'copmac'); //sprite for copy machine
        copymach.scale.setTo(1.2, 1.2); //resizes copy machine
        /*1*/board = objs.create(460, 700, 'board'); board.scale.setTo(1, 1); board.alpha = 0; //sprite for bulletin board
        /*2*/npc1 = objs.create(1970, 214, 'npc1'); npc1.scale.setTo(1.5,1.5); //sprite for office npc
        /*3*/desk = objs.create(1000, 480, 'desk'); desk.scale.setTo(.5, .5); desk.alpha = 0; //sprite for desk
        copymach.body.immovable = true; //stops player from moving copy machine
        board.body.immovable = true; //stops player from moving bulletin board
        npc1.body.immovable = true; // stops player from moving npc
        desk.body.immovable = true; //stops player from moving desk
        game.physics.arcade.enable(objs); //turns on arcade physics for objects
        trigKeys = game.add.group(); //creates a group for the indicator icons
        trig1 = trigKeys.create(copymach.x+10, copymach.y - 30, 'ekey'); trig1.alpha = 0; //icon for copy machine
        trig2 = trigKeys.create(board.x+30, board.y-60, 'ekey'); trig2.alpha = 0; //icon for bulletin board
        trig3 = trigKeys.create(npc1.x+5, npc1.y-30, 'ekey'); trig3.alpha = 0; // icon for npc
        trig4 = trigKeys.create(desk.x+25, desk.y-30, 'ekey'); trig4.alpha = 0; //icon for desk
        found = [false, false, false, false]; //array of booleans for if an obj has been interacted with yet
        numFound = 0; //tracks the number of objects that have been found so far
        inRange = [false, false, false, false]; //array of booleans testing if player is within range of NPC/O
        
        
    },
    
    update: function() {
        // Fade in BG
        if(daybg.alpha > 0) //fade in effect to scene
        {
            daybg.alpha -= .025;
        }
        else if(daybg.alpha < 1 && counter % 2 == 0 && !moved && i <= msg.length) //typewriter effect for tutorial text
        {
            textObj.text = msg.substr(0, i);
            i++;
            counter++;
        }
        else if(daybg.alpha < 1 && !moved) //increments only if player hasn't moved yet
        {
            counter++;
        }
        
        if(moved && textbar.alpha >= 0) //fades out text once the player moved
        {
            textObj.alpha -= .025;
            textbar.alpha -= .025;
        }
        game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN); //sets the camera to follow the player
        game.physics.arcade.collide(player, walls); //enables collisions between player and walls
        game.physics.arcade.collide(player, objects); //enables collisions between player and objects
        //lets the player move with WASD or arrow keys
        if(!activeText) //deals with player movement, but only if they're not in the middle of a text sequence
        {
            // Checks of amy key is pressed, formatted in this terrible way for diagonal movement
            //Except now we don't want diagonal movement but I'm too afraid of breaking things to change this too much so we're just gonna hacky fix that. Maybe I'll come back and make this prettier later
            if(cursors.left.isDown || game.input.keyboard.isDown(Phaser.Keyboard.A) ||cursors.right.isDown || game.input.keyboard.isDown(Phaser.Keyboard.D) || cursors.up.isDown || game.input.keyboard.isDown(Phaser.Keyboard.W) || cursors.down.isDown || game.input.keyboard.isDown(Phaser.Keyboard.S))
            {
                if(cursors.left.isDown || game.input.keyboard.isDown(Phaser.Keyboard.A)) //left mvoement
                {
                    player.body.velocity.x = SPEED * -1;
                    player.body.velocity.y = 0;
                    player.animations.play('left');
                }
                if(cursors.right.isDown || game.input.keyboard.isDown(Phaser.Keyboard.D)) //right movement
                {
                    player.body.velocity.x = SPEED;
                    player.body.velocity.y = 0;
                    player.animations.play('right');
                }
                if(cursors.up.isDown || game.input.keyboard.isDown(Phaser.Keyboard.W)) //up movement
                {
                    player.body.velocity.y = SPEED * -1;
                    player.body.velocity.x = 0;
                    player.animations.play('up');
                    
                }
                if(cursors.down.isDown || game.input.keyboard.isDown(Phaser.Keyboard.S)) //down movement
                {
                    player.body.velocity.y = SPEED;
                    player.body.velocity.x = 0;
                    player.animations.play('down');
                }
                if(!moved) //sets moved to true once the player moves
                {
                    moved = true;
                }
            }
            else //stops the animation and velocity when there isn't a key pressed
            {
                player.animations.stop();
                player.body.velocity.x = 0;
                player.body.velocity.y = 0;
            }

        }
        else //deals with dialogue when text sequence is active
        {
            if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) //progresses when player hits to close text
            {
                if(numFound == inRange.length) //when the player has found all objects
                {
                    textObj.text = 'Looks like you\'ve found everything worth seeing here.\nLet\'s talk tonight. You know where to meet me.\n\n(Press X to continue.)';
                }
                else //closes the text bar if there are still objects left to find
                {
                    activeText = false;
                    textbar2.alpha = 0;
                    while(textObj.alpha >= 0)
                    {
                        textObj.alpha -= .025;
                    }
                }
            }
        }
        
        game.physics.arcade.collide(player, objs); //enables collisions between player and interaction sprites
        
        if(game.input.keyboard.isDown(Phaser.Keyboard.X)) //starts battle intro when player hits x
        {
            game.state.start('BattleIntro');
            this.officebgm.stop();
        }
        
        if(game.input.keyboard.isDown(Phaser.Keyboard.R)) //warps player back to the beginning in case they get stuck; DEV TOOL
        {
            player.x = 320; player.y = 490;
        }
        
        /*** Handles interacting with objs ***/
        for(var idx = 0; idx< inRange.length; idx++) //Checks every frame if the player is in range of an interactable
        {
            inRange[idx] = this.isInRange(player, objs.children[idx]);
            if(inRange[idx])
            {
                trigKeys.children[idx].alpha = 1; //adds button teling player what to press when in range
            }
            else
            {
                trigKeys.children[idx].alpha = 0; //hides trigger key when player is out of range
            }
        }
        
         if(game.input.keyboard.isDown(Phaser.Keyboard.E)) //handles actions when player starts dialogue
         {
             if(inRange[0]) //only activates if player is in range of sprit
             {
                 activeText = true;
                 textObj.alpha = 1;
                 textObj.fill = '#FFF'
                 this.obj1(textObj);
                 if(found[0] == false)
                 {
                     numFound++;
                     found[0] = true;
                 }
             }
             else if(inRange[1])
             {
                 activeText = true;
                 textObj.alpha = 1;
                 textObj.fill = '#FFF'
                 this.obj2(textObj);
                 if(found[1] == false)
                 {
                    numFound++;
                    found[1] = true;
                 }
             }
             else if(inRange[2])
             {
                 activeText = true;
                 textObj.alpha = 1;
                 textObj.fill = '#FFF'
                 this.obj3(textObj);
                 if(found[2] == false)
                 {
                     numFound++;
                     found[2] = true;
                 }
             }
             else if(inRange[3])
             {
                 activeText = true;
                 textObj.alpha = 1;
                 textObj.fill = '#FFF'
                 this.obj4(textObj);
                 if(found[3] == false)
                 {
                     numFound++;
                     found[3] = true;
                 }
             }
         }
        //debug info for sprite
    game.debug.spriteInfo(player, 10, 10);
    },
    
isInRange: function(player, obj) //checks if player is within range of an interaction  sprite
    {
        x = Math.abs(player.x - obj.x);
        y = Math.abs(player.y - obj.y);
        DIFF = 100; //constant value for distance range
        if(x <= DIFF && y <= DIFF)
        {
            return true;
        }
        else
        {
            return false;
        }
    },
    
obj1: function(textObj) //triggers text for found copy machine
    {
        textbar2.x = game.camera.x;
        textbar2.y = game.camera.y + 400
        textbar2.alpha = 1;
        textObj.alpha = 1;
        textObj.x = game.camera.x + 5;
        textObj.y = game.camera.y + 410;
        textObj.text = 'It looks like Decard made a copy of... medical bills? That\'s odd.\nWhy are there so many of them?\n\n(Press space to close.)';
    },
    
obj2: function() //triggers text for found bulletin board
    {
        textbar2.x = game.camera.x;
        textbar2.y = game.camera.y + 400
        textbar2.alpha = 1;
        textObj.alpha = 1;
        textObj.x = game.camera.x + 5;
        textObj.y = game.camera.y + 410;
        textObj.text = 'There\s a list of past employees of the month.\nDecard is the only one not on it.\n\n\n(Press space to close.)';
    },
obj3: function()//triggers text for found npc
    {
        textbar2.x = game.camera.x;
        textbar2.y = game.camera.y + 400
        textbar2.alpha = 1;
        textObj.alpha = 1;
        textObj.x = game.camera.x + 5;
        textObj.y = game.camera.y + 410;
        textObj.text = 'Decard? Pfft. How a guy like that still has a job is beyond me.\nWish I could get away with coming in late and leaving early as\noften as he does.\n\n(Press space to close.)';
    },
obj4: function() //triggers text for found desk
    {
        textbar2.x = game.camera.x;
        textbar2.y = game.camera.y + 400
        textbar2.alpha = 1;
        textObj.alpha = 1;
        textObj.x = game.camera.x + 5;
        textObj.y = game.camera.y + 410;
        textObj.text = 'Decard\'s desk is such a mess.\n\n\n(Press space to close.)';
    }
}
    
var BattleIntro = function(game) {};
BattleIntro.prototype = {
    create: function() {
        game.stage.backgroundColor = '#facade'; // sets background color
        house = game.add.sprite(0, 0, 'housebg');
        textbar = game.add.sprite(0, 390, 'textbar');
        textbar.scale.setTo(1.5, 1.5);
        this.textObj = game.add.text(10, 410, '', { font: '20px Courier New', fill: '#FFF' });
        //All messages to be displayed on screen
        this.msgs = [
        /*0*/ "Fancy meeting you tonight, " + name + ".",
        /*1*/ "It'd be a lot fancier if you'd tell me WHY we're meeting here.\nDon't you think we're awfully conspicuous standing here\noutside Decard's house?",
        /*2*/ "Nah, I've been staking it out for weeks; nobody so much as opens\na curtain around this place.",
        /*3*/ "Weeks? We only got the assignment last night!",
        /*4*/ "Correction: YOU only got the assignment last night.\nHQ has had me investigating for awhile now.",
        /*5*/ "Then why was today the first day we looked into his work life?",
        /*6*/ "Wasn't relevant to the case before. Found out on Thursday that\nDecard\'s boss was getting suspicious. HQ had to pull some strings\nto make sure we were the ones he called before he could start\nasking questions.",
        /*7*/ "And now that we've investigated, what happens now?",
        /*8*/ "What happens now is that we finish the job.",
        /*9*/ "... You mean... kill...?",
        /*10*/ "No I mean we pack some swimsuits and ship 'em off to Bora Bora.\nYes, I mean kill. Specifically, YOU kill.",
        /*11*/ "Me?! I...-",
        /*12*/ "\"I\" what? Welcome to being a Grim Reaper sweetheart. This is\nthe job. Consider it your initiation.",
        /*13*/ "I know it's the job, I just thought we'd have more information\nbefore we started killing people! What did this bloke do anyway?",
        /*14*/ "Not our job to ask. When HQ tells us someone is evading their\ndeath, our only job is to go in and set the situation right.",
        /*15*/ "Let me give you some advice, sweetheart: In our line of work,\nif you don't waste the target, HQ wastes you. So unless\nyou're interested in ending up with a scythe in your back,\nI suggest you get it together and get the job done.",
        /*16*/ "But shouldn't I-",
        /*17*/ "Look, enough stalling. Get in there and do it already. I'll stay\nout here and stand guard."
                     ];
        this.index = 0; //which line of msg array we're on
        this.i = 0; //which letter of line we're on
        this.counter = 0; //frame counter for text delay
        this.progtextObj = game.add.text(670, 525, '', { font: '15px Courier New', fill: '#FFF' });
        this.textaud = game.add.audio('textaud');
        pc = game.add.sprite(640, 108, 'PC');
        pc.scale.setTo(.3, .3);
        ally = game.add.sprite(152, 116, 'ally'); ally.scale.setTo(-.125, .125);
        pc.alpha = 0; //pc.scale.x = -1;
        this.pcSprite = [1, 3, 5, 7, 9, 11, 13, 16]; //array of all line #s that need PC sprite on screen
        this.allySprite = [0, 2, 4, 6, 8, 10, 12, 14, 15, 17]; //array of all line #s that need the ally sprite on screen
        
    },
    
    update: function() {
        
        if(game.input.keyboard.justPressed(Phaser.Keyboard.X))
        {
            game.state.start('EnterHouse');
        }
        if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR))
            {
                if(this.index > this.msgs.length)
                {
                    gamee.state.start('EnterHouse');
                }
                else if(this.i < this.msgs[this.index].length)
                {
                    this.i = this.msgs[this.index].length;
                    this.textObj.text = this.msgs[this.index];
                }
                else
                {
                    this.index++;
                    this.i = 0;
                    this.counter = 0;
                    
                    if(this.pcSprite.includes(this.index)) //checks if we're on a line that needs the PC sprite on screen
                    {
                        pc.alpha = 1;
                        ally.alpha = 0;
                    }
                    else if (this.allySprite.includes(this.index))// we're on a line that needs ally's sprite on screen
                    {
                        pc.alpha = 0;
                        ally.alpha = 1;
                    }
                    else
                    {
                        pc.alpha = 0;
                        ally.alpha = 0;
                        this.textObj.x = 350;
                    }
                }
                
            }
        
            
        if(this.index < this.msgs.length)
        {
            if(this.i <= this.msgs[this.index].length)
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
                    this.progtextObj.x = 775
                    this.progtextObj.text = '>>'
                }
            }
        }
        this.counter++;
    },
    
    typewriter: function(msg, textObj, i) {
        //console.log(msg);
        textObj.text = msg.substr(0, i);
        if(this.counter % 4 == 0 && soundOn == true)
            this.textaud.play('', 0, .07, false);
    }
}

//Is making a whole new stage for this really necessary? Not really. Am I gonna do it anyway? Sure am!
var EnterHouse = function(game) {};
EnterHouse.prototype = {
create: function() {
    game.world.setBounds(0, 0, 1600, 1120); //sets world bounds //TODO: figure out how big the map actually is lol
    cursors = game.input.keyboard.createCursorKeys(); //creates arrow key tracking
    game.physics.startSystem(Phaser.Physics.ARCADE); //enables arcade physics
    map2 = game.add.tilemap('housemap'); //creates tilemaps
    map2.addTilesetImage('house5', 'housetile'); //add tiles
    houseFloors = map2.createLayer('floorsss'); //creates floor layer
    houseWalls = map2.createLayer('walls'); //creates wall layer
    inacc = map2.createLayer('unaccesible'); //create layers of inaccessible rooms
    houseObjs = map2.createLayer('objectsssss'); //create object layer
    //Resizes tilemap to sixe of game
    houseFloors.resizeWorld();
    houseWalls.resizeWorld();
    inacc.resizeWorld();
    houseObjs.resizeWorld();
    map2.setCollisionBetween(0, 45, true, 'walls'); //makes walls collidable
    map2.setCollisionBetween(0, 650, true, 'unaccesible'); //makes the inaccesible area collidable
    map2.setCollisionBetween(0, 688, true, 'objectsssss'); //makes object layer collidable
    
    player = game.add.sprite(1326, 528, 'player'); //adds player sprite
    player.scale.setTo(1.5,1.5); //makes sprite smaller
    game.physics.arcade.enable(player); //enables arcade physics on playre
    player.animations.add('left', [4, 3, 4, 5], 10, true); //left walking animation
    player.animations.add('right', [7, 6, 7, 8], 10, true); //right walking animation
    player.animations.add('up', [10, 9, 10, 11], 10, true); //up walking animation
    player.animations.add('down', [1, 0, 1, 2], 10, true); //down waling animation
    
    cutscene = false;
    freeze = false; //checks if movement needs to be frozen [during cutscene]
},
    
update: function()
    {
        game.physics.arcade.collide(player, houseWalls); //makes player collide with wall layer
        game.physics.arcade.collide(player, houseObjs); //makes player collide with object layer
        game.physics.arcade.collide(player, inacc); //makes player collide with inaccessible layer
        game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN); //sets the camera to follow the player
        game.debug.spriteInfo(player, 10, 10);
        //A lot of mumbo jumbo for checking for input movement
        if((cursors.left.isDown || game.input.keyboard.isDown(Phaser.Keyboard.A) ||cursors.right.isDown || game.input.keyboard.isDown(Phaser.Keyboard.D) || cursors.up.isDown || game.input.keyboard.isDown(Phaser.Keyboard.W) || cursors.down.isDown || game.input.keyboard.isDown(Phaser.Keyboard.S)) && !freeze)
        {
            if(cursors.left.isDown || game.input.keyboard.isDown(Phaser.Keyboard.A)) //left mvoement
            {
                player.body.velocity.x = SPEED * -1;
                player.body.velocity.y = 0;
                player.animations.play('left');
            }
            if(cursors.right.isDown || game.input.keyboard.isDown(Phaser.Keyboard.D)) //right movement
            {
                player.body.velocity.x = SPEED;
                player.body.velocity.y = 0;
                player.animations.play('right');
            }
            if(cursors.up.isDown || game.input.keyboard.isDown(Phaser.Keyboard.W)) //up movement
            {
                player.body.velocity.y = SPEED * -1;
                player.body.velocity.x = 0;
                player.animations.play('up');
                
            }
            if(cursors.down.isDown || game.input.keyboard.isDown(Phaser.Keyboard.S)) //down movement
            {
                player.body.velocity.y = SPEED;
                player.body.velocity.x = 0;
                player.animations.play('down');
            }
        }
        else //stops the animation and velocity when there isn't a key pressed
        {
            player.animations.stop();
            player.body.velocity.x = 0;
            player.body.velocity.y = 0;
        }
        
        if(game.input.keyboard.isDown(Phaser.Keyboard.L)) //dev debugger; logs camera position
        {
            console.log('Camera position: ' + game.camera.x + ' , ' + game.camera.y);
        }
        
        //triggers cutscene when player gets to specific point
        if((player.x >= 192 && player.x <= 272) && player.y <= 490 && cutscene == false)
        {
            cutscene = true;
            freeze = true;
            this.cutsceneCamera(game.camera);
        }
    },
    
cutsceneCamera: function() {
    console.log('enter');
    while(game.camera.y > 172) //moves camera to cutscene position //TODO: make this smoother w/ timer
    {
        console.log('movin');
        game.camera.y -= .5;
    }
}
}

var Battle = function(game) {};
Battle.prototype = {
create: function() {
}
}

var BeatAlly = function(game) {};
BeatAlly.prototype = {
create: function() {
}
}

var BeatAngel = function(game) {};
BeatAngel.prototype = {
create: function() {
}
}

var GameOver = function(game) {};
GameOver.prototype = {
create: function() {
}
}

//Adds game states
game.state.add('Menu', Menu); //adds intro state
game.state.add('Intro', Intro); // adds play state
game.state.add('Day', Day); //adds main menu state
game.state.add('BattleIntro', BattleIntro); // adds battle intro state
game.state.add('EnterHouse', EnterHouse); //adds stage for entering house
game.state.add('Battle', Battle); // adds battle state
game.state.add('BeatAlly', BeatAlly); //adds state for when you beat the Ally
game.state.add('BeatAngel', BeatAngel); //adds state for when you beat angels
game.state.add('GameOver', GameOver); //Adds state for when you lose in battle
game.state.start('Menu'); // starts the game at the main menu
