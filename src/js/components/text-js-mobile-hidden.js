const textJs = document.querySelector('.text-js-mobile-hidden')
function textJsMobileHidden() {
  if (!textJs) return;

  const jsBlock = document.querySelector('.js-block');
  const jsButton = document.querySelector('.js-button');
  jsButton.addEventListener('click', function () {
    jsBlock.classList.add('active');
    jsButton.style.display = 'none';
  })
}
textJsMobileHidden()
