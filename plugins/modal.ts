import { DirectiveBinding } from "vue"

const getModalElementByTarget = (target: string) => document.getElementById(target) as HTMLDivElement

export const showModal = (target: string): void => {
  const $modalContainerElement = getModalElementByTarget(target)
  
  if ($modalContainerElement.classList.contains('hidden')) {
    const onShowModal = new CustomEvent('on-show-modal', {
      detail: {
        target: $modalContainerElement.getAttribute('id')
      }
    })

    window.dispatchEvent(onShowModal)
    $modalContainerElement.classList.toggle("hidden")
    $modalContainerElement.querySelector('input').focus()
  }
}

export const closeModal = (target: string): void => {
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
      showModal(binding.value)
    })
  })

  nuxtApp.vueApp.directive("close-modal", (element: HTMLButtonElement, binding: DirectiveBinding) => {
    const target = binding.value
    const $modalContainerElement = getModalElementByTarget(target)
    
    $modalContainerElement.addEventListener("keydown", (event: KeyboardEvent) => {
      (event.key === "Escape") && closeModal(target)
    })
    
    element.addEventListener("click", () => {
      closeModal(target)
    })
  })
})
