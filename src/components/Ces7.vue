<template>
    <div>
      <audio ref="audio" :src="currentSong.url"></audio>
  
        <h2>{{ currentSong.title }}</h2>
        <p>{{ currentSong.artist }}</p >
  
        <button @click="play">Play</button>
        <button @click="pause">Pause</button>
  
        <select v-model="currentSong" @change="changeSong">
          <option v-for="song in songs" :key="song.id" :value="song">{{ song.title }}</option>
        </select>
      </div>
   
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  interface Song {
    id: number,
    title: string,
    artist: string,
    url: string
  }
  
  const songs: Song[] = [
    { id: 1, title: 'Song 1', artist: 'Artist 1', url: 'src/pic/千年泪.mp3' },
    { id: 2, title: 'Song 2', artist: 'Artist 2', url: 'src/pic/无名的人.mp3' },
    { id: 3, title: 'Song 3', artist: 'Artist 3', url: 'src/pic/遇见.mp3' }
  ];
  
  const currentSong = ref<Song>(songs[0]);
  
  const audio = ref<HTMLAudioElement | null>(null);
  
  const play = () => {
    if (audio.value) {
      audio.value.play();
    }
  };
  
  const pause = () => {
    if (audio.value) {
      audio.value.pause();
    }
  };
  
  const changeSong = (event: Event) => {
    const target = event.target as HTMLSelectElement;
    const selectedSongId = parseInt(target.value);
    const selectedSong = songs.find(song => song.id === selectedSongId);
  
    if (selectedSong) {
      currentSong.value = selectedSong;
      if (audio.value) {
        audio.value.src = selectedSong.url;
        audio.value.play();
      }
    }
  };
  </script>