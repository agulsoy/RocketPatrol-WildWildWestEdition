//import TitleScene from './scenes/TitleScene';
let titleScene = new TitleScene();
let menuScene = new Menu();
let playScene = new Play();

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    backgroundColor: '#000080',
    scene: [TitleScene, Menu, Play ],
};

let game = new Phaser.Game(config);
game.scene.add('TitleScene', titleScene);
game.scene.start('menuScene');

game.scene.add('menuScene', menuScene);
//game.scene.start('menuScene');

game.scene.add('playScene', playScene);
//game.scene.start('playScene');

//reserve some keyboard variables
let keyF, keyLEFT, keyRIGHT;

//define game settings
game.settings = {
    spaceshipSpeed: 3,
    gameTimer: 60000
}
//Influenced by Nathan Altice