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
    this.add.image(0, 0, 'affiche').setOrigin(0).setScale(0.9);

    //Display content on right part
    const content = [
      'En 2139, Montargis-City-One a été ravagée par une invasion d’horribles bureaux. 100 millions de citoyens végètent dans les LEDs et la crasse.',
      '',
      'Pour lutter contre la criminalité galopante, la Brigade Bureaulogique est créée. Pour faire respecter les lois, et restaurer la dignité humaine, les JUDGES, bureaulogues d’élite, sont capables de juger et de gnouffer dans l’instant.',
      '',
      "Le plus respecté d'entre eux est JUDGE ackboo. Implaccable, incorruptible, mélomane, level 99: le GNOUF c'est lui.",
      '',
      "Mais le Système se retourne contre lui quand il est accusé à tort, d'un crime bureaulogique: des montres sur son bureau.",
      '',
      "Le responsable de cette machination n'est autre que son ami d'enfance Mr. Droux, qui lui a volé son premier amour.",
      '',
      'Une rivalité sans pitié les oppose et menace Montargis-City-One.',
      '',
      '',
      'Pour sortir JUDGE ackboo de sa cellule, ta mission est simple: atteins le niveau 99 en jugeant les bureaux de Montargis-City-One.',
    ];
    this.add.text(this.cameras.main.width / 2 - 100, 40, content, {
      font: '30px Arial',
      fill: '#E82219',
      wordWrap: { width: 1000 },
    });

    //Add Menu
    const facile = this.add
      .image(this.cameras.main.width / 2 - 100, 900, 'facile')
      .setOrigin(0)
      .setScale(0.5);
    const moyen = this.add
      .image(this.cameras.main.width / 2 + 180, 900, 'moyen')
      .setOrigin(0)
      .setScale(0.5);
    const bureaulogue = this.add
      .image(this.cameras.main.width / 2 + 450, 892, 'bureaulogue')
      .setOrigin(0)
      .setScale(0.55);
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

    // Fullscreen
    this.input.keyboard.on('keyup-F', () => {
      this.scale.toggleFullscreen();
    });
  }
}
export default Menu;
