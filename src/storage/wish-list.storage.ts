import type { WishListEntry } from '@/types/model.types'
import config from '@/config'

export function addItemToWishList(itemId: number) {
  const wishList = getWishListEntries()

  const entry = wishList.find((e: WishListEntry) => e.itemId === itemId)

  if (entry) {
    return
  }

  const newEntry: WishListEntry = { itemId }
  updateWishList([...wishList, newEntry])
}

export function removeItemFromWishList(itemId: number) {
  const wishList = getWishListEntries()

  const entry = wishList.find((e: WishListEntry) => e.itemId === itemId)

  if (!entry) {
    return
  }

  updateWishList(wishList.filter((e: WishListEntry) => e.itemId !== itemId))
}

export function getWishListEntries(): WishListEntry[] {
  const wishList = localStorage.getItem(config.storage.wishList.localStorageKey)

  return wishList ? JSON.parse(wishList) : []
}

function updateWishList(wishList: WishListEntry[]) {
  localStorage.setItem(config.storage.wishList.localStorageKey, JSON.stringify(wishList))
}
