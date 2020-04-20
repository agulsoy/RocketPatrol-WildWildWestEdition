class TitleScene extends Phaser.Scene{
    constructor(){
        super({key:'TitleScene'});
    }

    preload(){
        this.load.image('cowboyBack', './assets/cowboyBack.png');
    }

    create(){
        //adding title sprite
        let titleBack = this.add.sprite(game.config.width/2-240, game.config.height/2-230, 'cowboyBack').setScale(.75, .75)
        .setOrigin(0, 0);
        //adding text for title scene
        let titleConfig = {
            fontFamily: 'Algerian',
            fontSize: '30px',
            color: '#FFFFFF',
            align: 'center',
        }
        let titleText = this.add.text(game.config.width/2-130, game.config.height/2+70, 'Rocket Patrol \nWild West Edition', titleConfig).setOrigin(0, 0); 
        
        let subtitleConfig = {
            fontFamily: 'Times New Roman',
            fontSize: '21px',
            color: '#FFFF00',
            align: 'center',
        }
        let subtitleText = this.add.text(game.config.width/2-80, game.config.height/2+150, 'Made with Phaser 3', subtitleConfig).setOrigin(0, 0); 
        
        let transitionConfig = {
            fontFamily: 'Times New Roman',
            fontSize: '15px',
            color: '#FFFF00',
            align: 'center',
        }
        let TransitionText = this.add.text(game.config.width/2-125, game.config.height/2+190, 'Click anywhere on the screen to continue',
         transitionConfig).setOrigin(0, 0); 
        
       
        // this.input.once('pointerdown', ()=> this.scene.start('menuScene'))
        this.input.once('pointerdown', function (event){
            this.scene.transition({target: 'menuScene', duration: 100 })
        }, this);
    }

    

    update(){

    }
}