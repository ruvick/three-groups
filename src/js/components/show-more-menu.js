function menuGrouping() {
  const vLinks = document.querySelector('.visible-links');
  const hLinks = document.querySelector('.hidden-links');
  const btn = document.querySelector('.nav-text');
  const breaks = [];

  if (!vLinks) return;
  const updateNav = () => {
    const nav = document.querySelector('.header-top__body');
    const availableSpace = btn && btn.classList.contains('hidden') ? nav.offsetWidth : nav.offsetWidth - (btn && btn.offsetWidth) - 0;

    if (vLinks && hLinks && btn && nav) {
      if (vLinks.offsetWidth > availableSpace) {
        breaks.push(vLinks.offsetWidth);
        hLinks.insertBefore(vLinks.lastElementChild, hLinks.firstElementChild);
        if (btn.classList.contains('hidden') && hLinks.children.length > 0) {
          btn.classList.remove('hidden');
        }
      } else {
        if (availableSpace > breaks[breaks.length - 1]) {
          vLinks.appendChild(hLinks.firstElementChild);
          breaks.pop();
        }
        if (breaks.length < 1) {
          btn.classList.add('hidden');
          hLinks.classList.add('hidden');
        }
      }
      btn.setAttribute('count', breaks.length);

      if (hLinks.children.length > 0) {
        btn.textContent = 'Еще';
        btn.classList.add('active');
      } else {
        btn.textContent = '';
        btn.classList.remove('active');
      }
    }
  };

  const toggleHiddenLinks = () => {
    if (hLinks) {
      hLinks.classList.toggle('hidden');
    }
  };

  if (btn) {
    btn.addEventListener('click', toggleHiddenLinks);

    document.addEventListener('click', (event) => {
      if (!btn.contains(event.target) && hLinks) {
        hLinks.classList.add('hidden');
      }
    });
  }

  if (window) {
    window.addEventListener('resize', updateNav);
    window.addEventListener('DOMContentLoaded', updateNav);
    window.addEventListener('load', updateNav);
  }
}

menuGrouping()





