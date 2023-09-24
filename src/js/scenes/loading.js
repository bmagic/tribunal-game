import { shuffledDesktops } from '../main';

class Loading extends Phaser.Scene {
  constructor() {
    super({ key: 'Loading', active: true });
  }

  preload() {
    //Display Image with Barrel effect during loading
    this.load.image('loading', 'assets/images/loading.jpg');
    this.load.on('filecomplete-image-loading', (key, type, data) => {
      this.text = this.add.text(-45, 120, 'Loading', { align: 'center' });
      const loading = this.add.image(0, 0, 'loading');
      loading.setScale(0.5);
      this.loadingContainer = this.add.container(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2
      );
      this.loadingContainer.add([this.text, loading]);
      const barrel = loading.preFX.addBarrel(1);
      this.add.tween({
        duration: 400,
        repeatDelay: 1000,
        targets: barrel,
        ease: Phaser.Math.Easing.Elastic.InOut,
        amount: 1.2,
        yoyo: true,
        repeat: -1,
      });
    });
    // Display Loading text with progress
    this.load.on('progress', (value) => {
      if (this.text != undefined)
        this.text.setText(`Loading ${Math.floor(value * 100)}%`);
    });

    //Load images
    this.load.image('affiche', 'assets/images/affiche.png');
    this.load.image('right', 'assets/images/right.png');
    this.load.image('left', 'assets/images/left.png');
    this.load.image('cartouche', 'assets/images/cartouche.png');
    this.load.image('facile', 'assets/images/facile.png');
    this.load.image('moyen', 'assets/images/moyen.png');
    this.load.image('bureaulogue', 'assets/images/bureaulogue.png');
    this.load.image('combo', 'assets/images/combo.png');
    this.load.image('ackboo', 'assets/images/ackboo.jpg');

    //Load musics
    this.load.audio('music', 'assets/sounds/bureaulogie.mp3');
    this.load.audio('counter', 'assets/sounds/counter.mp3');
    this.load.audio('theme', 'assets/sounds/theme.mp3');
    this.load.audio('correct', 'assets/sounds/correct.wav');
    this.load.audio('wrong', 'assets/sounds/wrong.mp3');
    this.load.audio('button', 'assets/sounds/button.wav');
    this.load.audio('law', 'assets/sounds/law.mp3');
    this.load.audio('challenger', 'assets/sounds/challenger.mp3');
    this.load.audio('countdown', 'assets/sounds/countdown.mp3');

    //Load desktops json and images
    this.load.json('desktops', 'assets/desktops/desktops.json');
    this.load.on('filecomplete-json-desktops', (key, type, data) => {
      //data = data.slice(0, 50);
      for (const idx in data) {
        const desktop = data[idx];
        this.load.image(
          `s${desktop.saison}-${desktop.emission}-${desktop.id}`,
          `assets/desktops/s${desktop.saison}/${desktop.emission}-${desktop.id}.jpg`
        );
      }
    });
  }

  create() {
    //Keep music playing without focus
    this.sound.pauseOnBlur = false;

    //Initialize theme sound
    globalThis.theme = this.sound.add('theme').setVolume(0.2).setLoop(true);

    //Destroy Loading container
    this.loadingContainer.destroy();

    //Display text for helping user
    this.add
      .text(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2 - 200,
        'Appuie sur une touche pour lancer le jeu',
        { font: '48px Arial', fill: '#FFFFFF' }
      )
      .setOrigin(0.5, 0.5);
    this.add
      .text(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2,
        ['🠔 Non Relaxé', '🠖 Relaxé', 'M Mute', 'P Pause'],
        {
          font: '30px Arial',
          fill: '#FFFFFF',
        }
      )
      .setOrigin(0.5, 0.5);
    this.input.keyboard.on('keyup', () => {
      this.scene.start('Menu');
    });
  }
}
export default Loading;
