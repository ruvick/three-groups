
// Плавающая кнопка

if (document.documentElement.clientWidth >= 1024) {
	const bannerConcert = document.querySelector('.js-banner-concert');
	const floatingBtn = document.querySelector('.js-floating');

	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				// Когда js-banner-concert входит в область видимости
				floatingBtn.classList.remove('js-active');
			} else {
				// Когда js-banner-concert выходит из области видимости
				floatingBtn.classList.add('js-active');
			}
		});
	}, {
		threshold: 0.1 // Процент видимости элемента для срабатывания callback
	});

	if (bannerConcert) {
		observer.observe(bannerConcert); // Начать наблюдение за элементом js-banner-concert
	}
}


