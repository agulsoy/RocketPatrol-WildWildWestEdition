class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }
    preload(){
        //load images /title sprite
        this.load.image('Missile', './assets/missile.png');
        this.load.image('Horsecarriage', './assets/horsecarriage.png');
        this.load.image('westernBack', './assets/westernBack.png');
        this.load.image('Bullet', './assets/Bullet.png');
        this.load.spritesheet('Explosion', './assets/Explosion.png', {frameWidth: 150, frameHeight: 75, startFrame: 0, endFrame: 10});
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
        //this.add.rectangle(37, 20, 566, 64, 0x00FF00).setOrigin(0.0);

        //add bullet (p1)
        this.p1Missile = new Missile(this, game.config.width/2 - 8, 450, 'Missile').setScale(0.5, 0.5).setOrigin(0.5, 0.5);

        //add horsemen (x3)
        this.carriage01 = new Horsecarriage(this, game.config.width +192, 200, 'Horsecarriage', 0, 30).setOrigin(0, 0); 
        this.carriage02 = new Horsecarriage(this, game.config.width + 96, 250, 'Horsecarriage', 0, 20).setOrigin(0, 0); 
        this.carriage03 = new Horsecarriage(this, game.config.width, 305, 'Horsecarriage', 0, 10).setOrigin(0, 0); 

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
            fontFamily: 'Algerian',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#000000',
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
            fontFamily: 'Algerian',
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
        scoreConfig.fontSize = '30px';
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
            this.p1Missile.update(); //update bullet
            this.carriage01.update();   //update horsemen(x3)
            this.carriage02.update();
            this.carriage03.update();
        }

        //check collisions
        if(this.checkCollision(this.p1Missile, this.carriage03)){
            this.p1Missile.reset();
            this.carriageExplode(this.carriage03);
        }
        if(this.checkCollision(this.p1Missile, this.carriage02)){
            this.p1Missile.reset();
            this.carriageExplode(this.carriage02);
        }
        if(this.checkCollision(this.p1Missile, this.carriage01)){
            this.p1Missile.reset();
            this.carriageExplode(this.carriage01);
        }
    }
    
    checkCollision(missile, horsecarriage){
    //simple AABB checking
        if(missile.x < horsecarriage.x + horsecarriage.width &&
            missile.x + missile.width > horsecarriage.x &&
            missile.y < horsecarriage.y + horsecarriage.height &&
            missile.height + missile.y > horsecarriage.y) {
                return true;
        } else{
            return false;
        }
    }

    carriageExplode(horsecarriage){
        horsecarriage.alpha = 0; //temporarily hide horsecarriage
        //create explosion sprite at horsecarriage's position
        let boom = this.add.sprite(horsecarriage.x, horsecarriage.y, 'Explosion').setOrigin(0, 0);
        boom.anims.play('explode'); //play explode animation
        boom.on('animationcomplete', () => {    //callback after animation complete
            horsecarriage.reset();   //reset horsecarriage position
            horsecarriage.alpha = 1; //make horsecarriage visible again
            boom.destroy(); //remove explosion sprite
        });
        //score increment and repaint
        this.p1Score += horsecarriage.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_Explosion');
    }
}