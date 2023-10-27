import { DirectiveBinding } from "vue"

const getModalElementByTarget = (target: string) => document.getElementById(target) as HTMLDivElement

export const show = (element: HTMLDivElement): void => {
  if (element.classList.contains('hidden')) {
    const onShowModal = new CustomEvent('on-show-modal', {
      detail: {
        target: element.getAttribute('id')
      }
    })

    window.dispatchEvent(onShowModal)
    element.classList.toggle("hidden")
    element.querySelector('input').focus()
  }
}

export const hide = (target: string): void => {
  const $modalContainerElement = getModalElementByTarget(target)
  
  if (!$modalContainerElement.classList.contains('hidden')) {
    const onCloseModal = new CustomEvent('on-close-modal', {
      detail: {
        target
      }
    })

    window.dispatchEvent(onCloseModal)
    $modalContainerElement.classList.toggle("hidden")
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("show-modal", (element: HTMLButtonElement, binding: DirectiveBinding) => {
    element.addEventListener("click", () => {
      const $modalContainerElement = getModalElementByTarget(binding.value)
      show($modalContainerElement)
    })
  })

  nuxtApp.vueApp.directive("hide-modal", (element: HTMLButtonElement, binding: DirectiveBinding) => {
    const target = binding.value
    const $modalContainerElement = getModalElementByTarget(target)
    
    $modalContainerElement.addEventListener("keydown", (event: KeyboardEvent) => {
      (event.key === "Escape") && hide(target)
    })
    
    element.addEventListener("click", () => {
      hide(target)
    })
  })
})
