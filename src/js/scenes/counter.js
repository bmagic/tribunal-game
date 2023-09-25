class Counter extends Phaser.Scene {
  constructor() {
    super({ key: 'Counter' });
  }

  init(data) {
    this.difficulty = data.difficulty;
    this.timer = data.timer;
    this.life = data.life;
  }

  create() {
    //Start Counter
    const counter = this.add
      .text(
        this.cameras.main.width / 2 - 90,
        this.cameras.main.height / 2 - 100,
        3,
        { font: '200px Arial', fill: '#FFFFFF' }
      )
      .setAlpha(0);
    const timeline = this.add.timeline([
      {
        at: 200,
        run: () => {
          counter.setAlpha(1);
        },
        sound: '3',
      },
      {
        at: 1200,
        run: () => {
          counter.setText(2);
        },
        sound: '2',
      },
      {
        at: 2200,
        run: () => {
          counter.setText(1);
        },
        sound: '1',
      },
      {
        at: 3200,
        run: () => {
          this.scene.start('Judgment', {
            difficulty: this.difficulty,
            timer: this.timer,
            life: this.life,
          });
        },
        sound: 'fight',
      },
    ]);
    timeline.play();
  }
}
export default Counter;
