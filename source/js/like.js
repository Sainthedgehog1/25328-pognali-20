"use strict";

var hearts = document.querySelectorAll(".catalog-user__like");
var likesNumbers = document.querySelectorAll(".catalog-user__likes-count");

Array.from(hearts).forEach(function (heart) {
  heart.addEventListener("click", function (evt) {
    evt.preventDefault();
    var likesNumber = heart.nextElementSibling;
    heart.classList.toggle("catalog-user__like--active");
    var count = likesNumber.dataset.count;
    if (heart.classList.contains("catalog-user__like--active")) {
      count++;
    } else {
      count--;
    }
    likesNumber.dataset.count = count;
    likesNumber.textContent = converNumberToString(count);
  });
})

var converNumberToString = function (num) {
  var million = 1000000;
  if (num >= million) {
    return (num / million).toFixed(1) + " M";
  }

  return String(num);
}

// фокус кнопок аккардиона

var btns = document.querySelectorAll(".filter__toggle");
function btnTabindex(btn) {
  if (window.screen.width >= 768 && window.screen.width < 1440) {
    btn.setAttribute("tabindex", "-1");
  } else {
    btn.setAttribute("tabindex", "0");
  }
};
window.addEventListener("resize", function () {
  btns.forEach(btnTabindex)
});
btns.forEach(btnTabindex)

// фокус активной буквы

var letter = document.querySelectorAll(".countries-filter__letter--active");

function actLetTabindex(letter) {
  letter.setAttribute("tabindex", "-1");
};
letter.forEach(actLetTabindex)

// фокус пагинации

var number = document.querySelector(".pagination__link--active");
var prev = document.querySelector(".pagination__prev--inactive");

function tabindex(number, prev) {
  number.setAttribute("tabindex", "-1");
  prev.setAttribute("tabindex", "-1");
};
tabindex(number, prev)
