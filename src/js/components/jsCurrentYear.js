const jsCurrentYear = document.querySelector('.js-currentYear');

if (jsCurrentYear) {
  const currentYear = new Date().getFullYear();
  jsCurrentYear.textContent = currentYear;
}
