import Swiper, { Navigation, Pagination } from "swiper";
Swiper.use([Navigation, Pagination]);

//const swiper = new Swiper(el, {
//  slidesPerView: "auto",
//});

const slidersContainer = document.querySelectorAll(".slider-container");

if (slidersContainer.length > 0) {
	slidersContainer.forEach((container) => {
		const slider = container.querySelector(".slider");
		const nextButton = container.querySelector(".swiper-button-next");
		const prevButton = container.querySelector(".swiper-button-prev");

		if (slider && nextButton && prevButton) {
			let swiper = new Swiper(slider, {
				slidesPerView: 1.4,
				spaceBetween: 20,
				navigation: {
					nextEl: nextButton,
					prevEl: prevButton,
				},
				breakpoints: {
					1024: {
						slidesPerView: 4,
					},
					768: {
						slidesPerView: 3,
					},
					501: {
						slidesPerView: 2,
					}
				}
			});
		}
	});
}
