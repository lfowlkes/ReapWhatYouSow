/* Creators: Kristy Mihalyi, Kendra Shu, and Lauren Fowlkes
 * Group 26: Reap What You Sow
 * Github: https://github.com/lfowlkes/ReapWhatYouSow
 * Theme: Eternal
 */
var game = new Phaser.Game(800, 560, Phaser.AUTO, 'phaser');


var name = ''; // the name of the character, inputted later by player
var musicOn = true; //if the player wants music on
var musicPlaying = false; //checks if music is currently playing. redundant? yup!
var soundOn = true; // if the player wants sound effects on
var menubgm;

var MainMenu = function(game) {};
MainMenu.prototype = {
    
    preload: function() {
        /* Menu Text */
        game.load.image('office', 'assets/img/officebg.png');
        game.load.image('daybg', 'assets/img/officetest.png');
        game.load.image('textbar', 'assets/img/textbar.png');
        game.load.image('titletext', 'assets/img/titletext.png');
        game.load.image('opttext', 'assets/img/opttext.png');
        game.load.image('playtext', 'assets/img/playtext.png');
        game.load.image('creditstext', 'assets/img/creditstext.png');
        game.load.image('quittext', 'assets/img/quittext.png');
        game.load.image('musictxt', 'assets/img/music.png');
        game.load.image('soundtxt', 'assets/img/sound.png');
        game.load.image('on', 'assets/img/on.png');
        game.load.image('onnoglow', 'assets/img/onnoglow.png');
        game.load.image('off', 'assets/img/off.png');
        game.load.image('offnoglow', 'assets/img/offnoglow.png');
        game.load.image('back', 'assets/img/back.png');
        
        /*Intro assets*/
        game.load.image('PC', 'assets/img/player_profile.png');
        
        /* Office assets */
        game.load.image('ally', 'assets/img/ally.png');
        game.load.image('ekey', 'assets/img/ekey.png');
        game.load.image('copmac', 'assets/img/copymachine.png');
        game.load.image('board', 'assets/img/board.png');
        game.load.image('npc1', 'assets/img/npc1.png');
        game.load.image('desk', 'assets/img/desk.png');
        game.load.spritesheet('player', 'assets/img/player.png', 32, 32);
        game.load.spritesheet('allysp', 'assets/img/allysprite.png', 32, 32);
        game.load.tilemap('offmap', 'assets/img/onetilesheet.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('officetile', 'assets/img/officetest4 - Copy.png');
        
        /* House scene assets */
        game.load.image('outhousebg', 'assets/img/outdoorhousebg.png');
        game.load.image('housebg', 'assets/img/housebg.png');
        game.load.tilemap('housemap', 'assets/img/houseonetilesheet.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('housetile', 'assets/img/house5.png');
        game.load.image('fadebg', 'assets/img/fadebg.png');
        game.load.image('savebutton', 'assets/img/Savebutton.png');
        game.load.image('reapbutton', 'assets/img/ReapButton.png');
        game.load.image('angeltemp', 'assets/img/angeltemp.jpg');
        game.load.image('girl', 'assets/img/lilgirl.png');
        game.load.spritesheet('angelsp', 'assets/img/angel.png', 48, 64);
        game.load.spritesheet('plyrrpr', 'assets/img/plyrreaperss.png', 32, 32);
        game.load.spritesheet('allybattle', 'assets/img/allybattless.png', 64, 64);
        
        /* Sounds */
        //Source: https://freesound.org/people/timgormly/sounds/170142/
        game.load.audio('textaud', 'assets/audio/temptextsound.mp3');
        //Source: https://incompetech.filmmusic.io/song/3930-isolated/
        game.load.audio('officebgm', 'assets/audio/tempofficebgm.mp3');
        //Source: https://soundimage.org/dark-ominous/ - into the haunted forest
        game.load.audio('menubgm', 'assets/audio/menubgm.mp3');
        //Source: https://incompetech.filmmusic.io/song/3497-childrens-theme/
        game.load.audio('housebgm', 'assets/audio/enterhouse.mp3');
        //Source: https://incompetech.filmmusic.io/song/3547-controlled-chaos/
        game.load.audio('battlebgm', 'assets/audio/battlemusic.mp3');
        //Source: https://www.zapsplat.com/sound-effect-category/knives/
        game.load.audio('knife', 'assets/audio/knife.mp3');
    },
    create: function() { // Loads menu & instructions
        game.stage.backgroundColor = '#000000'; // sets background color
        /* Adds text sprites */
        titletext = game.add.sprite(80, 30, 'titletext');
        titletext.scale.setTo(1, 1); titletext.alpha = 0;
        playtext = game.add.sprite(298, 200, 'playtext');
        playtext.scale.setTo(1.25, 1.25); playtext.alpha = 0; playtext.inputEnabled = true;
        opttext = game.add.sprite(307, 315, 'opttext');
        opttext.scale.setTo(.75, .75); opttext.alpha = 0; opttext.inputEnabled = true;
        creditstext = game.add.sprite(309, 405, 'creditstext');
        creditstext.scale.setTo(.75, .75); creditstext.alpha = 0; creditstext.inputEnabled = true;
        ALPHARATE = .03; //Rate at which things fade in/out
        menubgm = game.add.audio('menubgm'); //background music
        if(musicOn == true && musicPlaying == false) //plays music if settings are enabled and it isn't already playing
        {
           menubgm.play('', 0, .5, true);
           musicPlaying = true;
        }
    },
    
    update: function() {
        game.scale.pageAlignHorizontally = true; //puts game window in center of browser
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
        if(opttext.alpha >=.9 && creditstext.alpha <=.9)
        {
            creditstext.alpha += ALPHARATE;
        }
        
        
        /***** Scales up on hover *****/
        playtext.events.onInputOver.add(this.hoverPlay, this);
        playtext.events.onInputOut.add(this.stopPlayHover, this);
        opttext.events.onInputOver.add(this.hoverOpt, this);
        
        opttext.events.onInputOut.add(this.stopOptHover, this);
        creditstext.events.onInputOver.add(this.hoverCredits, this);
        creditstext.events.onInputOut.add(this.stopCreditsHover, this);
        /**** Handles moving to different screens ****/
        playtext.events.onInputDown.add(this.startPlay, this);
        opttext.events.onInputDown.add(this.openSettings, this);
        creditstext.events.onInputDown.add(this.openCredits, this);
        
        if(game.input.keyboard.isDown(Phaser.Keyboard.A))
        {
            menubgm.stop();
            game.state.start('Battle', true, false, true);
        }
        if(game.input.keyboard.isDown(Phaser.Keyboard.B))
        {
            menubgm.stop();
            game.state.start('EnterHouse', true, false, true);
            SPEED = 150;
        }
        if(game.input.keyboard.isDown(Phaser.Keyboard.C))
        {
            menubgm.stop();
            game.state.start('GameOver', true, false, true);
        }
        if(game.input.keyboard.isDown(Phaser.Keyboard.D))
        {
            menubgm.stop();
            game.state.start('BeatAngel');
        }
    },
    /***** All the functions for handling text hover events *****/
    hoverPlay: function() {
        playtext.scale.setTo(1.5, 1.5);
        playtext.x -= 15;
        playtext.y -= 10;
    },
    
    stopPlayHover: function() {
        playtext.scale.setTo(1.25, 1.25);
        playtext.x += 15;
        playtext.y += 10;
    },
    
    hoverOpt: function() {
        opttext.scale.setTo(1, 1);
        opttext.x -= 20;
        opttext.y -= 10;
    },
    
    stopOptHover: function() {
        opttext.scale.setTo(.75, .75);
        opttext.x += 20;
        opttext.y += 10;
    },
    hoverCredits: function() {
        creditstext.scale.setTo(1, 1);
        creditstext.x -= 20;
        creditstext.y -= 10;
    },
    
    stopCreditsHover: function() {
        creditstext.scale.setTo(.75, .75);
        creditstext.x += 20;
        creditstext.y += 10;
    },
    openSettings: function() {
        if(musicPlaying)
        {
            menubgm.stop();
            musicPlaying = false;
        }
        game.state.start('Settings', true, false, menubgm);
    },
openCredits: function()
    {
        if(musicPlaying)
        {
            menubgm.stop();
            musicPlaying = false;
        }
        game.state.start('Credits');
    },
    startPlay: function() {
        if(musicPlaying)
        {
            menubgm.stop();
            musicPlaying = false;
        }
        game.state.start('Intro');
    }
}

var Settings = function(game) {};
Settings.prototype = {
init: function(bgm)
    {
        this.bgm = bgm;
    },
create: function() {
    game.stage.backgroundColor = '#000000'; // sets background color
    
    //Adds text sprites
    if(musicOn == true && musicPlaying == false) //plays music if settings are enabled and it isn't already playing
    {
        menubgm.play('', 0, .5, true);
        musicPlaying = true;
    }
    optionstext = game.add.sprite(280, 10, 'opttext'); optionstext.scale.setTo(1.25, 1.25);
    musictxt = game.add.sprite(200, 190, 'musictxt');
    musictxt.inputEnabled = true;
    soundtxt = game.add.sprite(115, 315, 'soundtxt');
    soundtxt.inputEnabled = true;
    musiconglow = game.add.sprite(400, 190, 'on');
    musiconglow.inputEnabled = true;
    musiconnoglow = game.add.sprite(400, 190, 'onnoglow');
    musiconnoglow.inputEnabled = true;
    musicoffglow = game.add.sprite(525, 190, 'off');
    musicoffglow.inputEnabled = true;
    musicoffnoglow = game.add.sprite(525, 190, 'offnoglow');
    musicoffnoglow.inputEnabled = true;
    if(musicOn)
    {
        musiconnoglow.alpha = 0;
        musicoffglow.alpha = 0;
        musiconglow.alpha = 1;
        musicoffnoglow.alpga = 1;
        
    }
    else
    {
        musiconnoglow.alpha = 1;
        musicoffglow.alpha = 1;
        musiconglow.alpha = 0;
        musicoffnoglow.alpga = 0;
            
    }
    soundonglow = game.add.sprite(400, 315, 'on');
    soundonglow.inputEnabled = true;
    soundonnoglow = game.add.sprite(400, 315, 'onnoglow');
    soundonnoglow.alpha = 0; soundonnoglow.inputEnabled = true;
    soundoffglow = game.add.sprite(525, 315, 'off');
    soundoffglow.alpha = 0; soundoffglow.inputEnabled = true;
    soundoffnoglow = game.add.sprite(525, 315, 'offnoglow');
    soundoffnoglow.inputEnabled = true;
    if(soundOn)
    {
        soundonnoglow.alpha = 0;
        soundoffglow.alpha = 0;
        soundonglow.alpha = 1;
        soundoffnoglow.alpga = 1;
        
    }
    else
    {
        soundonnoglow.alpha = 1;
        soundoffglow.alpha = 1;
        soundonglow.alpha = 0;
        soundoffnoglow.alpga = 0;
        
    }
    backtxt = game.add.sprite(350, 450, 'back');
    backtxt.scale.setTo(.8, .8); backtxt.inputEnabled = true;

    
},
update: function() {
    /* Event listeners for when user hits text */
    musiconglow.events.onInputDown.add(this.turnMusicOn, this);
    musiconnoglow.events.onInputDown.add(this.turnMusicOn, this);
    musicoffglow.events.onInputDown.add(this.turnMusicOff, this);
    musicoffnoglow.events.onInputDown.add(this.turnMusicOff, this);
    soundonglow.events.onInputDown.add(this.turnSoundOn, this);
    soundonnoglow.events.onInputDown.add(this.turnSoundOn, this);
    soundoffglow.events.onInputDown.add(this.turnSoundOff, this);
    soundoffnoglow.events.onInputDown.add(this.turnSoundOff, this);
    backtxt.events.onInputDown.add(this.backToMenu, this);
},
    /*Methods for toggling on/off music & sound effects*/
turnMusicOn: function() {
  if(musicOn == false)
  {
      if(musicPlaying == false)
          this.bgm.play();
      else
          this.bgm.resume();
      musicPlaying = true;
      musicOn = true;
      musiconglow.alpha = 1;
      musiconnoglow.alpha = 0;
      musicoffglow.alpha = 0;
      musicoffnoglow.alpha = 1;
  }
},
turnMusicOff: function() {
  if(musicOn == true)
  {
   this.bgm.pause();
   musicPlaying = false;
   musicOn = false;
   musiconglow.alpha = 0;
   musiconnoglow.alpha = 1;
   musicoffglow.alpha = 1;
   musicoffnoglow.alpha = 0;
  }
},
turnSoundOn: function() {
  if(soundOn == false)
  {
      soundOn = true;
      soundonglow.alpha = 1;
      soundonnoglow.alpha = 0;
      soundoffglow.alpha = 0;
      soundoffnoglow.alpha = 1;
  }
},
turnSoundOff: function() {
    if(soundOn == true)
    {
        soundOn = false;
        soundonglow.alpha = 0;
        soundonnoglow.alpha = 1;
        soundoffglow.alpha = 1;
        soundoffnoglow.alpha = 0;
    }
},
    //Takes user back to main menu
backToMenu: function() {
    if(musicPlaying)
    {
        menubgm.stop();
        musicPlaying = false;
    }
    game.state.start('MainMenu');
  }
}
//stage for the credits page
var Credits = function(game) {};
Credits.prototype = {
preload: function()
    {
        game.load.image('credittxt', 'assets/img/credittxt.png');
    },

create: function()
    {
        game.stage.backgroundColor = '#000';
        credittxt = game.add.sprite(50, 560, 'credittxt');
        backtxt = game.add.sprite(325, 2000, 'back');
        backtxt.scale.setTo(.8, .8); backtxt.inputEnabled = true;
        if(musicOn == true && musicPlaying == false) //plays music if settings are enabled and it isn't already playing
        {
            menubgm.play('', 0, .5, true);
            musicPlaying = true;
        }
    },
    
update: function()
    {
        /* Scrolls up the credits like a movie because we're super fancy like that. */
        if(credittxt.y > -1450)
            credittxt.y -= 1;
        if(backtxt.y > 245)
            backtxt.y -= 1;
        backtxt.events.onInputDown.add(this.backToMenu, this);
    },
backToMenu: function() { //takes user back to main menu
    if(musicPlaying)
    {
        menubgm.stop();
        musicPlaying = false;
    }
    game.state.start('MainMenu');
}
}

var Intro = function(game) {};
Intro.prototype = {
    init: function() {
        office = game.add.sprite(0,0, 'office'); //adds office background
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
        /*7*/"I suspect one of my employees, Decard, has been skimming funds\nfrom this company.",
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
        this.progtextObj = game.add.text(650, 535, '', { font: '15px Courier New', fill: '#FFF', align: 'right'});
        this.index = 0; //which line of the script we're pulling from
        this.i = 0; //what character of the sentence the typewriter is on
        this.counter = 0; //counter to slow down the typewriter.
        this.inputCreated = false; //checks if the user has reached the textbox screen yet
        this.temp; //text object to be used for instructions
        
    },
    preload: function() {
        game.load.image('boss', 'assets/img/bosstemp.png');
    },
    create: function() { // Loads game state
        game.stage.backgroundColor = '#000'; // sets background color
        /* Plugin source: https://github.com/azerion/phaser-input*/
        this.input = game.add.plugin(PhaserInput.Plugin)
        pc = game.add.sprite(162, 116, 'PC'); pc.scale.setTo(-.3, .3);
        boss = game.add.sprite(660, 200, 'boss');
        pc.alpha = 0;
        this.textaud = game.add.audio('textaud');
        fade = game.add.sprite(0,0, 'fadebg');
        timer = game.time.create(); //timer for reset of text and stuff
        timer.loop(25, fadeBg, this, true, fade);
        timer.start();
        
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
                    this.progtextObj.text = 'Press [SPACE] >>'
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
        if((office.alpha <= 0 || game.input.keyboard.justPressed(Phaser.Keyboard.X)) && this.index != 3)
        {
            game.state.start('Day');
        }
        else if(this.index >= this.msgs.length)
        {
            office.alpha -= .02;
            this.textObj.text = '';
            this.progtextObj.text = '';
            boss.alpha = 0;
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
                    this.progtextObj.text = 'Press [SPACE] >>'
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
        
        player.scale.setTo(1.5,1.5);
        game.physics.arcade.enable(player); //turns on player physics
        player.animations.add('left', [4, 3, 4, 5], 10, true); //left walking animation
        player.animations.add('right', [7, 6, 7, 8], 10, true); //right walking animation
        player.animations.add('up', [10, 9, 10, 11], 10, true); //up walking animation
        player.animations.add('down', [1, 0, 1, 2], 10, true); //down walking animation
        //player.enableBody = true;
        player.body.collideWorldBounds = true; //enables player collisions
        i = 0; //placeholder for typewriter
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
        /*4*/allysp = objs.create(878, 775, 'allysp', 1); allysp.scale.setTo(1.5, 1.5);
        copymach.body.immovable = true; //stops player from moving copy machine
        board.body.immovable = true; //stops player from moving bulletin board
        npc1.body.immovable = true; // stops player from moving npc
        desk.body.immovable = true; //stops player from moving desk
        allysp.body.immovable = true;
        game.physics.arcade.enable(objs); //turns on arcade physics for objects
        trigKeys = game.add.group(); //creates a group for the indicator icons
        trig1 = trigKeys.create(copymach.x+10, copymach.y - 30, 'ekey'); trig1.alpha = 0; //icon for copy machine
        trig2 = trigKeys.create(board.x+30, board.y-60, 'ekey'); trig2.alpha = 0; //icon for bulletin board
        trig3 = trigKeys.create(npc1.x+5, npc1.y-30, 'ekey'); trig3.alpha = 0; // icon for npc
        trig4 = trigKeys.create(desk.x+25, desk.y-30, 'ekey'); trig4.alpha = 0; //icon for desk
        trig5 = trigKeys.create(allysp.x+8, allysp.y-30, 'ekey');
        found = [false, false, false, false, false]; //array of booleans for if an obj has been interacted with yet
        numFound = 0; //tracks the number of objects that have been found so far
        inRange = [false, false, false, false, false]; //array of booleans testing if player is within range of NPC/O
        ally = game.add.sprite(152, 116, 'ally'); ally.scale.setTo(-.125, .125); ally.alpha = 0;
        textbar = game.add.sprite(0, 532, 'textbar'); //adds background for text
        textbar2 = game.add.sprite(-100, -100, 'textbar'); //second text bar for interaction text
        textbar.scale.setTo(1.5, 1.5); //resizes text bar
        textbar2.scale.setTo(2, 1.5);
        textObj = game.add.text(10, 545, '', { font: '20px Courier New', fill: '#FFF'}); //text object for dialogue
        msg = 'You can move around the office using the arrow keys or WASD.'; //intro message
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
                    ally.x = game.camera.x + 152; ally.y = game.camera.y + 126;
                    ally.alpha = 1;
                    textObj.text = 'Looks like you\'ve found everything worth seeing here.\nLet\'s talk tonight. You know where to meet me.\n\n\n(Press [Z] to continue.)';
                }
                else //closes the text bar if there are still objects left to find
                {
                    activeText = false;
                    textbar2.alpha = 0;
                    while(textObj.alpha >= 0)
                    {
                        textObj.alpha -= .025;
                    }
                    ally.alpha = 0;
                }
            }
        }
        
        game.physics.arcade.collide(player, objs); //enables collisions between player and interaction sprites
        
        if(game.input.keyboard.isDown(Phaser.Keyboard.Z)) //starts battle intro when player hits x
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
             else if(inRange[4])
             {
                 activeText = true;
                 textObj.alpha = 1;
                 textObj.fill = '#FFF'
                 this.obj5(textObj);
                 if(found[4] == false)
                 {
                     numFound++;
                     found[4] = true;
                 }
             }
         }
        //debug info for sprite
    //game.debug.spriteInfo(player, 10, 10);
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
        textObj.text = 'It looks like Decard made a copy of... medical bills? That\'s odd.\nWhy are there so many of them?\n\n\n(Press [SPACE] to close.)';
    },
    
