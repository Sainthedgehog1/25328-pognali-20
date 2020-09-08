"use strict";

var popup = document.querySelector(".busines-service");
var openButton = document.querySelector(".regular-service__link");
var closeButton = document.querySelector(".busines-service__close-button");

openButton.addEventListener("click", function (evt) {
  evt.preventDefault();

  popup.classList.add("busines-service--active");
})

closeButton.addEventListener("click", function () {
  popup.classList.remove("busines-service--active");
})
