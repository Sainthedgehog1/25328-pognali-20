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
  // var thouthand =1000;
  if (num >= million) {
    return (num / million).toFixed(1) + ' M';
  }
  // if (num >= thouthand){
  //   return (num/thouthand).toFixed(1) + 'K';
  // }

  return String(num);
}

var btns = document.querySelectorAll(".filter__toggle");
function toggleTabindex(btn) {
  if (window.screen.width < 1440 && window.screen.width >= 768) {
    btn.setAttribute("tabindex", "-1");
  } else {
    btn.setAttribute("tabindex", "0");
  }
};
window.addEventListener("resize", function () {
  btns.forEach(toggleTabindex)
});
btns.forEach(toggleTabindex)