obj2: function() //triggers text for found bulletin board
    {
        textbar2.x = game.camera.x;
        textbar2.y = game.camera.y + 400
        textbar2.alpha = 1;
        textObj.alpha = 1;
        textObj.x = game.camera.x + 5;
        textObj.y = game.camera.y + 410;
        textObj.text = 'There\s a list of past employees of the month.\nDecard is the only one not on it.\n\n\n(Press [SPACE] to close.)';
    },
obj3: function()//triggers text for found npc
    {
        textbar2.x = game.camera.x;
        textbar2.y = game.camera.y + 400
        textbar2.alpha = 1;
        textObj.alpha = 1;
        textObj.x = game.camera.x + 5;
        textObj.y = game.camera.y + 410;
        textObj.text = 'Decard? Pfft. How a guy like that still has a job is beyond me.\nWish I could get away with coming in late and leaving early as\noften as he does.\n\n\n(Press [SPACE] to close.)';
    },
obj4: function() //triggers text for found desk
    {
        textbar2.x = game.camera.x;
        textbar2.y = game.camera.y + 400
        textbar2.alpha = 1;
        textObj.alpha = 1;
        textObj.x = game.camera.x + 5;
        textObj.y = game.camera.y + 410;
        textObj.text = 'Decard\'s desk is such a mess. Wait, is that a bank statement?\nWhat did he just spend $50,000 on? Where did he GET $50,000?\n\n\n(Press [SPACE] to close.)';
    },
