import phaser from "phaser";

import { CST } from "../CST";
import { MenuScene } from "./menu";

export class LoadScene extends phaser.Scene {
  constructor() {
    super({ key: CST.SCENES.LOAD });
  }
  loadImages() {
    this.load.setPath("./assets/image");
    for (let prop in CST.IMAGE)
      this.load.image(CST.IMAGE[prop], CST.IMAGE[prop]);
  }
  loadSprites(params) {
    this.load.setPath("./assets/sprite");
    for (let prop in CST.SPRITE)
      this.load.spritesheet(CST.SPRITE[prop], CST.SPRITE[prop], params);
  }
  loadAudio() {
    this.load.setPath("./assets/audio");
    for (let prop in CST.AUDIO)
      this.load.audio(CST.AUDIO[prop], CST.AUDIO[prop]);
  }
  preload() {
    this.load.spritesheet("anna", "./assets/sprite/anna.png", {
      frameHeight: 64,
      frameWidth: 64
    });
    this.load.atlas(
      "characters",
      "./assets/atlas/characters.png",
      "./assets/atlas/characters.json"
    );
    this.load.atlas(
      "daze",
      "./assets/atlas/daze.png",
      "./assets/atlas/daze.json"
    );
    this.loadImages();
    this.loadSprites({ frameHeight: 32, frameWidth: 32 });
    this.loadAudio();
    const loadingBar = this.add.graphics({ fillStyle: { color: 0xffffff } });
    this.load.on("progress", precent => {
      loadingBar.fillRect(
        0,
        this.game.renderer.height / 2,
        this.game.renderer.width * precent,
        50
      );
    });
    this.load.on("complete", () => {
      this.scene.add(CST.SCENES.MENU, MenuScene, false);
      this.scene.start(CST.SCENES.MENU);
    });
  }
  create() {}
}
