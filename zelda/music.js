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
  .getElementById("play-music")
  .addEventListener("click", () => scheduler.start());
document
  .getElementById("stop")
  .addEventListener("click", () => scheduler.stop());
        
const HARDCODED_STRUDEL_CODE = `
        setcpm(40)
        // drums pattern
        $: s("[bd <hh oh*2>]*2").bank("ry30").dec(.4).gain(.7)
        $: s("[oh ~ rim*2 ~]/2").bank("ry30").dec(.4).gain(.7)
        // bass IV-V-I-vi progression
        $: n("[[-3,0,2,4] [-3,0,2,4] [0,2,4] [0,2,4]]/2")
          .scale("[F3:major G3:major C3:major A3:minor]/2")
          .sound("gm_acoustic_bass")
          .gain(0.75)
        // arpeggio
        $: n("<0 <2 4> 3 <5 7> 8 <11 12> 15 <5 7> 12 6 4 0>*4")
          .scale("[F3:major G3:major C3:major A3:minor]/2")
          .sound("gm_celesta")
          .gain(0.4)
        // melody
        $: n("<0 2 3/4 5*2 7 9*2 11 12*2 13 >*2")
          .scale("[F4:major G4:major C4:major A4:minor]/2")
          .sound("piano")
        `; 