obj5: function() //triggers text for found desk
    {
        textbar2.x = game.camera.x;
        textbar2.y = game.camera.y + 400
        textbar2.alpha = 1;
        textObj.alpha = 1;
        textObj.x = game.camera.x + 5;
        textObj.y = game.camera.y + 410;
        ally.x = game.camera.x + 152; ally.y = game.camera.y + 126;
        ally.alpha = 1;
        textObj.text = 'Ah, so you\'re my partner in this investigation, eh?\nI\'d give you a hand with the search, but I hear there\'s some\nice cream in the breakroom that\'s calling my name.\n\n(Press [SPACE] to close)';
    }
}
    
var BattleIntro = function(game) {};
BattleIntro.prototype = {
    create: function() {
        game.stage.backgroundColor = '#facade'; // sets background color
        house = game.add.sprite(0, 0, 'outhousebg');
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
        /*17*/ "Look, enough stalling. Get in there and do it already.\nI'll meet you in there."
                     ];
        this.index = 0; //which line of msg array we're on
        this.i = 0; //which letter of line we're on
        this.counter = 0; //frame counter for text delay
        this.progtextObj = game.add.text(655, 525, '', { font: '15px Courier New', fill: '#FFF' });
        this.textaud = game.add.audio('textaud');
        pc = game.add.sprite(640, 108, 'PC');
        pc.scale.setTo(.3, .3);
        ally = game.add.sprite(152, 116, 'ally'); ally.scale.setTo(-.125, .125);
        pc.alpha = 0; //pc.scale.x = -1;
        this.pcSprite = [1, 3, 5, 7, 9, 11, 13, 16]; //array of all line #s that need PC sprite on screen
        this.allySprite = [0, 2, 4, 6, 8, 10, 12, 14, 15, 17]; //array of all line #s that need the ally sprite on screen
        fade = game.add.sprite(0,0, 'fadebg');
        timer = game.time.create(); //timer for reset of text and stuff
        timer.loop(25, fadeBg, this, true, fade);
        timer.start();
    },
    
    update: function() {
        
        if(game.input.keyboard.justPressed(Phaser.Keyboard.X))
        {
            game.state.start('EnterHouse');
        }
        if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR))
            {
                if(this.index == this.msgs.length-1)
                {
                    game.state.start('EnterHouse');
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
                    this.progtextObj.text = 'Press [SPACE] >>'
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
        textObj.text = msg.substr(0, i);
        if(this.counter % 4 == 0 && soundOn == true)
            this.textaud.play('', 0, .07, false);
    }
}

