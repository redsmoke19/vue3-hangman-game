import { type Ref, ref, computed } from "vue"

export const useLetters = (word: Ref<string>) => {
  const letters = ref<string[]>([])
  const correctLetters = computed(() =>
    letters.value.filter((letter) => word.value.includes(letter))
  )
  const wrongLetters = computed(() =>
    letters.value.filter((letter) => !word.value.includes(letter))
  )
  // У слова могут быть повторяющеие буквы, что бы их учесть нужно сделать следующее
  const isWin = computed(() => [...word.value].every((x) => correctLetters.value.includes(x)))
  const isLose = computed(() => wrongLetters.value.length === 6)

  return {
    letters,
    correctLetters,
    wrongLetters,
    isWin,
    isLose
  }
}
