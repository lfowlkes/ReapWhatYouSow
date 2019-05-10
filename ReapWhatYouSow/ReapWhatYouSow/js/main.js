var game = new Phaser.Game(600, 400, Phaser.AUTO, 'phaser');

/*var Intro = function(game) {}; // Intro animation state
Intro.prototype = {
    preload: function() {
    },
    
    create: function() {
       
    },
    
    update: function() {
        if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
        {
            game.state.start('Menu'); //moves to menu phase when player presses space
            this.title.stop();
        }
    }
}*/

var Menu = function(game) {};
Menu.prototype = {
    
    preload: function() {
        game.load.image('office', 'assets/img/tempoffice.png');
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
        game.add.sprite(0,0, 'office'); //adds office background
        
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
        game.stage.backgroundColor = '#6dab69'; // sets background color
        /* Plugin source: https://github.com/azerion/phaser-input*/
        this.input = game.add.plugin(PhaserInput.Plugin)
        pc = game.add.sprite(10, 140, 'PC');
        boss = game.add.sprite(450, 125, 'boss');
        boss.scale.x = .6;
        boss.scale.y = .6;
        pc.alpha = 0;
        
    },
    
    update: function() {
        
        //if user pressed space to progress the dialogue OR if user presseed enter on text box
        if((game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) || game.input.keyboard.justPressed(Phaser.Keyboard.ENTER)) && !this.inputCreated)
        {
            this.index++;
            this.i = 0;
            this.counter = 0;
            console.log('index: ' + this.index);
            if(this.index == 4) //checks if we're on a line that needs the PC sprite on screen
            {
                console.log("Wooo");
                pc.alpha = 1;
                boss.alpha = 0;
            }
            else // we're on a line that needs boss' sprite on screen
            {
                console.log("Here");
                pc.alpha = 0;
                boss.alpha = 1;
            }
        }
        
        if(this.counter % 2 == 0) //displays each letter every 2 frames
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
        }
        if(this.i <= this.msgs[this.index].length)
        {
            this.counter++; //counter, updates every frame
        }
        
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
           console.log("New index: " + this.index);
           this.msgs[4] = "My name is " + this.name + ".";
           this.msgs[5] = "Oh! Ms. " + this.name + ", of course!"; //updates the script with next name
           //console.log("Name: " + this.name)
            console.log("Wooo");
            pc.alpha = 1;
            boss.alpha = 0;
           }
            

    },
    // Moderately unnecessary function for typewriter text display, but it looks nice to have things as their own function so I made this.
    typewriter: function(msg, textObj, i) {
        //console.log(msg);
        textObj.text = msg.substr(0, i);
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
//game.state.add('Intro', Intro); //adds main menu state
game.state.add('Intro', Intro); // adds play state
game.state.add('Battle', Battle); // adds battle state
game.state.start('Menu'); // starts the game at the main menu
