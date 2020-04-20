class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }
    preload(){
        //load images /title sprite
        this.load.image('Cowboy', './assets/cowboy.png');
        this.load.image('Horsemen', './assets/horseman1.png');
        this.load.image('westernBack', './assets/westernBack.png');
        this.load.image('Bullet', './assets/Bullet.png');
        this.load.spritesheet('Explosion', './assets/Explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 10});
    }

    create(){
        //place tile sprite
        this.westernBack = this.add.tileSprite(0, 0, 640, 480, 'westernBack').setOrigin(0, 0);
        //console.log(this);
        
        //add background music
         this.bgm = this.sound.add('backgroundMusic');

        //play music continuously
         this.bgm.play();

        //green UI background
        this.add.rectangle(37, 20, 566, 64, 0x00FF00).setOrigin(0.0);

        //add cowboy
        //this.Cowboy = this.add.sprite(game.config.width/2 -8, 445, 'Cowboy');

        //add bullet (p1)
        this.p1Cowboy = new Cowboy(this, game.config.width/2 - 8, 450, 'Cowboy').setScale(0.5, 0.5).setOrigin(0.5, 0.5);

        //add horsemen (x3)
        this.horseman01 = new Horsemen(this, game.config.width +192, 155, 'Horsemen', 0, 30).setOrigin(0, 0); 
        this.horseman02 = new Horsemen(this, game.config.width + 96, 235, 'Horsemen', 0, 20).setOrigin(0, 0); 
        this.horseman03 = new Horsemen(this, game.config.width, 305, 'Horsemen', 0, 10).setOrigin(0, 0); 

        //define keyboard keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT); 

        //animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('Explosion', {start: 0, end: 10, first: 0}),
            frameRate: 30
        });

        //score
        this.p1Score = 0;

        //score display
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top:5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(69, 34, this.p1Score, scoreConfig);

        //FIRE text
        let fireConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 220
        }
        this.fireText = this.add.text(350, 34, "FIRE COMPUTER", fireConfig).setOrigin(0, 0);

        //game over flag
        this.gameOver = false;

        //60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, '(F)ire to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update(){

        //check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)){
            this.scene.restart(this.p1Score);
        }
        //check key input for Menu Screen
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.scene.start("menuScene");
        }
        //scroll westernBack
        this.westernBack.tilePositionX -= 4;

        if(!this.gameOver){
            this.p1Cowboy.update(); //update bullet
            this.horseman01.update();   //update horsemen(x3)
            this.horseman02.update();
            this.horseman03.update();
        }

        //check collisions
        if(this.checkCollision(this.p1Cowboy, this.horseman03)){
            this.p1Cowboy.reset();
            this.horsemanExplode(this.horseman03);
        }
        if(this.checkCollision(this.p1Cowboy, this.horseman02)){
            this.p1Cowboy.reset();
            this.horsemanExplode(this.horseman02);
        }
        if(this.checkCollision(this.p1Cowboy, this.horseman01)){
            this.p1Cowboy.reset();
            this.horsemanExplode(this.horseman01);
        }
    }
    
    checkCollision(cowboy, horseman){
    //simple AABB checking
        if(cowboy.x < horseman.x + horseman.width &&
            cowboy.x + cowboy.width > horseman.x &&
            cowboy.y < horseman.y + horseman.height &&
            cowboy.height + cowboy.y > horseman.y) {
                return true;
        } else{
            return false;
        }
    }

    horsemanExplode(horseman){
        horseman.alpha = 0; //temporarily hide horseman
        //create explosion sprite at horseman's position
        let boom = this.add.sprite(horseman.x, horseman.y, 'Explosion').setOrigin(0, 0);
        boom.anims.play('explode'); //play explode animation
        boom.on('animationcomplete', () => {    //callback after animation complete
            horseman.reset();   //reset horseman position
            horseman.alpha = 1; //make horseman visible again
            boom.destroy(); //remove explosion sprite
        });
        //score increment and repaint
        this.p1Score += horseman.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_JustShot');
    }
}