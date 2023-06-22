<script setup lang="ts">
interface Props {
  word: string
  correctLetters: string[]
}

defineProps<Props>()
</script>

<template>
  <div class="word">
    <span class="letter" v-for="(letter, idx) in word" :key="idx">
      {{ correctLetters.includes(letter) ? letter : "" }}
    </span>
  </div>
</template>
