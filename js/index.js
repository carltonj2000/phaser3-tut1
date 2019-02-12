import phaser from "phaser";

import { LoadScene } from "./scenes/load";
import { MenuScene } from "./scenes/menu";
import { PlayScene } from "./scenes/play";

let game = new phaser.Game({
  width: 800,
  height: 600,
  scene: [LoadScene, PlayScene],
  render: { pixelArt: true }
});
