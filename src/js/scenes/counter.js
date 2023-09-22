class Counter extends Phaser.Scene {
  constructor() {
    super({ key: 'Counter' });
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
        if (counterTime == 0) this.scene.start('Judgment');
      },
      callbackScope: this,
      loop: true,
    });
  }
}
export default Counter;
