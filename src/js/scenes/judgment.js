class Judgement extends Phaser.Scene {
  constructor() {
    super({ key: 'Judgment' });
  }

  create() {
    this.score = 0;
    this.bonus = 0;
    this.currentDestkopIndex = 0;

    //Load desktop from cache
    this.shuffledDesktops = this.cache.json.get('desktops');
    //this.shuffledDesktops = this.shuffledDesktops.slice(0, 50);
    this.shuffledDesktops = this.shuffledDesktops.sort(
      (a, b) => 0.5 - Math.random()
    );

    //Add cartouche top right
    this.scoreText = this.add.text(20, 20, generateScoreText(this.score));
    this.bonusText = this.add.text(20, 55, generateBonusText(this.bonus));
    this.cartouche = this.add
      .image(0, 0, 'cartouche')
      .setOrigin(0)
      .setScale(1.2);
    this.add
      .container(32, 32)
      .setDepth(999)
      .add([this.cartouche, this.scoreText, this.bonusText]);

    //Add desktop reference bottom left
    this.ref = this.add
      .text(
        20,
        700,
        generateDesktopRefText(this.shuffledDesktops, this.currentDestkopIndex)
      )
      .setDepth(999);

    //Load buttons with fx
    this.leftButton = this.add
      .image(520, 620, 'left')
      .setOrigin(0)
      .setDepth(999)
      .setScale(0.8);
    this.rightButton = this.add
      .image(660, 620, 'right')
      .setOrigin(0)
      .setDepth(999)
      .setScale(0.8);
    this.fxLeftButton = this.leftButton.preFX.addColorMatrix();
    this.fxRightButton = this.rightButton.preFX.addColorMatrix();
    this.leftButton.postFX.addShine(1, 0.2, 5);
    this.rightButton.postFX.addShine(1, 0.2, 5);

    //Load Desktop Image
    this.currentDestkopImage = this.add
      .image(
        0,
        0,
        generateDesktopId(this.shuffledDesktops, this.currentDestkopIndex)
      )
      .setOrigin(0)
      .setScale(0.67);

    // Left button pressed
    this.input.keyboard.on('keydown-LEFT', () => {
      this.fxLeftButton.brightness(2);
    });
    this.input.keyboard.on('keyup-LEFT', () => {
      this.resolveJudgment('coupable');
    });

    // Right button pressed
    this.input.keyboard.on('keydown-RIGHT', () => {
      this.fxRightButton.brightness(2);
    });
    this.input.keyboard.on('keyup-RIGHT', () => {
      this.resolveJudgment('relaxe');
    });

    // Escape button pressed
    this.input.keyboard.on('keydown-ESC', () => {
      globalThis.theme.stop();
      this.scene.start('Menu');
    });
  }

  startComboEvent() {
    this.sound.add('law').play();
    this.time.addEvent({
      delay: 100,
      callback: () => {
        this.combo = this.add
          .image(300, -10, 'combo')
          .setOrigin(0)
          .setDepth(999)
          .setScale(0.9);
        const barrel = this.combo.preFX.addBarrel(1);
        this.add.tween({
          duration: 500,
          targets: barrel,
          ease: Phaser.Math.Easing.Expo.out,
          amount: 1.1,
          yoyo: true,
          repeat: -1,
        });
      },
      callbackScope: this,
      loop: false,
    });
    this.time.addEvent({
      delay: 2500,
      callback: () => {
        this.combo.destroy();
      },
      callbackScope: this,
      loop: false,
    });
  }
  resolveJudgment(judgment) {
    if (this.shuffledDesktops[this.currentDestkopIndex].jugement == judgment) {
      //Play correct sound
      this.sound.add('correct').play();

      //Increase score
      this.score += 1 + this.bonus;

      //Start Combo event
      if (this.bonus == 4) {
        this.startComboEvent();
      }

      //Increase bonus
      this.bonus = this.bonus >= 5 ? 5 : this.bonus + 1;
    } else {
      //Calculate score based on difficulty
      switch (globalThis.difficulty) {
        case 0:
          this.score = this.score > 5 ? this.score - 5 : 0;
        case 1:
          this.score = this.score > 10 ? this.score - 10 : 0;
          break;
        default:
          this.score = 0;
      }

      //Shake the camera
      this.cameras.main.shake(400);

      //Play wrong sound
      this.sound.add('wrong').play();

      //Reset bonus
      this.bonus = 0;
    }

    //Go to next desktop update elements
    this.currentDestkopIndex =
      (this.currentDestkopIndex + 1) % this.shuffledDesktops.length;
    this.currentDestkopImage.setTexture(
      generateDesktopId(this.shuffledDesktops, this.currentDestkopIndex)
    );
    this.scoreText.setText(generateScoreText(this.score));
    this.bonusText.setText(generateBonusText(this.bonus));
    this.ref.setText(
      generateDesktopRefText(this.shuffledDesktops, this.currentDestkopIndex)
    );

    //Reset fx on left button
    this.fxLeftButton.reset();
    this.fxRightButton.reset();

    //Exit scene on max score
    if (this.score >= 99) {
      globalThis.theme.stop();
      this.scene.start('End');
    }
  }
}
export default Judgement;

const generateScoreText = (level) => `Bureaulogue lvl ${level}/99`;
const generateBonusText = (bonus) => `Combo ${bonus}/5`;
const generateDesktopRefText = (shuffledDesktops, currentDestkopIndex) =>
  `s${shuffledDesktops[currentDestkopIndex].saison}/e${shuffledDesktops[currentDestkopIndex].emission}/b${shuffledDesktops[currentDestkopIndex].id}`;
const generateDesktopId = (shuffledDesktops, currentDestkopIndex) =>
  `s${shuffledDesktops[currentDestkopIndex].saison}-${shuffledDesktops[currentDestkopIndex].emission}-${shuffledDesktops[currentDestkopIndex].id}`;
// this.time.addEvent({
//     delay: 1000, callback: () => {
//         initialTime -= 1; // One second
//         timeText.setText(`Temps restant: ${initialTime}s`);
//         if (initialTime == 0) {
//             this.scene.start('Score', { score: score });
//             theme.stop()
//         }
//     }, callbackScope: this, loop: true
// });
