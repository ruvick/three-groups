function accordion() {
  const accordionJs = document.querySelector(".accordion");

  //document.querySelectorAll(".accordion-start-js").forEach((el) => {
  //  el.addEventListener("click", () => {
  //    const elems = document.querySelectorAll(".accordion-start-js");
  //    elems.forEach((elem) => {
  //      if (elem !== el) {
  //        setTimeout(() => {
  //          elem.classList.remove("open");
  //          elem.nextElementSibling.classList.remove("open");
  //        }, 200);

  //      }
  //    });

  //    el.classList.toggle("open");
  //    const content = el.nextElementSibling;
  //    if (content) {
  //      content.classList.toggle("open");
  //    }
  //  });
  //});

  let faqs = document.querySelectorAll(".faq");

  if (faqs.length > 0) {
    faqs.forEach((faq) => {
      faq.addEventListener("click", function (e) {
        if (e.target.classList.contains("ask")) {
          let answer = e.target.nextElementSibling;
          toggleItem(answer, e.target);
        }
      });
    });

    window.addEventListener("click", (e) => {
      faqs.forEach((faq) => {
        if (!faq.contains(e.target)) {
          faq.querySelectorAll(".answer.open").forEach((answer) => {
            jsHeightAnimation(answer, true, function () {
              answer.classList.remove("open");
            });
          });
        }
      });
    });
  }

  function toggleItem(answer, ask) {
    if (answer.classList.contains("open")) {
      jsHeightAnimation(answer, true, function () {
        answer.classList.remove("open");
        ask.classList.remove("open");
      });
    } else {
      closeAllAnswers(ask);
      answer.classList.add("open");
      ask.classList.add("open");
      jsHeightAnimation(answer);
    }
  }

  function closeAllAnswers(currentAsk) {
    faqs.forEach((faq) => {
      faq.querySelectorAll(".answer.open").forEach((answer) => {
        if (answer.previousElementSibling !== currentAsk) {
          jsHeightAnimation(answer, true, function () {
            answer.classList.remove("open");
            answer.previousElementSibling.classList.remove("open");
          });
        }
      });
    });
  }

  function jsHeightAnimation(el, isReverse = false, onFinish = function () {}) {
    if (el.jsAnimated === true) {
      return;
    }

    el.jsAnimated = true;
    let animate = el.animate(
      [{ height: 0 }, { height: el.scrollHeight + "px" }],
      {
        duration: 500,
        direction: isReverse ? "reverse" : "normal",
      }
    );

    animate.addEventListener("finish", function () {
      el.jsAnimated = false;
      onFinish();
    });
  }
}

accordion();