var EnterHouse = function(game) {};
EnterHouse.prototype = {
create: function() {
    housebgm = game.add.audio('housebgm');
    if(musicOn)
    {
        housebgm.play('', 0, .5, true);
    }
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
    
    player = game.add.sprite(1326, 528, 'plyrrpr', 4); //adds player sprite
    player.scale.setTo(1.5,1.5); //makes sprite smaller
    game.physics.arcade.enable(player); //enables arcade physics on playre
    player.animations.add('left', [4, 3, 4, 5], 10, true); //left walking animation
    player.animations.add('right', [7, 6, 7, 8], 10, true); //right walking animation
    player.animations.add('up', [10, 9, 10, 11], 10, true); //up walking animation
    player.animations.add('down', [1, 0, 1, 2], 10, true); //down waling animation
    
    
    cutscene = false;
    freeze = false; //checks if movement needs to be frozen [during cutscene]
    
    
    /* Cutscene Assets */
    this.index = 0; //which line of msg array we're on
    this.i = 0; //which letter of line we're on
    this.counter = 0; //frame counter for text delay
    this.textaud = game.add.audio('textaud');
    textbar = game.add.sprite(0, 550, 'textbar');
    textbar.scale.setTo(1.5, 1.5); textbar.alpha = 0;
    txt = game.add.text(10, 560, '', { font: '20px Courier New', fill: '#FFF'});
    this.progtextObj = game.add.text(650, 630, '', { font: '15px Courier New', fill: '#FFF' });
    pc = game.add.sprite(640, 271, 'PC'); pc.alpha = 0;
    pc.scale.setTo(.3, .3);
    ally = game.add.sprite(152, 276, 'ally'); ally.alpha = 0;
    ally.scale.setTo(-.125, .125);
    angel = game.add.sprite(300, 425, 'angeltemp'); angel.scale.setTo(.15, .15); angel.alpha = 0;
    angelsp = game.add.sprite(250, 325, 'angelsp', 7); angelsp.alpha = 0;
    girl = game.add.sprite(355, 269, 'girl');
    pcSprite = [0, 1, 3, 5];
    allySprite = [2, 4, 6, 7];
    angelSprite = [52];
    msgs = [
    /*0*/"Wait... our target isn't Decard? It's this little girl?\nHis daughter?",
    /*1*/"Who the hell sends people to kill a little girl?",
    /*2*/"What's taking you so long? Just reap her already.",
    /*3*/"You knew? You knew the target was this child?",
    /*4*/"Of course I knew. She's sick; the money Decard was stealing was\nto pay for her experimental medical procedures.\nWhat, you really thought Decard was the one on Death's door?",
    /*5*/"Yes! As a matter of fact, I did!\nYou can't expect me to just kill a child!",
    /*6*/"Well, sorry to break it to you sweetheart, but our job involves\nreaping all sorts when their number comes up. Including kids.",
    /*7*/"So, are you going to kill her, or what?"
            ]
    
    savemsgs = [
    /*0*/ "I\'m not doing it. I\'m not reaping the soul of a child.",
    /*1*/ "You say that as though you have a choice. News flash: You don\'t.\nBut fine, I\'ll do it myself then.",
    /*2*/ "If you want her, you\'re going to have to go through me first.",
    /*3*/ "Oh, with pleasure."
    ],
    
    
    reapmsgs = [
    /*0*/"Fine... I'll do it...",
    /*1*/"Good choice. Now hurry up and get it done with. Quickly if you\nplease, before her dad wakes up.",
    /*2*/"I wouldn't do that if I were you.",
    /*3*/"Oh you've got to be kidding me...",
    /*4*/"Decard's got angels on his payroll too? Seriously?",
    /*5*/"Payroll no. I'm here because this girl deserves better than to\nsuffer her end at your hands.",
    /*6*/"And who\'s going to stop us? You?",
    /*7*/"Indeed. If you want her, you'll have to get through me first."]
    
    save = game.add.sprite(150, 558, 'savebutton'); save.alpha = 0; save.inputEnabled = true;
    reap = game.add.sprite(450, 558, 'reapbutton'); reap.alpha = 0; reap.inputEnabled = true;
    fightAlly = true;
    picked = false;
    fadebg = game.add.sprite(0,0,'fadebg'); fadebg.alpha = 0;
    fade = game.add.sprite(0,0, 'fadebg'); fade.scale.setTo(5, 5);
    timer2 = game.time.create(); //timer for reset of text and stuff
    timer2.loop(25, fadeBg, this, true, fade);
    timer2.start();
},
    
update: function()
    {
        game.physics.arcade.collide(player, houseWalls); //makes player collide with wall layer
        game.physics.arcade.collide(player, houseObjs); //makes player collide with object layer
        game.physics.arcade.collide(player, inacc); //makes player collide with inaccessible layer
        game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN); //sets the camera to follow the player
        //game.debug.spriteInfo(player, 10, 10);
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
        
        
        //triggers cutscene when player gets to specific point
        if((player.x >= 192 && player.x <= 272) && player.y <= 490 && cutscene == false)
        {
            cutscene = true;
            freeze = true;
            timer = game.time.create(); //timer for reset of text and stuff
            timer.loop(50, this.moveCamera, this);
            timer.start();
        }
        if(cutscene == true && game.camera.y <= 103 && picked == false)
        {
            textbar.alpha = 1;
            this.typewriter(msgs, 'first');
            
        }
        
        save.events.onInputDown.add(this.chooseSave, this);
        reap.events.onInputDown.add(this.chooseReap, this);
        
        if(picked) //once the player has made their decision
        {
            if(fightAlly)
                this.typewriter(savemsgs, 'second');
            else
                this.typewriter(reapmsgs, 'second');
        }
    },
    
 moveCamera: function() {

        game.camera.y -= 2;
    
},
fadeOut: function(){
    if(fadebg.alpha >= .9)
    {
        if(musicOn)
            housebgm.stop();
        game.state.start('Battle', true, false, fightAlly);
    }
    fadebg.alpha += .05;
},
    
