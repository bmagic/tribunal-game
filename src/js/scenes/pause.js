import emissions from '../../assets/desktops/emissions.json';

class Pause extends Phaser.Scene {
  constructor() {
    super({ key: 'Pause' });
  }

  create() {
    this.add
      .text(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2 - 100,
        'Pause',
        {
          font: '100px Arial',
          fill: '#FFFFFF',
        }
      )
      .setOrigin(0.5);

    if (globalThis.lastDesktop != undefined) {
      const emission =
        emissions[
          `s${globalThis.lastDesktop.saison}e${globalThis.lastDesktop.emission}`
        ];
      const text = `${
        globalThis.lastDesktop.success ? 'Correct,' : 'Faux,'
      } le dernier bureau ${
        globalThis.lastDesktop.jugement == 'relaxe'
          ? 'a été relaxé'
          : "n'a pas été relaxé"
      } (Saison ${globalThis.lastDesktop.saison} Episode ${
        globalThis.lastDesktop.emission
      } Bureau ${globalThis.lastDesktop.id})`;
      const url = `${emission.url}&t=${globalThis.lastDesktop.time}s`;

      const linkContainer = this.add.container(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2
      );
      const link = this.add
        .text(0, 0, [text, 'Clique ici pour voir le jugement sur youtube'], {
          font: '30px Arial',
          fill: globalThis.lastDesktop.success ? '#00FF00' : '#FF0000',
          align: 'center',
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true });

      const youtube = this.add
        .image(0, 90, 'youtube')
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true });

      youtube.on('pointerup', () => this.openExternalLink(url), this);
      youtube.on('pointerover', () => youtube.setScale(1.1));
      youtube.on('pointerout', () => youtube.setScale(1));
      link.on('pointerup', () => this.openExternalLink(url), this);
      link.on('pointerover', () =>
        link.setStyle({
          fill: globalThis.lastDesktop.success ? '#00FFFF' : '#FFFF00',
        })
      );
      link.on('pointerout', () =>
        link.setStyle({
          fill: globalThis.lastDesktop.success ? '#00FF00' : '#FF0000',
        })
      );

      linkContainer.add([link, youtube]);
    }

    //Resume Judgment
    this.input.keyboard.on('keyup-P', () => {
      this.scene.resume('Judgment');
      this.scene.stop('Pause');
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

  openExternalLink(url) {
    const s = window.open(url, '_blank');

    if (s && s.focus) {
      s.focus();
    } else if (!s) {
      window.location.href = url;
    }
  }
}
export default Pause;
