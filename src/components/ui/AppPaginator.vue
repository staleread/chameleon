<script setup lang="ts">
import Button from 'primevue/button'
import { computed } from 'vue'

const props = defineProps<{
  pageNumber: number
  hasNext: boolean
}>()

const emit = defineEmits<{
  pageChange: [newPageNumber: number]
}>()

const isPreviousDisabled = computed(() => props.pageNumber <= 1)
const isNextDisabled = computed(() => !props.hasNext)
const shouldShow = computed(() => !(props.pageNumber === 1 && !props.hasNext))

function goToPreviousPage() {
  if (!isPreviousDisabled.value) {
    emit('pageChange', props.pageNumber - 1)
  }
}

function goToNextPage() {
  if (!isNextDisabled.value) {
    emit('pageChange', props.pageNumber + 1)
  }
}
</script>

<template>
  <div v-if="shouldShow" class="flex justify-center my-4">
    <div class="flex space-x-2 bg-gray-100 rounded p-2">
      <Button
        icon="pi pi-chevron-left"
        :disabled="isPreviousDisabled"
        severity="secondary"
        @click="goToPreviousPage"
      />

      <Button
        :label="`Сторінка ${pageNumber}`"
        disabled
        severity="secondary"
        text
      />

      <Button
        icon="pi pi-chevron-right"
        :disabled="isNextDisabled"
        severity="secondary"
        @click="goToNextPage"
      />
    </div>
  </div>
</template>
