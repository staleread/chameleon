import { ref, watchEffect } from 'vue'

export default function useLazyLoading(
  loadCb: () => Promise<void>,
  onError: (err: unknown) => void,
) {
  const isLoading = ref(false)

  const loadData = async () => {
    isLoading.value = true
    try {
      await loadCb()
    }
    catch (err: unknown) {
      onError(err)
    }
    finally {
      isLoading.value = false
    }
  }
  watchEffect(loadData)

  return isLoading
}
