"use strict";

/* Открытие модального окна */
var popup = document.querySelector(".busines-service");
if(popup){
  var openButton = document.querySelector(".regular-service__link");
  var closeButton = document.querySelector(".busines-service__close-button");

  if (openButton) {
    openButton.addEventListener("click", function (evt) {
      evt.preventDefault();

      popup.classList.add("busines-service--active");
    })
  }

  if (closeButton) {
    closeButton.addEventListener("click", function () {
      popup.classList.remove("busines-service--active");
    })
  }

  /* Закрытие модального окна по нажатию на Esc */
  window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      if (popup.classList.contains("busines-service--active")) {
        popup.classList.remove("busines-service--active");
      }
    }
  });
}