chooseSave: function(){
    fightAlly = true;
    save.kill();
    reap.kill();
    picked = true;
    this.i = 0;
    this.index = 0;
    this.counter = 0;
    pcSprite = [0, 2];
    allySprite = [1, 3];
    pc.alpha = 1;
},
    
chooseReap: function(){
    fightAlly = false;
    save.kill();
    reap.kill();
    picked = true;
    this.i = 0;
    this.index = 0;
    this.counter = 0;
    pcSprite = [0, 3];
    allySprite = [1, 4, 6];
    angelSprite = [2, 5, 7];
    pc.alpha = 1;
},
    
typewriter: function(msg, code)
    {
        if(this.index == 0)
            pc.alpha = 1;
        if(game.input.keyboard.justPressed(Phaser.Keyboard.X))
        {
            game.state.start('Battle');
        }
        if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR))
        {
            if(this.index >= msg.length-1)
            {
                if(code == 'first')
                {
                    ally.alpha = 0;
                    save.alpha = 1;
                    reap.alpha = 1;
                    txt.text = '';
                    this.progtextObj = '';
                }
                else {
                timer2 = game.time.create(); //timer for reset of text and stuff
                timer2.loop(50, this.fadeOut, this);
                timer2.start();
                }
            }
            else if(this.i < msg[this.index].length)
            {
                this.i = msg[this.index].length;
                txt.text = msg[this.index];
            }
            else
            {
                this.index++;
                this.i = 0;
                this.counter = 0;
                if(this.index == 2 && code == 'second' && !fightAlly)
                    angelsp.alpha = 1;
                if(pcSprite.includes(this.index)) //checks if we're on a line that needs the PC sprite on screen
                 {
                     pc.alpha = 1;
                     ally.alpha = 0;
                     angel.alpha = 0;
                 }
                 else if (allySprite.includes(this.index))// we're on a line that needs ally's sprite on screen
                 {
                     pc.alpha = 0;
                     ally.alpha = 1;
                     angel.alpha = 0;
                 }
                 else if (angelSprite.includes(this.index))// we're on a line that needs ally's sprite on screen
                 {
                     pc.alpha = 0;
                     ally.alpha = 0;
                     angel.alpha = 1;
                 }
                 else
                 {
                 pc.alpha = 0;
                 ally.alpha = 0;
                 this.textObj.x = 350;
                 }
            }
            
        }
        
        
        if(this.index < msg.length)
        {
            if(this.i <= msg[this.index].length)
            {
                txt.text = msg[this.index].substr(0, this.i);
                if(this.counter % 4 == 0 && soundOn == true)
                    this.textaud.play('', 0, .07, false);
                this.i++; //moves us to the next letter
            }
            if(this.i == msg[this.index].length)
            {
                if(this.index == 0) //displays instruction on first line
                {
                    this.progtextObj.text = 'Press [SPACE] >>'
                }
                else //trusts that the player now knows >> = press space
                {
                    this.progtextObj.x = 775
                    this.progtextObj.text = '>>'
                }
            }
        }
        this.counter++;
    }
}

