import { DirectiveBinding } from "vue"

const getModalElementByTarget = (target: string) => document.getElementById(target) as HTMLDivElement

export const show = (element: HTMLDivElement) => {
  if (element.classList.contains('hidden')) {
    const onShowModal = new CustomEvent('on-show-modal', {
      detail: {
        target: element.getAttribute('id')
      }
    })

    window.dispatchEvent(onShowModal)
    element.classList.toggle("hidden")
  }
}

export const hide = (target: string) => {
  const $modalContainerElement = getModalElementByTarget(target)
  
  if (!$modalContainerElement.classList.contains('hidden')) {
    const onCloseModal = new CustomEvent('on-close-modal', {
      detail: {
        target
      }
    })

    $modalContainerElement.classList.toggle("hidden")
    window.dispatchEvent(onCloseModal)
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("modal-show", (element: HTMLButtonElement, binding: DirectiveBinding) => {
    element.addEventListener("click", () => {
      const $modalContainerElement = getModalElementByTarget(binding.value)
      show($modalContainerElement)
    })
  })

  nuxtApp.vueApp.directive("modal-hide", (element: HTMLButtonElement, binding: DirectiveBinding) => {
    const target = binding.value
    const $modalContainerElement = getModalElementByTarget(target)
    const $modalElemnt = $modalContainerElement.querySelector('[role="dialog"]') as HTMLDivElement

    $modalElemnt?.addEventListener("click", (element) => {
      (element.target === $modalElemnt) && hide(target)
    })

    $modalContainerElement.addEventListener("keydown", (event: KeyboardEvent) => {
      (event.key === "Escape") && hide(target)
    })

    element.addEventListener("click", () => {
      hide(target)
    })
  })
})
