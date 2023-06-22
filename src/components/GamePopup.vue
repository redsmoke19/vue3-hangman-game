<script setup lang="ts">
import type { GameStatus } from "../types/GameStatus";
import { ref } from "vue"

interface Props {
  word: string;
}

defineProps<Props>();

const emit = defineEmits<{
  (e: "restart"): void
}>()

const gameStatus = ref<GameStatus | null>(null)
const isVisible = ref(false)

const open = (status: GameStatus) => {
  isVisible.value = true
  gameStatus.value = status
}
const close = () => {
  isVisible.value = false
}

defineExpose({
  open,
  close
})
</script>

<template>
  <div v-if="isVisible" class="popup-container">
    <div class="popup">
      <h2 v-if="gameStatus === 'win'">Поздравляю, вы победили! 😃</h2>
      <template v-else>
        <h2>Вы проиграли. 😕</h2>
        <h3>Загаданное имя было... {{ word }}</h3>
      </template>
      <button @click="emit('restart')">Сыграть еще раз</button>
    </div>
  </div>
</template>