var Battle = function(game) {};
Battle.prototype = {
    
init: function(fightAlly)
    {
        allyFight = fightAlly; //checks if player is fighting the angel or the ally
    },
preload: function()
    {
        game.load.image('meter', 'assets/img/barmeter.png');
        game.load.image('bar', 'assets/img/battlebar.png');
        game.load.image('angel', 'assets/img/angeltemp.jpg');
        game.load.image('PC', 'assets/img/player_profile.png');
        game.load.image('house', 'assets/img/housebg.png');
        game.load.image('fade', 'assets/img/fadebg.png');
        game.load.spritesheet('plyrbat', 'assets/img/playerbattless.png', 64, 64);
        game.load.spritesheet('allybounce', 'assets/img/allybounce.png', 32, 32);
    },
create: function()
    {
        /* Stage set up assets */
        battlebgm = game.add.audio('battlebgm');
        if(musicOn)
        {
            battlebgm.play('', 0, .5, true);
        }
        game.stage.backgroundColor = '#cec3ff';
        housebg = game.add.sprite(0, 0, 'house');
        game.physics.startSystem(Phaser.Physics.ARCADE);
        textbar = game.add.sprite(0, 390, 'textbar');
        textbar.scale.setTo(1.5, 1.5);
        txt = game.add.text(60, 525, 'Press [SPACE] when meter is within green area to attack.', { font: '20px Courier New', fill: '#FFF'});
        met = game.add.sprite(395, 452, 'meter');
        bar = game.add.sprite(200, 450, 'bar'); bar.alpha = .5;
        met.enableBody = true;
        game.physics.arcade.enable(met);
        
        /* Sprite assets */
        pc = game.add.sprite(640, 108, 'PC');
        pc.scale.setTo(.3, .3);
        player = game.add.sprite(425, 250, 'plyrbat', 4); player.scale.setTo(1, 1);
        player.animations.add('bounce', [1, 0], 5, true);
        girl = game.add.sprite(542, 140, 'girl');
        if(allyFight) //makes the sprite the ally if you chose to save the girl
        {
            enemy = game.add.sprite(151, 116, 'ally');
            enemy.scale.setTo(-.125, .125);
            enemysp = game.add.sprite(325, 250, 'allybattle');
            enemysp.animations.add('bounce', [0,1], 5, true);
        }
        else //makes the sprite the angel if you chose to kill the girl
        {
            enemy = game.add.sprite(10, 205, 'angel')
            enemy.scale.setTo(.25, .25);
            enemysp = game.add.sprite(325, 245, 'angelsp', 4);
            enemysp.animations.add('bounce', [4,3], 5, true);
        }
        
        /*Text assets */
        enemyHealth = 10;
        playerHealth = 20;
        eHealthTxt = game.add.text(10, 50, 'Health: 10');
        pHealthTxt = game.add.text(650, 50, 'Health: 20');
        missed = game.add.text(345, 405, '', { font: '30px Courier New', fill: '#FFF'});
        plyrAtkVal = game.add.text(700, 20, '', { fill: '#ff0000'});
        enmyAtkVal = game.add.text(50, 20, '', { fill: '#ff0000'});
        
        fade = game.add.sprite(0,0, 'fade');
        start = false;
        moving = true;
        BAR_VEL = 600 //constant for bar movement velocity
},
    
update: function() {
    //game.debug.spriteInfo(met, 10, 10);
    if(fade.alpha > 0)
    {
        fade.alpha -= .025;
    }
    if(fade.alpha <= 0 && !start)
    {
        start = true;
        timer3 = game.time.create(); //timer for reset of text and stuff
        timer3.add(3000, this.startBar, this);
        timer3.start();
    }
    if (enemyHealth <= 0)
    {
        timer3 = game.time.create();
        if(allyFight)
        {
            timer.add(2000, this.allyEnd, this);
        }
        else
        {
            timer.add(2000, this.angelEnd, this);
        }
        timer.start();
    }
    else if(playerHealth <= 0)
    {
        if(musicOn)
            battlebgm.stop();
        game.state.start('GameOver');
    }
    
    //DEBUG
    /*if(game.input.keyboard.isDown(Phaser.Keyboard.Z))
     met.x -= 1;
     if(game.input.keyboard.isDown(Phaser.Keyboard.X))
     met.x += 1;*/
    
    if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR))
    {
        if(moving)
        {

            timer2 = game.time.create(); //timer for enemy attack
            timer2.add(3000, this.attack, this);
            timer2.start();
            timer = game.time.create(); //timer for reset of text and stuff
            timer.add(5000, this.reset, this);
            timer.start();
            if(met.x >= bar.x + 170 && met.x <= bar.x + 220) //checks if player stopped meter within range
            {
                enemyHealth -= 2;
                enmyAtkVal.text = '-2';
                eHealthTxt.text = 'Health: ' + enemyHealth;
                
            }
            else //lets the player know if they missed
            {
                missed.text = 'Missed';
            }
            moving = false;
        }
        
    }
    if(start && moving) //if the bar is currently allowed the move and the round has started
    {
        enmyAtkVal.text = '';
        plyrAtkVal.text = '';
        player.animations.play('bounce');
        enemysp.animations.play('bounce');
        if(met.x <= 215) //moves meter within constraint of bar
            met.body.velocity.x = BAR_VEL;
        else if(met.x >= 575)
            met.body.velocity.x = -BAR_VEL;
    }
    else
    {
        met.body.velocity.x = 0; //stops moving meter if moving isn't true
    }
    //time.text = 'Time: ' + timer.elapsed / Phaser.Timer.SECOND;
},
    
    attack: function() { //deals with figuring out enemy attack value
        missed.text = '';
        x = game.rnd.integerInRange(0,3);
        if(x > 0)
        {
            playerHealth -= x
            plyrAtkVal.text = '-' + x
            pHealthTxt.text = 'Health: ' + playerHealth;
        }
        else
            missed.text = 'Dodged';
    },
    
    reset: function() //resets text and meter
    {
        moving = true;
        met.x = 295;
        met.body.velocity.x = 500;
        timer.destroy
        missed.text = '';
    },
    allyEnd: function() //triggers stage if you beat the ally
    {
        if(musicOn)
            battlebgm.stop();
        game.state.start('BeatAlly');
    },
    angelEnd: function() //triggers stage if you beat the angel
    {
        if(musicOn)
            battlebgm.stop();
        game.state.start('BeatAngel');
    },
