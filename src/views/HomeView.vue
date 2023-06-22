<script setup lang="ts">
import GameHeader from "../components/GameHeader.vue"
import GameFigure from "../components/GameFigure.vue"
import GameWrongLetters from "../components/GameWrongLetters.vue"
import GameWord from "../components/GameWord.vue"
import GamePopup from "../components/GamePopup.vue"
import GameNotification from "../components/GameNotification.vue"
import { useRandomWords } from "../composables/useRandomWords"
import { computed, ref, watch } from "vue"

const { word, getRandomWord } = useRandomWords();

// const word = ref("");
const letters = ref<string[]>([]);
const correctLetters = computed(() => letters.value.filter((letter) => word.value.includes(letter)));
const wrongLetters = computed(() => letters.value.filter((letter) => !word.value.includes(letter)));
// У слова могут быть повторяющеие буквы, что бы их учесть нужно сделать следующее 
const isWin = computed(() => [...word.value].every(x => correctLetters.value.includes(x)));
const isLose = computed(() => wrongLetters.value.length === 6);
const notification = ref<InstanceType<typeof GameNotification> | null>(null);
const popup = ref<InstanceType<typeof GamePopup> | null>(null);

// const getRandomWord = async () => {
//   try {
//     const name = await getRandomName();
//     word.value = name.toLowerCase();
//   } catch (err) {
//     console.log(err);
//     word.value = "";
//   }
// };
// getRandomWord()

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
    notification.value?.open()
    setTimeout(() => notification.value?.close(), 2000)
    return
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


