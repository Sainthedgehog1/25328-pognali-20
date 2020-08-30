"use strict";

var hearts = document.querySelectorAll(".catalog-user__like");
var likesNumbers = document.querySelectorAll(".catalog-user__likes-count");


Array.from(hearts).forEach(function (heart) {
  heart.addEventListener("click", function (evt) {
    evt.preventDefault();
    heart.classList.toggle("catalog-user__like--active");
    if (heart.classList.contains("catalog-user__like--active")) {
      Array.from(likesNumbers).forEach(function (likesNumber) {
        likesNumber.textContent++;
      });
    } else {
      Array.from(likesNumbers).forEach(function (likesNumber) {
        likesNumber.textContent--;
      });
    }
  });
})
