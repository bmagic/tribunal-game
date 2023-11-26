class End extends Phaser.Scene {
  constructor() {
    super({ key: 'End' });
  }

  init(data) {
    this.win = data.win || false;
    this.bureaulogue = data.bureaulogue || false;
  }
  create() {
    let music;
    const info = this.add.text(70, 150, [], {
      font: '35px Arial',
      fill: '#E82219',
      wordWrap: { width: 900 },
    });

    const pressEnter = this.add
      .text(
        this.cameras.main.width / 2,
        1000,
        'Appuie sur Entrer pour revenir au menu',
        {
          font: '35px Arial',
          fill: '#E82219',
        }
      )
      .setOrigin(0.5);
    if (this.win) {
      music = this.sound.add('music').setLoop(true);
      if (this.bureaulogue) {
        info.setY(80);
        info.setText([
          'Victoire !',
          '',
          'Vous avez atteint le niveau Bureaulogue 99 : la JUSTICE a triomphé.',
          '',
          'Montargis-City-One est en liesse : dans tous les quartiers de la ville, les habitants brûlent leurs bureaux immondes dans de grands feux de joie, en scandant votre nom.',
          'Les brasiers éclairent leurs visages baignés de larmes. Pour la première fois depuis des siècles, la flamme vacillante de la bureaulogie renaît...',
          '',
          'Fort de votre nouvelle popularité, vous confrontez Mr. Droux. Ses plans sont dévoilés et celui-ci doit prendre la fuite face à la colère des montargois.',
          '',
          "La porte de la cellule de JUDGE ackboo s'ouvre, il interrompt ses tractions - torse nu, luisant de sueur, beau comme un dieu, il se retourne, vous regarde et vous fait un pouçou.",
          '',
          'Vous avez gagné son estime !',
        ]);

        const config = {
          key: 'winendbAnimation',
          frames: this.anims.generateFrameNumbers('winendb', {
            start: 0,
            end: 18,
            first: 0,
          }),
          frameRate: 5,
          repeat: -1,
        };

        this.anims.create(config);

        this.add
          .sprite(1400, 500, 'winendb')
          .play('winendbAnimation')
          .setOrigin(0.5);
      } else {
        info.setText([
          'Victoire !',
          '',
          'Vous avez atteint le niveau 99 : la JUSTICE a triomphé.',
          '',
          'Montargis-City-One est en liesse : dans tous les quartiers de la ville, les habitants brûlent leurs bureaux immondes dans de grands feux de joie, en scandant votre nom.',
          'Les brasiers éclairent leurs visages baignés de larmes. Pour la première fois depuis des siècles, la flamme vacillante de la bureaulogie renaît...',
          '',
          'Fort de votre nouvelle popularité, vous confrontez Mr. Droux, ses plans sont dévoilés et celui-ci doit prendre la fuite face à la colère des montargois.',
          '',
          'Magnanime, le JUDGE ackboo, sauve Mr. Droux de la populace des fils de chien toxiques, et le condamne à 2500 ans de gnouf pendant lesquels il pourra se réhabiliter.',
        ]);

        const config = {
          key: 'winendAnimation',
          frames: this.anims.generateFrameNumbers('winend', {
            start: 0,
            end: 18,
            first: 0,
          }),
          frameRate: 5,
          repeat: -1,
        };

        this.anims.create(config);

        this.add
          .sprite(1400, 500, 'winend')
          .play('winendAnimation')
          .setOrigin(0.5);
      }
      this.add
        .timeline([
          {
            at: 200,
            sound: 'win',
          },
          {
            at: 1300,
            run: () => {
              music.play();
            },
          },
        ])
        .play();
    } else {
      info.setY(300);
      music = this.sound.add('sad').setLoop(true).setVolume(0.2);
      info.setText([
        'La brigade bureaulogique ne tolère pas la médiocrité.',
        '',
        'Déshonoré, humilié, JUDGE ackboo restera à vie dans les geôles humides et froides de Montargis-City-One, tandis que le rire démoniaque de Mr. Droux le pousse lentement vers la folie.',
        '',
        'Il se remémore chaque bureau, chaque clavier, chaque tapis de souris, chaque papier peint, chaque figurine…',
        '',
        'Les bureaux passent sans fin devant ses yeux vides.',
      ]);
      this.add
        .timeline([
          {
            at: 400,
            sound: 'loose',
          },
          {
            at: 1500,
            sound: 'laugh',
          },
          {
            at: 3600,
            run: () => {
              music.play();
            },
          },
        ])
        .play();

      const config = {
        key: 'looseendAnimation',
        frames: this.anims.generateFrameNumbers('looseend', {
          start: 0,
          end: 46,
          first: 0,
        }),
        frameRate: 12,
        repeat: 0,
      };

      this.anims.create(config);

      this.add
        .sprite(1400, 500, 'looseend')
        .play('looseendAnimation')
        .setOrigin(0.5);

      pressEnter.setText('Appuie sur Entrer pour retenter ta chance');
    }

    this.input.keyboard.on('keyup-ENTER', () => {
      music.stop();
      this.scene.start('Menu');
    });

    // Fullscreen
    this.input.keyboard.on('keyup-F', () => {
      this.scale.toggleFullscreen();
    });
  }
}
export default End;
