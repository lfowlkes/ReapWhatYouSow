/* Creators: Kristy Mihalyi, Kendra Shu, and Lauren Fowlkes
 * Group 26: Reap What You Sow
 * Github: https://github.com/lfowlkes/ReapWhatYouSow
 * Theme: Eternal
 */
var game = new Phaser.Game(800, 560, Phaser.AUTO, 'phaser');


var name = ''; // the name of the character, inputted later by player
var musicOff = false; //if the player wants music on
var soundOn = true; // if the player wants sound effects on

var Menu = function(game) {};
Menu.prototype = {
    
    preload: function() {
        /* Note that these are all placeholder images as of now and will not exist in the final build*/
        game.load.image('office', 'assets/img/tempoffice.png');
        game.load.image('daybg', 'assets/img/officetest.png');
        game.load.image('textbar', 'assets/img/textbar.png');
        game.load.image('avocado', 'assets/img/avocado.png');
        game.load.image('titletext', 'assets/img/titletext.png');
        game.load.image('opttext', 'assets/img/opttext.png');
        game.load.image('playtext', 'assets/img/playtext.png');
        game.load.image('creditstext', 'assets/img/creditstext.png');
        game.load.image('quittext', 'assets/img/quittext.png');
        game.load.image('housebg', 'assets/img/temphouse.png');
        game.load.image('ally', 'assets/img/allytemp.png');
        game.load.image('ekey', 'assets/img/ekey.png');
        game.load.image('copmac', 'assets/img/copymachine.png');
        game.load.image('board', 'assets/img/board.png');
        game.load.image('npc1', 'assets/img/npc1.png');
        game.load.image('desk', 'assets/img/desk.png');
        game.load.spritesheet('player', 'assets/img/player.png', 32, 32);
        game.load.tilemap('offmap', 'assets/img/onetilesheet.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('officetile', 'assets/img/officetest4 - Copy.png');
        
        //Source: https://freesound.org/people/timgormly/sounds/170142/
        game.load.audio('textaud', 'assets/audio/temptextsound.mp3');
        //Source: https://incompetech.filmmusic.io/song/3930-isolated/
        game.load.audio('officebgm', 'assets/audio/tempofficebgm.mp3');
        //Source: https://soundimage.org/dark-ominous/ - into the haunted forest
        game.load.audio('menubgm', 'assets/audio/menubgm.mp3');
        
        game.load.image('temp', 'assets/img/tempalert.png');
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
        console.log(musicOff);
        if(musicOff = false)
        {
           console.log(musicOff);
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
        /*4*/"It's a pleasure meeting you, " + name + ".",
        /*5*/"We spoke on the phone, but I'll debrief you once more:",
        /*6*/"I suspect one of my employees, Bob, has been skimming funds\nfrom this company.",
        /*7*/"I want you to find enough evidence to prove that he's indeed\nbehind this.",
        /*8*/"Feel free to talk to his coworkers or search the office\nfor information.",
        /*9*/"As far as my other employees are concerned, you're our\nnew research analyst.",
        /*10*/"Your boss spoke very highly of you -— Don't let me down."
                     ];
        ///////////
        this.pcSprite = [87]; //array of all line #s that need PC sprite on screen
        this.bossSprite = [0, 1, 2, 5]; //array of all line #s that need the boss sprite on screen
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
        pc = game.add.sprite(-5, 90, 'PC');
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
           this.msgs[4] = "It's a pleasure meeting you, " + name +"."; //updates the script with next name
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
        game.world.setBounds(0, 0, 2000, 934);
        map = game.add.tilemap('offmap');
        map.addTilesetImage('officetest4 - Copy', 'officetile');
        
        floors = map.createLayer('floorss');
        objects = map.createLayer('objects');
        walls = map.createLayer('walls');
        floors.resizeWorld();
        objects.resizeWorld();
        walls.resizeWorld();
        objects.debug = true;
        map.setCollisionBetween(0, 10501, true, 'walls');
        map.setCollisionBetween(0, 130491, true, 'objects');
        
        daybg = game.add.sprite(0, 0, 'textbar'); daybg.scale.setTo(10,10);
        daybg.alpha = 1;
        this.officebgm = game.add.audio('officebgm');
        if(musicOff = false)
        {
            this.officebgm.play('', 0, .5, true);
        }
        //default: 250 x 350ish
        player = game.add.sprite(1152, 605, 'player');
        textbar = game.add.sprite(0, 432, 'textbar');
        textbar2 = game.add.sprite(-100, -100, 'textbar');
        textbar.scale.setTo(1.5, 1.5);
        textbar2.scale.setTo(2, 1.5);
        //player.scale.setTo(1.5,1.5);
        game.physics.arcade.enable(player);
        player.animations.add('left', [4, 3, 4, 5], 10, true);
        player.animations.add('right', [7, 6, 7, 8], 10, true);
        player.animations.add('up', [10, 9, 10, 11], 10, true);
        player.animations.add('down', [1, 0, 1, 2], 10, true);
        //player.enableBody = true;
        player.body.collideWorldBounds = true;
        i = 0; //placeholder for typewriter
        textObj = game.add.text(10, 445, '', { font: '20px Courier New', fill: '#FFF'});
        msg = 'You can move around the office using the arrow keys or WASD.';
        counter = 0; // frame counter
        moved = false; // checks if the move message was destroyed yet
        activeText = false; //checks if the user is in the middle of a dialogue spot
        
        SPEED = 150; //dev speed constant, default is 100

        /***** Interaction objects *****/
        objs = game.add.group();
        objs.enableBody = true;
        /*0*/copymach = objs.create(2315, 724, 'copmac');
        copymach.scale.setTo(1.2, 1.2);
        /*1*/board = objs.create(460, 674, 'board'); board.scale.setTo(1, 1);
        /*2*/npc1 = objs.create(1847, 165, 'npc1'); npc1.scale.setTo(1.5,1.5);
        /*3*/desk = objs.create(950, 580, 'desk'); desk.scale.setTo(.75, .5); desk.alpha = 0;
        copymach.body.immovable = true;
        board.body.immovable = true;
        npc1.body.immovable = true;
        desk.body.immovable = true;
        game.physics.arcade.enable(objs);
        trigKeys = game.add.group();
        trig1 = trigKeys.create(copymach.x+10, copymach.y - 30, 'ekey'); trig1.alpha = 0;
        trig2 = trigKeys.create(board.x+20, board.y-30, 'ekey'); trig2.alpha = 0;
        trig3 = trigKeys.create(npc1.x+5, npc1.y-30, 'ekey'); trig3.alpha = 0;
        trig4 = trigKeys.create(desk.x+75, desk.y-30, 'ekey'); trig4.alpha = 0;
        found = [false, false, false, false];
        numFound = 0;
        inRange = [false, false, false, false]; //array of booleans testing if player is within range of NPC/O
        
        
    },
    
    update: function() {
        // Fade in BG
        if(daybg.alpha > 0)
        {
            daybg.alpha -= .025;
        }
        else if(daybg.alpha < 1 && counter % 2 == 0 && !moved && i <= msg.length)
        {
            textObj.text = msg.substr(0, i);
            i++;
            counter++;
        }
        else if(daybg.alpha < 1 && !moved)
        {
            counter++;
        }
        
        if(moved && textbar.alpha >= 0)
        {
            textObj.alpha -= .025;
            textbar.alpha -= .025;
        }
        game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN);
        game.physics.arcade.collide(player, walls);
        game.physics.arcade.collide(player, objects);
        //lets the player move with WASD or arrow keys
        if(!activeText) //deals with player movement, but only if they're not in the middle of a text sequence
        {
            // Checks of amy key is pressed, formatted in this terrible way for diagonal movement
            //Except now we don't want diagonal movement but I'm too afraid of breaking things to change this too much so we're just gonna hacky fix that. Maybe I'll come back and make this prettier later
            if(cursors.left.isDown || game.input.keyboard.isDown(Phaser.Keyboard.A) ||cursors.right.isDown || game.input.keyboard.isDown(Phaser.Keyboard.D) || cursors.up.isDown || game.input.keyboard.isDown(Phaser.Keyboard.W) || cursors.down.isDown || game.input.keyboard.isDown(Phaser.Keyboard.S))
            {
                if(cursors.left.isDown || game.input.keyboard.isDown(Phaser.Keyboard.A))
                {
                    player.body.velocity.x = SPEED * -1;
                    player.body.velocity.y = 0;
                    player.animations.play('left');
                    if(!moved)
                    {
                        moved = true;
                    }
                }
                if(cursors.right.isDown || game.input.keyboard.isDown(Phaser.Keyboard.D))
                {
                    player.body.velocity.x = SPEED;
                    player.body.velocity.y = 0;
                    player.animations.play('right');
                    if(!moved)
                    {
                        moved = true;
                    }
                }
                if(cursors.up.isDown || game.input.keyboard.isDown(Phaser.Keyboard.W))
                {
                    player.body.velocity.y = SPEED * -1;
                    player.body.velocity.x = 0;
                    player.animations.play('up');
                    if(!moved)
                    {
                        moved = true;
                    }
                }
                if(cursors.down.isDown || game.input.keyboard.isDown(Phaser.Keyboard.S))
                {
                    player.body.velocity.y = SPEED;
                    player.body.velocity.x = 0;
                    player.animations.play('down');
                    if(!moved)
                      {
                        moved = true;
                      }
                }
            }
            else
            {
                player.animations.stop();
                player.body.velocity.x = 0;
                player.body.velocity.y = 0;
            }

        }
        else //deals with dialogue when text sequence is active
        {
            if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
            {
                if(numFound == inRange.length)
                {
                    textObj.text = 'Looks like you\'ve found everything worth seeing here.\nLet\'s talk tonight. You know where to meet me.\n\n(Press X to continue.)';
                }
                else
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
        
        game.physics.arcade.collide(player, objs);
        
        if(game.input.keyboard.isDown(Phaser.Keyboard.X))
        {
            game.state.start('Battle');
            this.officebgm.stop();
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
    game.debug.spriteInfo(player, 10, 10);
    },
    
isInRange: function(player, obj)
    {
        x = Math.abs(player.x - obj.x);
        y = Math.abs(player.y - obj.y);
        DIFF = 200;
        if(x <= DIFF && y <= DIFF)
        {
            return true;
        }
        else
        {
            return false;
        }
    },
    
obj1: function(textObj)
    {
        textbar2.x = game.camera.x;
        textbar2.y = game.camera.y + 400
        textbar2.alpha = 1;
        textObj.alpha = 1;
        textObj.x = game.camera.x + 5;
        textObj.y = game.camera.y + 410;
        textObj.text = 'It looks like Decard made a copy of... medical bills? That\'s odd.\nWhy are there so many of them?\n\n(Press space to close.)';
    },
    
obj2: function()
    {
        textbar2.x = game.camera.x;
        textbar2.y = game.camera.y + 400
        textbar2.alpha = 1;
        textObj.alpha = 1;
        textObj.x = game.camera.x + 5;
        textObj.y = game.camera.y + 410;
        textObj.text = 'There\s a list of past employees of the month.\nDecard is the only one not on it.\n\n\n(Press space to close.)';
    },
obj3: function()
    {
        textbar2.x = game.camera.x;
        textbar2.y = game.camera.y + 400
        textbar2.alpha = 1;
        textObj.alpha = 1;
        textObj.x = game.camera.x + 5;
        textObj.y = game.camera.y + 410;
        textObj.text = 'Decard? Pfft. How a guy like that still has a job is beyond me.\nWish I could get away with coming in late and leaving early as\noften as he does.\n\n(Press space to close.)';
    },
obj4: function()
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
    
var Battle = function(game) {};
Battle.prototype = {
    create: function() { //
        game.stage.backgroundColor = '#facade'; // sets background color
        house = game.add.sprite(0, 0, 'housebg');
        textbar = game.add.sprite(0, 390, 'textbar');
        textbar.scale.setTo(1.5, 1.5);
        this.textObj = game.add.text(10, 410, '', { font: '20px Courier New', fill: '#FFF' });
        //All messages to be displayed on screen
        this.msgs = [
        /*0*/ "Good to see you, " + name + ".",
        /*1*/ "You again? What are you doing here?",
        /*2*/ "Same as you; hunting down the trash living here\nwho keeps cheating us out of their death.",
        /*3*/ "Seriously? You're a Grim Reaper too?",
        /*4*/ "To be continued..."];
        this.index = 0; //which line of msg array we're on
        this.i = 0; //which letter of line we're on
        this.counter = 0; //frame counter for text delay
        this.progtextObj = game.add.text(670, 525, '', { font: '15px Courier New', fill: '#FFF' });
        this.textaud = game.add.audio('textaud');
        pc = game.add.sprite(640, 108, 'PC');
        pc.scale.setTo(.3, .3);
        ally = game.add.sprite(-5, 190, 'ally');
        pc.alpha = 0; //pc.scale.x = -1;
        this.pcSprite = [1, 3]; //array of all line #s that need PC sprite on screen
        this.allySprite = [0, 2]; //array of all line #s that need the ally sprite on screen
        
    },
    
    update: function() {
        
        if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR))
            {
                if(this.i < this.msgs[this.index].length)
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
            
        if(this.index < this.msgs.length && this.counter % 2 == 0) //displays each letter every 2 frames
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
        if(this.counter % 4 == 0)
            this.textaud.play('', 0, .125, false);
    }
}



//Adds game states
game.state.add('Menu', Menu); //adds intro state
game.state.add('Intro', Intro); // adds play state
game.state.add('Day', Day); //adds main menu state
game.state.add('Battle', Battle); // adds battle state
game.state.start('Menu'); // starts the game at the main menu
