class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    preload(){
        //load cowboy
        this.load.image('Cowboy', './assets/cowboy2.png');
        //load audio
        this.load.audio('sfx_select', './assets/Blip_Select.wav');
        this.load.audio('sfx_Explosion', './assets/Explosion.mp3');
        this.load.audio('sfx_MissileLaunch', './assets/Missile_Launch.mp3');
        this.load.audio('backgroundMusic', './assets/BackgroundMusic.mp3');
    }

    create(){
        this.add.sprite(30, 30, 'Cowboy').setOrigin(0, 0);

        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '27px',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top:5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //Display Menu text
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;

        this.add.text(centerX+100, centerY- textSpacer -100, 'ROCKET PATROL: \nWILD WEST EDITION', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#996515',
        menuConfig.color = '#FFF';
        this.add.text(centerX+100, centerY-50, 'Use <- -> arrows to move \n& (F) to Fire', menuConfig).setOrigin(0.5);
        this.add.text(centerX+100, centerY + textSpacer, 'Press <- for Easy \nor -> for Hard', menuConfig).setOrigin(0.5);
        //Change scenes

        //define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT); 
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)){
            //Easy Mode
            game.setings = {
                spaceshipSpeed: 3,
                gameTimer: 60000,
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            //Hard Mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000,
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");
        }
    }
}