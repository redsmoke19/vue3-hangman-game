<script setup lang="ts">
import GameHeader from "../components/GameHeader.vue"
import GameFigure from "../components/GameFigure.vue"
import GameWrongLetters from "../components/GameWrongLetters.vue"
import GameWord from "../components/GameWord.vue"
import GamePopup from "../components/GamePopup.vue"
import GameNotification from "../components/GameNotification.vue"
import { useRandomWords } from "../composables/useRandomWords"
import { ref, watch } from "vue"
import { useLetters } from "../composables/useLetters"
import { useNotification } from "../composables/useNotification"

const { word, getRandomWord } = useRandomWords();
const { letters, wrongLetters, correctLetters, isWin, isLose } = useLetters(word);
const { notification, showNotification } = useNotification();

const popup = ref<InstanceType<typeof GamePopup> | null>(null);

watch(wrongLetters, () => {
  if (isLose.value) {
    popup.value?.open("lose");
  }
});

watch(correctLetters, () => {
  if (isWin.value) {
    popup.value?.open("win");
  }
})

window.addEventListener("keydown", ({ key }) => {
  if (isWin.value || isLose.value) {
    return;
  };
  if (letters.value.includes(key)) {
    showNotification();
  }
  if (/[а-яА-ЯёЁ]/.test(key)) {
    letters.value.push(key.toLowerCase())
  }
})

const restart = async () => {
  await getRandomWord();
  letters.value = [];
  popup.value?.close();
}
</script>

<template>
  <game-header />
  <div class="game-container">
    <game-figure :wrong-letters-count="wrongLetters.length" />
    <game-wrong-letters :wrong-letters="wrongLetters" />

    <game-word :word="word" :correct-letters="correctLetters" />
  </div>

  <game-popup ref="popup" :word="word" @restart="restart" />

  <game-notification ref="notification" />
</template>


