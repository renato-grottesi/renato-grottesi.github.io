import { repl, controls } from "@strudel.cycles/core";
import {
  initAudioOnFirstClick,
  getAudioContext,
  webaudioOutput
} from "@strudel.cycles/webaudio";
const { note } = controls;

initAudioOnFirstClick();
const ctx = getAudioContext();

const { scheduler } = repl({
  defaultOutput: webaudioOutput,
  getTime: () => ctx.currentTime
});

const pattern = note("c3", ["eb3", "g3"]).s("sawtooth");

scheduler.setPattern(pattern);
document
  .getElementById("start")
  .addEventListener("click", () => scheduler.start());
document
  .getElementById("stop")
  .addEventListener("click", () => scheduler.stop());
