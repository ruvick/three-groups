(function () {
  const burger = document.querySelector("[data-burger]");
  const menu = document.querySelector("[data-menu]");
  const menuItems = document.querySelectorAll("[data-menu-item]");
  const overlay = document.querySelector("[data-menu-overlay]");
  const headerMenu = document.querySelectorAll('.header__list--mobile .header__link');
  const pageBody = document.querySelector(".page__body");

  function preventScroll() {
    // Получаем текущую позицию прокрутки страницы
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Устанавливаем body в position: fixed и top в отрицательное значение текущей позиции прокрутки
    pageBody.style.position = 'fixed';
    pageBody.style.top = -scrollTop + 'px';
  }

  function restoreScroll() {
    // Получаем текущее значение top из стиля элемента "pageBody"
    const top = parseInt(pageBody.style.top, 10);

    // Восстанавливаем скролл страницы
    pageBody.style.position = '';
    pageBody.style.top = '';
    window.scrollTo(0, -top);
  }

  if (burger) {
    burger.addEventListener("click", (e) => {
      burger.classList.toggle("burger--active");
      menu.classList.toggle("menu--active");
      if (menu.classList.contains("menu--active")) {
        burger.setAttribute("aria-expanded", "true");
        burger.setAttribute("aria-label", "Закрыть меню");

        // Добавляем класс "active" к элементу "body"
        document.body.classList.add("active");

        // Отключаем скролл страницы
        preventScroll();
      } else {
        burger.setAttribute("aria-expanded", "false");
        burger.setAttribute("aria-label", "Открыть меню");

        // Удаляем класс "active" из элемента "body"
        document.body.classList.remove("active");

        // Восстанавливаем скролл страницы
        restoreScroll();
      }
    });
  }

  if (overlay) {
    overlay.addEventListener("click", () => {
      closeMenu();
    });
  }

  if (menuItems.length > 0) {
    menuItems.forEach((el) => {
      el.addEventListener("click", () => {
        closeMenu();
      });
    });
  }

  document.addEventListener("click", (e) => {
    if (
      menu &&
      !menu.contains(e.target) &&
      burger &&
      !burger.contains(e.target) &&
      menu.classList.contains("menu--active")
    ) {
      closeMenu();
    }
  });

  function closeMenu() {
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Открыть меню");
    burger.classList.remove("burger--active");
    menu.classList.remove("menu--active");
    document.body.classList.remove("active");

    // Восстанавливаем скролл страницы
    restoreScroll();
  }

  if (headerMenu.length > 0) {
    headerMenu.forEach((el) => {
      el.addEventListener("click", () => {
        if (menu.classList.contains("menu--active")) {
          closeMenu();
        }
      });
    });
  }
})();



