class Menu extends Phaser.Scene {
  constructor() {
    super({ key: 'Menu' });
  }

  create() {
    //Set default difficulty
    let difficulty = 1;

    //Start theme music
    globalThis.theme.play();

    //Display the image on left part
    this.add.image(0, 0, 'affiche').setOrigin(0).setScale(0.6);

    //Display content on right part
    const content = [
      'En 2139, MONTARGIS-CITY ONE a été ravagée par de terribles bureaux. 100 millions de citoyens végètent dans les LEDs et la crasse.',
      '',
      'Pour lutter contre la criminalité galopante, des milices bureaulogiques ont été créées, les JUDGES - capables de juger et de gnouffer instantanément.',
      '',
      "Fort de son level 99 et de son LG G20 120 pouces, JUDGE ACKBOO est le plus redouté d'entre eux.",
      '',
      "Mais le Système se retourne contre Lui quand il est accusé à tort,d'un crime bureaulogique: des montres sur son bureau.",
      '',
      "Le responsable de cette machination n'est autre que l'infâme DR DROUX, qui lui a volé son amour d'enfance.",
      '',
      'Une rivalité sans pitié les oppose et menace MONTARGIS-CITY ONE.',
      '',
      '',
      'Pour sauver JUDGE ACKBOO et gnouffer DR DROUX, ta mission est simple: atteins toi aussi le niveau 99 en jugeant les bureaux de MONTARGIS-CITY ONE.',
    ];
    this.add.text(570, 40, content, {
      font: '22px Arial',
      fill: '#E82219',
      wordWrap: { width: 690 },
    });

    //Add Menu
    const facile = this.add
      .image(550, 590, 'facile')
      .setOrigin(0)
      .setScale(0.4);
    const moyen = this.add.image(730, 590, 'moyen').setOrigin(0).setScale(0.4);
    const bureaulogue = this.add
      .image(915, 582, 'bureaulogue')
      .setOrigin(0)
      .setScale(0.45);
    let button = [facile, moyen, bureaulogue];
    let glow = button[difficulty].preFX.addGlow(0xe82219, 2);

    this.input.keyboard.on('keydown-LEFT', (event) => {
      glow.destroy();
      difficulty = difficulty == 0 ? 2 : difficulty - 1;
      glow = button[difficulty].preFX.addGlow(0xe82219, 2);
      this.sound.add('button').play();
    });

    this.input.keyboard.on('keydown-RIGHT', (event) => {
      glow.destroy();
      difficulty = difficulty == 2 ? 0 : difficulty + 1;
      glow = button[difficulty].preFX.addGlow(0xe82219, 2);
      this.sound.add('button').play();
    });

    this.input.keyboard.on('keyup-ENTER', (event) => {
      // Define the timer with the difficulty
      let timer;
      let life;
      switch (difficulty) {
        case 0:
          timer = 20;
          life = 20;
          break;
        case 1:
          timer = 10;
          life = 10;
          break;
        default:
          timer = 5;
          life = 5;
      }
      this.scene.start('Counter', {
        difficulty: difficulty,
        timer: timer,
        life: life,
      });
    });

    // Mute key
    this.input.keyboard.on('keyup-M', () => {
      if (globalThis.theme.volume > 0) {
        globalThis.theme.setVolume(0);
      } else {
        globalThis.theme.setVolume(0.2);
      }
    });
  }
}
export default Menu;
