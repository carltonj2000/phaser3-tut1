import phaser from "phaser";

import { CST } from "../CST";
import { updateArrayBindingPattern } from "typescript";

export class PlayScene extends phaser.Scene {
  constructor() {
    super({ key: CST.SCENES.PLAY });
  }
  preload() {
    this.anims.create({
      key: "left",
      frameRate: 10,
      frames: this.anims.generateFrameNumbers("anna", { start: 9, end: 17 })
    });
    this.anims.create({
      key: "down",
      frameRate: 10,
      frames: this.anims.generateFrameNumbers("anna", { start: 18, end: 26 })
    });
    this.anims.create({
      key: "up",
      frameRate: 10,
      frames: this.anims.generateFrameNumbers("anna", { start: 0, end: 8 })
    });
    this.anims.create({
      key: "right",
      frameRate: 10,
      frames: this.anims.generateFrameNumbers("anna", { start: 27, end: 35 })
    });
    this.anims.create({
      key: "blaze",
      duration: 50,
      frames: this.anims.generateFrameNames("daze", {
        prefix: "fire0",
        suffix: ".png",
        end: 55
      }),
      showOnStart: true,
      hideOnComplete: true
    });
    this.textures.addSpriteSheetFromAtlas("hooded", {
      frameHeight: 64,
      frameWidth: 64,
      atlas: "characters",
      frame: "hooded"
    });
  }
  create() {
    this.anna = this.physics.add.sprite(400, 400, "anna").setScale(2);
    this.hooded = this.physics.add
      .sprite(200, 200, "hooded")
      .setScale(2)
      .setImmovable();
    this.fireAttacks = this.physics.add.group();
    this.assassins = this.physics.add.group({ impovable: true });
    this.assassins.add(this.hooded);
    window.anna = this.anna;
    window.hooded = this.hooded;

    this.anna.setSize(40, 50).setOffset(10, 10); // smalller hit box
    this.anna.setCollideWorldBounds(true); // stay on canvas

    this.keyboard = this.input.keyboard.addKeys("W, A, S, D");
    this.input.on("pointermove", pointer => {
      if (pointer.isDown) {
        let fire = this.add
          .sprite(pointer.x, pointer.y, "daze", "fire00.png")
          .play("blaze");
        this.fireAttacks.add(fire);
        fire.on("animationcomplete", () => {
          fire.destroy();
        });
      }
    });

    //this.physics.world.collide(this.anna, this.hooded, (anna, hooded) => {
    this.physics.world.addCollider(
      this.anna,
      this.assassins,
      (anna, hooded) => {
        anna.destroy();
        hooded.destroy();
      }
    );
    this.physics.world.addCollider(
      this.fireAttacks,
      this.assassins,
      (fireAttacks, hooded) => {
        fireAttacks.destroy();
        hooded.destroy();

        let x = 0;
        let y = 0;
        switch (Phaser.Math.Between(0, 1)) {
          case 0:
            x = Phaser.Math.Between(0, this.game.renderer.width);
            break;
          case 1:
            y = Phaser.Math.Between(0, this.game.renderer.height);
            break;
        }

        for (let i = 0; i < 2; i++) {
          this.assassins.add(
            this.physics.add
              .sprite(x, y, "hooded")
              .setScale(2)
              .setImmovable(true)
          );
        }
      }
    );
  }
  update(time, delta) {
    //delta 16.66 @ 60 fps

    for (let i = 0; i < this.assassins.getChildren().length; i++) {
      this.physics.accelerateToObject(
        this.assassins.getChildren()[i],
        this.anna
      );
    }
    if (this.anna.active === true) {
      if (this.keyboard.D.isDown === true) {
        //this.anna.x = this.anna.x + 64 * (delta / 1000); // without physics
        this.anna.setVelocityX(128);
        this.anna.play("right", true);
      }
      if (this.keyboard.A.isDown === true) {
        this.anna.setVelocityX(-128);
        this.anna.anims.playReverse("left", true);
      }
      if (this.keyboard.D.isUp && this.keyboard.A.isUp) {
        this.anna.setVelocityX(0);
      }
      if (this.keyboard.W.isDown === true) {
        this.anna.setVelocityY(-128);
        this.anna.play("up", true);
      }
      if (this.keyboard.S.isDown === true) {
        this.anna.setVelocityY(128);
        this.anna.play("down", true);
      }
      if (this.keyboard.W.isUp && this.keyboard.S.isUp) {
        this.anna.setVelocityY(0);
      }

      if (this.anna.body.velocity.x > 0) this.anna.play("right", true);
      else if (this.anna.body.velocity.x < 0)
        this.anna.anims.playReverse("left", true);
      else if (this.anna.body.velocity.y > 0) this.anna.play("down", true);
      else if (this.anna.body.velocity.y < 0) this.anna.play("up", true);
    }
  }
}
