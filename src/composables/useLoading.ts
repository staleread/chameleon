import type { Ref } from 'vue'
import { ref, watchEffect } from 'vue'

interface FetchOptions {
  watcher: () => Promise<void>
  onError: () => void
}

export default function useLoading(
  options: FetchOptions,
): Ref<boolean> {
  const isLoading = ref(false)

  const fetchData = async () => {
    isLoading.value = true
    try {
      await options.watcher()
    }
    catch {
      options.onError()
    }
    finally {
      isLoading.value = false
    }
  }
  watchEffect(fetchData)

  return isLoading
}
