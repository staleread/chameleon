<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'AppPaginator',
  props: {
    pageNumber: {
      type: Number,
      required: true,
    },
    hasNext: {
      type: Boolean,
      required: true,
    },
  },
  emits: {
    pageChange: (_newPageNumber: number) => true,
  },
  setup(props, { emit }) {
    const isPreviousDisabled = computed(() => props.pageNumber <= 1)
    const isNextDisabled = computed(() => !props.hasNext)

    const shouldShow = computed(
      () => !(props.pageNumber === 1 && !props.hasNext),
    )

    const goToPreviousPage = () => {
      if (!isPreviousDisabled.value) {
        emit('pageChange', props.pageNumber - 1)
      }
    }

    const goToNextPage = () => {
      if (!isNextDisabled.value) {
        emit('pageChange', props.pageNumber + 1)
      }
    }

    return {
      isPreviousDisabled,
      isNextDisabled,
      shouldShow,
      goToPreviousPage,
      goToNextPage,
    }
  },
})
</script>

<template>
  <div v-if="shouldShow" class="flex justify-center my-4">
    <div class="flex space-x-2 bg-gray-100 rounded p-2">
      <button
        type="button"
        class="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
        :disabled="isPreviousDisabled"
        @click="goToPreviousPage"
      >
        «
      </button>

      <button
        type="button"
        class="px-4 py-2 bg-gray-300 text-gray-700 rounded"
        disabled
      >
        Сторінка {{ pageNumber }}
      </button>

      <button
        type="button"
        class="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
        :disabled="isNextDisabled"
        @click="goToNextPage"
      >
        »
      </button>
    </div>
  </div>
</template>