startBar: function()
    {
        met.body.velocity.x = BAR_VEL;
    }
}

var BeatAlly = function(game) {};
BeatAlly.prototype = {
create: function() {
    if(musicOn)
    {
        battlebgm.play('', 0, .5, true);
    }
    game.stage.backgroundColor = '#000';
    housebg = game.add.sprite(0, 0, 'housebg');
    textbar = game.add.sprite(0, 390, 'textbar');
    textbar.scale.setTo(1.5, 1.5);
    txt = game.add.text(10, 425, '', { font: '20px Courier New', fill: '#FFF'});
    progtextObj = game.add.text(750, 530, '>>', { font: '15px Courier New', fill: '#FFF' });
    pc = game.add.sprite(640, 108, 'PC')
    pc.scale.setTo(.3, .3); pc.alpha = 0;
    ally = game.add.sprite(151, 116, 'ally');
    ally.scale.setTo(-.125, .125);
    angel = game.add.sprite(0,0, 'angeltemp'); angel.alpha = 0;
    girl = game.add.sprite(542, 140, 'girl');
    player = game.add.sprite(425, 250, 'plyrrpr', 4); player.scale.setTo(1.5, 1.5);
    player.animations.add('up', [10, 9, 10, 11], 10, true); //up walking animation
    player.animations.add('right', [7, 6, 7, 8], 10, true); //right walking animation
    allysp = game.add.sprite(325, 250, 'allysp', 7); allysp.scale.setTo(1.5,1.5);
    pcSprite = [50];
    msgs = [
            /*0*/"Fine... you win this battle.",
            /*1*/"You can save the girl this time. But believe me,\nI won't forget this.",
            /*2*/"And neither will HQ.",
            /*3*/ "You\'ll be safe now, little one. I promise."]
    i = 1;
    txt.text = msgs[0];
    fadebg = game.add.sprite(0,0,'fadebg'); fadebg.alpha = 0;
    timer = game.time.create(); //timer for reset of text and stuff
    timer.loop(25, fadeBgs, this, false, fadebg, 'Credits');
    timer2 = game.time.create(); //timer for reset of text and stuff
    timer2.loop(25, this.walk, this);
    done1 = false; //when the ally is done talking
    done2 = false; //when the player is done moving
    done3 = false; //when last line has been read
    
    fade = game.add.sprite(0,0, 'fadebg'); fade.scale.setTo(5, 5);
    timer3 = game.time.create(); //timer for reset of text and stuff
    timer3.loop(10, fadeBg, this, true, fade);
    timer3.start();
},
update: function() {
    if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR))
    {
            if(i == 3 && !done3 && !done2)
            {
                done1 = true;
                txt.text = '';
            }
            else if(i < msgs.length && i != 3)
            {
                txt.text = msgs[i]
                i++;
            }
            else if(done2)
            {
                txt.text = msgs[3];
                done3 = true;
            }
    }
    if(done1)
        timer2.start();
    if(done2)
    {
        pc.alpha = 1;
        txt.text = msgs[3];
    }
    if(done3)
        timer.start();
},
    
walk: function()
    {
        //game.debug.spriteInfo(player, 10, 10);
        ally.alpha -= .05;
        allysp.alpha -= .05;
        if(player.y > 200 )
        {
            player.animations.play('up');
            player.y -= 5;
        }
        else if (player.x < 500)
        {
            player.animations.play('right');
            player.x += 5;
        }
        else
        {
            player.animations.stop();
            done2 = true;
        }
    }
}

