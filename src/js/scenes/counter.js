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
    //Start Counter sound
    const counterSound = this.sound.add('counter').setVolume(0.5);
    counterSound.play();

    //Create a counter text
    let counterTime = 3;
    const counter = this.add.text(
      this.cameras.main.width / 2 - 90,
      this.cameras.main.height / 2 - 100,
      counterTime,
      { font: '200px Arial', fill: '#FFFFFF' }
    );
    this.time.addEvent({
      delay: 1000,
      callback: () => {
        counterTime -= 1;
        counter.setText(counterTime);
        if (counterTime == 0)
          this.scene.start('Judgment', {
            difficulty: this.difficulty,
            timer: this.timer,
            life: this.life,
          });
      },
      callbackScope: this,
      loop: true,
    });

    //Reset logs
    const div = document.getElementById('logs');
    div.dispatchEvent(new CustomEvent('reset'));
  }
}
export default Counter;
