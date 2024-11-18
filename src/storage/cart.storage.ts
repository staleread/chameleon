import type { CartEntry } from '@/types/model.types'
import config from '@/config'

export function addItemToCart(itemId: number) {
  const cart = getCartEntries()

  const entry = cart.find((e: CartEntry) => e.itemId === itemId)

  if (!entry) {
    const newEntry: CartEntry = { itemId, amount: 1 }
    updateCart([...cart, newEntry])
    return
  }

  entry.amount += 1
  updateCart(cart)
}

export function removeItemFromCart(itemId: number) {
  const cart = getCartEntries()

  const entry = cart.find((e: CartEntry) => e.itemId === itemId)

  if (!entry) {
    return
  }

  entry.amount -= 1

  if (entry.amount >= 0) {
    updateCart(cart)
    return
  }

  updateCart(cart.filter((e: CartEntry) => e.itemId !== itemId))
}

export function getCartEntries(): CartEntry[] {
  const cart = localStorage.getItem(config.storage.cart.localStorageKey)

  const entries = cart ? JSON.parse(cart) : []

  return entries.filter((e: CartEntry) => e.amount > 0)
}

function updateCart(cart: CartEntry[]) {
  localStorage.setItem(config.storage.cart.localStorageKey, JSON.stringify(cart))
}