var BeatAngel = function(game) {};
BeatAngel.prototype = {
create: function() {
    if(musicOn)
    {
        battlebgm.play('', 0, .5, true);
    }
    game.stage.backgroundColor = '#000';
    housebg = game.add.sprite(0, 0, 'housebg');
    knife = game.add.audio('knife');
    textbar = game.add.sprite(0, 390, 'textbar');
    textbar.scale.setTo(1.5, 1.5);
    txt = game.add.text(10, 425, '', { font: '20px Courier New', fill: '#FFF'});
    progtextObj = game.add.text(750, 530, '>>', { font: '15px Courier New', fill: '#FFF' });
    pc = game.add.sprite(640, 108, 'PC')
    pc.scale.setTo(.3, .3); pc.alpha = 0;
    girl = game.add.sprite(542, 140, 'girl');
    player = game.add.sprite(425, 250, 'plyrrpr', 4); player.scale.setTo(1.75, 1.75);
    player.animations.add('up', [10, 9, 10, 11], 10, true); //up walking animation
    player.animations.add('right', [7, 6, 7, 8], 10, true); //right walking animation
    angelsp = game.add.sprite(325, 245, 'angelsp', 4);
    msgs = [
            /*0*/"You may have won this time...",
            /*1*/"But we'll never forget this.",
            /*2*/"And you shouldn't either.",
            /*3*/"Say goodnight, little one."]
    i = 1;
    txt.text = msgs[0];
    fadebg = game.add.sprite(0,0,'fadebg'); fadebg.alpha = 0;
    timer = game.time.create(); //timer for reset of text and stuff
    timer.loop(25, fadeBgs, this, false, fadebg, 'Credits');
    timer2 = game.time.create(); //timer for reset of text and stuff
    timer2.loop(25, this.walk, this);
    done1 = false; //when the ally is done talking
    done2 = false; //when the player is done moving
    done3 = false; //when last line has been read
    fade = game.add.sprite(0,0, 'fadebg'); fade.scale.setTo(5, 5);
    timer3 = game.time.create(); //timer for reset of text and stuff
    timer3.loop(10, fadeBg, this, true, fade);
    timer3.start();
},
    
update: function() {
    if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR))
    {
        if(i == 3 && !done3 && !done2)
        {
            done1 = true;
            txt.text = '';
        }
        else if(i < msgs.length && i != 3)
        {
            txt.text = msgs[i]
            i++;
        }
        else if(done2)
        {
            if(soundOn)
                knife.play('', 0, .5, false);
            done3 = true;
        }
    }
    if(done1)
        timer2.start();
    if(done2)
    {
        pc.alpha = 1;
        txt.text = msgs[3];
    }
    if(done3)
        timer.start();
},
walk: function()
    {
        //game.debug.spriteInfo(player, 10, 10);
        //ally.alpha -= .05;
        angelsp.alpha -= .05;
        if(player.y > 200 )
        {
            player.animations.play('up');
            player.y -= 5;
        }
        else if (player.x < 500)
        {
            player.animations.play('right');
            player.x += 5;
        }
        else
        {
            player.animations.stop();
            done2 = true;
        }
    }
}

var GameOver = function(game) {};
GameOver.prototype = {
init: function(fightAlly)
    {
        allyFight = fightAlly;
    },
preload: function()
    {
        game.load.image('gotxt', 'assets/img/gameover.png');
        game.load.image('tryagain', 'assets/img/tryagain.png');
    },
create: function() {
    game.stage.backgroundColor = '#000';
    gotxt = game.add.sprite(225, 50, 'gotxt');
    tryagain = game.add.sprite(300, 450, 'tryagain');
    tryagain.inputEnabled = true;
    game.add.text(50, 220, 'Though your efforts were valiant,\n    you sadly suffered defeat\n    at the hands of your foe.', {font: '35px Courier New', fill:'#FFF', boundsAlignH:'center'});
    fade = game.add.sprite(0, 0, 'fadebg');
    timer = game.time.create(); //timer for reset of text and stuff
    timer.loop(25, this.fadeOut, this);
    timer.start();
},
update: function() {
    tryagain.events.onInputDown.add(this.startOver, this);
    tryagain.events.onInputOver.add(this.hover, this);
    tryagain.events.onInputOut.add(this.unhover, this);
    },
    
fadeOut: function() {
    if(fade.alpha > 0)
        fade.alpha -= .01;
},

hover: function() {
    tryagain.scale.setTo(1.2, 1.2);
    tryagain.x -= 10;
    tryagain.y -= 5;
},
    
unhover: function() {
    tryagain.scale.setTo(1, 1,);
    tryagain.x += 10;
    tryagain.y += 5;
},
startOver: function() {
    game.state.start('Battle', true, false, allyFight);
}
    
}

function fadeBgs(fadeIn, bg, stage)
{
    if(fadeIn && bg.alpha > 0)
    {
        bg.alpha -= .01
    }
    else if(bg.alpha < 1)
    {
        bg.alpha += .01;
        if(bg.alpha >= 1)
        {
            if(musicOn)
            {
                battlebgm.stop();
                menubgm.play('', 0, .5, true);
                musicPlaying = true;
            }
            game.state.start(stage);
        }
    }
}
function fadeBg(fadeIn, bg)
{
    if(fadeIn && bg.alpha > 0)
    {
        bg.alpha -= .01
    }
    else if(bg.alpha < 1)
    {
        bg.alpha += .01;
    }
}

                               

//Adds game states
game.state.add('MainMenu', MainMenu); //adds intro state
game.state.add('Settings', Settings); //adds settings state
game.state.add('Credits', Credits); //adds credits state
game.state.add('Intro', Intro); // adds play state
game.state.add('Day', Day); //adds main menu state
game.state.add('BattleIntro', BattleIntro); // adds battle intro state
game.state.add('EnterHouse', EnterHouse); //adds stage for entering house
game.state.add('Battle', Battle); // adds battle state
game.state.add('BeatAlly', BeatAlly); //adds state for when you beat the Ally
game.state.add('BeatAngel', BeatAngel); //adds state for when you beat angels
game.state.add('GameOver', GameOver); //Adds state for when you lose in battle
game.state.start('MainMenu'); // starts the game at the main menu
