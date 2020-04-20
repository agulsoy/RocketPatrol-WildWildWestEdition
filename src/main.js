/*Game influenced by Nathan Altice
Point Breakdown:
    Implement 'FIRE' UI text from the original game (10)
    Add your own (copyright-free) background music to the Play scene (10)
    Create a new scrolling tile sprite for the background (10)
    Create a new title screen (15)
    Create new artwork for all of the in-game assets (rocket, spaceships, explosion) (25)
    Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (50)

    Sources:
        Missile SFX - http://soundbible.com/1794-Missle-Launch.html
        Building Constructors - https://www.phaser.io/docs/2.6.2/Phaser.Sprite.html
        Making Title Scene - https://video.search.yahoo.com/search/video?fr=mcafee&p=how+to+make+cutscene+in+phaser+3#id=2&vid=c14653553068bcc02d9c4662315eac43&action=view
        Scene Transition - https://www.youtube.com/watch?v=S1VSKkL_ePM&t=550s
        Scene Transition Examples - http://phaser.io/examples/v3/view/physics/matterjs/scene-transition
        Color Schemes - https://www.rapidtables.com/web/color/index.html
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