const hide = (element: HTMLDivElement) => element.classList.add("hidden");
const show = (element: HTMLDivElement) => element.classList.remove("hidden");

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("modal-show", (element: HTMLButtonElement, binding) => {
    element.addEventListener("click", () => {
      const $modalContainerElement = document.getElementById(binding.value) as HTMLDivElement;
      show($modalContainerElement)
    });
  });

  nuxtApp.vueApp.directive("modal-hide", (element: HTMLButtonElement, binding) => {
    const $modalContainerElement = document.getElementById(binding.value ) as HTMLDivElement;
    const $modalElemnt = $modalContainerElement.querySelector('[role="dialog"]') as HTMLDivElement;

    $modalElemnt?.addEventListener("click", (element) => {
      if (element.target === $modalElemnt) {
        hide($modalContainerElement);
      }
    });

    $modalContainerElement.addEventListener("keydown", (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        hide($modalContainerElement);
      }
    });

    element.addEventListener("click", () => {
      hide($modalContainerElement)
    });
  });
});
