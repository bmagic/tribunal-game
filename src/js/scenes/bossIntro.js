class BossIntro extends Phaser.Scene {
  constructor() {
    super({ key: 'BossIntro' });
  }

  create() {
    this.challenger = this.add
      .text(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2,
        ['New Challenger'],
        {
          font: '55px Arial',
          fill: '#FF0000',
        }
      )
      .setAlpha(0)
      .setOrigin(0.5);
    const timeline = this.add.timeline([
      {
        at: 0,
        sound: 'challenger',
      },
      {
        at: 1000,
        tween: {
          targets: this.challenger,
          duration: 1500,
          alpha: 1,
          ease: 'Bounce',
          scaleX: 2.9,
          scaleY: 2.9,
        },
      },
      {
        at: 4000,
        run: () => {
          //Launch judgment scene with boss
          this.scene.start('Judgment', { boss: true, timer: 5 });
        },
      },
    ]);
    timeline.play();
  }
}
export default BossIntro;
