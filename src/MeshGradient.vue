<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue';

import { Gradient } from './Gradient';
import { randomColor } from './random-color';
import { restore, persist } from './storage';

import Button from './Button.vue';
import Input from './Input.vue';

function randomSeed() {
  return Math.floor(Math.random() * 10000) + 1;
}

const seed = ref(restore('seed', randomSeed()));

const colors = reactive(
  restore('colors', {
    color1: '#c3e4ff',
    color2: '#6ec3f4',
    color3: '#eae2ff',
    color4: '#b9beff',
  }),
);

const playbackState = ref('playing');

const recordingState = ref('stopped');
const capturer = new CCapture({
  format: 'webm',
  framerate: 30,
  autoSaveTime: 90,
  timeLimit: 900,
  quality: 0.999,
  // verbose: true,
});

const canvas = ref(null);
const gradient = ref(
  new Gradient(seed.value, {
    recordingState: recordingState,
    capturer,
  }),
);

const gradientStyleColors = computed(() => {
  return {
    '--gradient-color-1': colors.color1,
    '--gradient-color-2': colors.color2,
    '--gradient-color-3': colors.color3,
    '--gradient-color-4': colors.color4,
  };
});

watch([colors, seed], () => {
  gradient.value = new Gradient(seed.value, {
    recordingState: recordingState,
    capturer,
  });

  gradient.value.initGradient(canvas.value);

  persist('colors', colors);
  persist('seed', seed.value);
});

onMounted(() => {
  gradient.value.initGradient(canvas.value);
  setTimeout(() => {
    gradient.value.resize(1920, 1080);
  });
});

function togglePlayback() {
  playbackState.value = playbackState.value === 'playing' ? 'paused' : 'playing';

  if (playbackState.value === 'playing') {
    gradient.value.play();
  } else {
    gradient.value.pause();
  }
}

function toggleRecording() {
  const oldState = recordingState.value;

  recordingState.value = recordingState.value === 'recording' ? 'stopped' : 'recording';

  if (oldState === 'recording' && recordingState.value === 'stopped') {
    capturer.stop();
    capturer.save();
  } else {
    capturer.start();
  }
}

function randomize() {
  seed.value = randomSeed();
  colors.color1 = randomColor();
  colors.color2 = randomColor();
  colors.color3 = randomColor();
  colors.color4 = randomColor();
  playbackState.value = 'playing';
}
</script>

<template>
  <div class="mesh-gradient w-[1920px] h-[1080px] mx-auto my-8">
    <canvas
      ref="canvas"
      data-transition-in
      class="bg-black block"
      width="1920px"
      height="1080px"
      :style="gradientStyleColors"
    ></canvas>
  </div>

  <div class="flex text-white justify-between max-w-[1920px] mx-auto">
    <div class="min-w-[12rem]">
      <Button @click="togglePlayback" :disabled="recordingState === 'recording'">{{
        playbackState === 'playing' ? 'Pause' : 'Play'
      }}</Button>
    </div>

    <div class="max-w-[32rem]">
      <div class="flex">
        <Input placeholder="Color 1" v-model="colors.color1" :disabled="recordingState === 'recording'" />
        <Input placeholder="Color 2" v-model="colors.color2" :disabled="recordingState === 'recording'" />
        <Input placeholder="Color 3" v-model="colors.color3" :disabled="recordingState === 'recording'" />
        <Input placeholder="Color 4" v-model="colors.color4" :disabled="recordingState === 'recording'" />
        <Input placeholder="Seed" type="number" v-model="seed" :disabled="recordingState === 'recording'" />
      </div>
      <div class="mt-3 flex justify-center">
        <Button @click="randomize" :disabled="recordingState === 'recording'">Randomize</Button>
      </div>
    </div>

    <div class="min-w-[12rem] flex justify-end">
      <Button @click="toggleRecording" :disabled="playbackState !== 'playing'">{{
        recordingState === 'recording' ? 'Stop' : 'Record'
      }}</Button>
    </div>
  </div>
</template>
