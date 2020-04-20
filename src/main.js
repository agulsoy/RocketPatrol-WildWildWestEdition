/*Game influenced by Nathan Altice
Point Breakdown:
    Implement 'FIRE' UI text from the original game (10)
    Add your own (copyright-free) background music to the Play scene (10)
    Create a new scrolling tile sprite for the background (10)
    Create a new title screen (15)
    Create new artwork for all of the in-game assets (rocket, spaceships, explosion) (25)
    Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (50)
*/

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

game.scene.add('playScene', playScene);

//reserve some keyboard variables
let keyF, keyLEFT, keyRIGHT;

//define game settings
game.settings = {
    spaceshipSpeed: 3,
    gameTimer: 60000
}