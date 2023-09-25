class Judgment extends Phaser.Scene {
  constructor() {
    super({ key: 'Judgment' });
  }

  init(data) {
    this.boss = data.boss || false;
    this.difficulty = data.difficulty;
    this.timer = data.timer || 10;
    this.life = data.life || 10;
  }

  create() {
    this.score = 0;
    this.bonus = 0;
    this.currentDestkopIndex = 0;
    globalThis.lastDesktop = undefined;

    //On boss scene play countdown
    if (this.boss) {
      this.countdownSound();
    }
    //Load desktop from cache
    this.shuffledDesktops = this.cache.json.get('desktops');
    //this.shuffledDesktops = this.shuffledDesktops.slice(0, 50);
    this.shuffledDesktops = this.shuffledDesktops
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);

    //Add cartouche top right
    this.scoreText = this.add.text(20, 15, generateScoreText(this.score));
    this.bonusText = this.add.text(20, 40, generateBonusText(this.bonus));
    this.lifeText = this.add.text(20, 65, generateLifeText(this.life));

    this.cartouche = this.add
      .image(0, 0, 'cartouche')
      .setOrigin(0)
      .setScale(1.2);
    this.add
      .container(32, 32)
      .setDepth(999)
      .add([this.cartouche, this.scoreText, this.bonusText, this.lifeText]);
    if (this.boss) {
      this.scoreText.setAlpha(0);
      this.bonusText.setAlpha(0);
      this.cartouche.setAlpha(0);
      this.lifeText.setAlpha(0);
    }

    //Add Time Text
    this.currentTime = this.timer;
    this.timeText = this.add
      .text(this.cameras.main.width - 100, 40, this.currentTime, {
        font: '80px Arial',
        fill: '#E82219',
      })
      .setDepth(999);

    //Launch timer
    this.countdown = this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.currentTime -= 1; // One second
        this.timeText.setText(this.currentTime);
        if (this.currentTime == 0) {
          this.currentTime = this.timer;
          this.resolveJudgment('perdu');
        }
      },
      callbackScope: this,
      loop: true,
    });

    //Add desktop reference bottom left
    this.ref = this.add
      .text(
        this.cameras.main.width - 120,
        20,
        generateDesktopRefText(
          this.shuffledDesktops,
          this.currentDestkopIndex,
          this.boss
        )
      )
      .setDepth(999);

    //Load buttons with fx
    this.leftButton = this.add
      .image(
        this.cameras.main.width / 2 - 100,
        this.cameras.main.height - 150,
        'left'
      )
      .setOrigin(0)
      .setDepth(999)
      .setScale(1);
    this.rightButton = this.add
      .image(
        this.cameras.main.width / 2 + 100,
        this.cameras.main.height - 150,
        'right'
      )
      .setOrigin(0)
      .setDepth(999)
      .setScale(1);
    this.fxLeftButton = this.leftButton.preFX.addColorMatrix();
    this.fxRightButton = this.rightButton.preFX.addColorMatrix();
    this.leftButton.postFX.addShine(1, 0.2, 5);
    this.rightButton.postFX.addShine(1, 0.2, 5);

    //Load Desktop Image
    this.currentDestkopImage = this.add
      .image(
        0,
        0,
        generateDesktopId(
          this.shuffledDesktops,
          this.currentDestkopIndex,
          this.boss
        )
      )
      .setOrigin(0)
      .setScale(1);

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

    // Mute key
    this.input.keyboard.on('keyup-M', () => {
      if (globalThis.theme.volume > 0) {
        globalThis.theme.setVolume(0);
      } else {
        globalThis.theme.setVolume(0.2);
      }
    });

    // Pause key
    this.input.keyboard.on('keyup-P', () => {
      if (!this.boss) {
        this.scene.pause();
        this.scene.launch('Pause');
      }
    });

    // Fullscreen
    this.input.keyboard.on('keyup-F', () => {
      this.scale.toggleFullscreen();
    });

    this.events.on('pause', () => this.currentDestkopImage.setAlpha(0));
    this.events.on('resume', () => this.currentDestkopImage.setAlpha(1));
  }

  startComboEvent() {
    this.sound.add('law').play();
    this.time.addEvent({
      delay: 100,
      callback: () => {
        this.combo = this.add
          .image(this.cameras.main.width / 2, 70, 'combo')
          .setOrigin(0.5)
          .setDepth(999);

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
    //Reset the timer
    this.currentTime = this.timer;
    this.timeText.setText(this.currentTime);
    this.countdown.timescale = this.timer;

    //On boss judgment we redirect to win scene
    if (this.boss) {
      this.countdownTimeline.stop();
      if (judgment == 'relaxe') {
        this.sound.add('correct').play();
        this.scene.start('End', { win: true });
      } else {
        this.sound.add('wrong').play();
        this.scene.start('End', { win: false });
      }
      return;
    }
    //Set the lastDestkop item
    globalThis.lastDesktop = this.shuffledDesktops[this.currentDestkopIndex];
    globalThis.lastDesktop.success =
      this.shuffledDesktops[this.currentDestkopIndex].jugement == judgment;

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
      switch (this.difficulty) {
        case 0:
          this.score = this.score > 5 ? this.score - 5 : 0;
          break;
        case 1:
          this.score = this.score > 10 ? this.score - 10 : 0;
          break;
        default:
          this.score = this.score > 20 ? this.score - 20 : 0;
      }

      //Shake the camera
      this.cameras.main.shake(400);

      //Play wrong sound
      this.sound.add('wrong').play();

      //Reset bonus
      this.bonus = 0;

      //Calculate life
      this.life--;
      this.lifeText.setText(generateLifeText(this.life));
      if (this.life == 0) {
        globalThis.theme.stop();
        this.scene.start('End', { win: false });
      }
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
      this.scene.start('BossIntro');
    }
  }
  countdownSound() {
    this.countdownTimeline = this.add
      .timeline([
        {
          at: 0,
          sound: '5',
        },
        {
          at: 1000,
          sound: '4',
        },
        {
          at: 2000,
          sound: '3',
        },
        {
          at: 3000,
          sound: '2',
        },
        {
          at: 4000,
          sound: '1',
        },
      ])
      .play();
  }
}

const generateScoreText = (level) => `Bureaulogue lvl ${level}/99`;
const generateBonusText = (bonus) => `Combo ${bonus}/5`;
const generateLifeText = (life) => `Vies restantes ${life}`;

const generateDesktopRefText = (
  shuffledDesktops,
  currentDestkopIndex,
  boss
) => {
  if (!boss)
    return `s${shuffledDesktops[currentDestkopIndex].saison}/e${shuffledDesktops[currentDestkopIndex].emission}/b${shuffledDesktops[currentDestkopIndex].id}`;
  else return `unpublish`;
};
const generateDesktopId = (shuffledDesktops, currentDestkopIndex, boss) => {
  if (!boss)
    return `s${shuffledDesktops[currentDestkopIndex].saison}-${shuffledDesktops[currentDestkopIndex].emission}-${shuffledDesktops[currentDestkopIndex].id}`;
  else return `ackboo`;
};

export default Judgment;
