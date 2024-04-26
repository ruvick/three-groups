const goBack = document.querySelectorAll(".go-back");

function goBackLink() {
  if (goBack.length === 0) return;
  goBack.forEach(function (button) {
    button.addEventListener("click", function () {
      window.history.back();
    });
  });
}

goBackLink();
