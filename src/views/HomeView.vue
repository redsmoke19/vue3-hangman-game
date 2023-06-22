<script setup lang="ts">
import GameHeader from "../components/GameHeader.vue"
import GameFigure from "../components/GameFigure.vue"
import GameWrongLetters from "../components/GameWrongLetters.vue"
import GameWord from "../components/GameWord.vue"
import GamePopup from "../components/GamePopup.vue"
import GameNotification from "../components/GameNotification.vue"
import { computed, ref } from "vue"

const word = ref("василий")
const letters = ref<string[]>([])
const correctLetters = computed(() => letters.value.filter((letter) => word.value.includes(letter)))
const wrongLetters = computed(() => letters.value.filter((letter) => !word.value.includes(letter)))
const notification = ref<InstanceType<typeof GameNotification> | null>(null)

window.addEventListener("keydown", ({ key }) => {
  if (letters.value.includes(key)) {
    notification.value?.open()
    setTimeout(() => notification.value?.close(), 2000)
    return
  }
  if (/[а-яА-ЯёЁ]/.test(key)) {
    letters.value.push(key.toLowerCase())
  }
})
</script>

<template>
  {{ word }}
  <br />
  {{ letters }}
  <br />
  {{ correctLetters }}
  <br />
  {{ wrongLetters }}
  <game-header />
  <div class="game-container">
    <game-figure :wrong-letters-count="wrongLetters.length" />
    <game-wrong-letters :wrong-letters="wrongLetters" />

    <game-word :word="word" :correct-letters="correctLetters" />
  </div>

  <game-popup v-if="false" />

  <game-notification ref="notification" />
</template>


