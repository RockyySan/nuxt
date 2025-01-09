export const useAuthPopupStore = defineStore('auth-popup', () => {
  const isShowLoginPopup = ref(false)
  const showLoginPopup = () => {
    isShowLoginPopup.value = true
  }
  const hideLoginPopup = () => {
    isShowLoginPopup.value = false
  }
  return { isShowLoginPopup, showLoginPopup, hideLoginPopup }
})
