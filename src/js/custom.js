document.addEventListener("DOMContentLoaded", function () {
	//! Accordion
	function accordion() {
		const accordionJs = document.querySelector(".accordion");

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

		function jsHeightAnimation(
			el,
			isReverse = false,
			onFinish = function () { }
		) {
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
	// * End Accordion

	//! BlockHeightOfTitle
	function hideExcessButtons() {
		const cardContents = document.querySelectorAll(".js-cart");
		if (cardContents.length === 0) return;

		cardContents.forEach((content) => {
			const containerHeight =
				content.clientHeight -
				parseInt(window.getComputedStyle(content).paddingTop) -
				parseInt(window.getComputedStyle(content).paddingBottom) +
				5;
			const title = content.querySelector(".card-concert__title");
			const titleHeight =
				title.offsetHeight +
				parseInt(window.getComputedStyle(title).marginBottom);
			let excessButtons = 0;
			const itemMoreButton = content.querySelector(".item-more");
			const itemMoreNum = content.querySelector(".item-more__num");
			const buttonsBanner = content.querySelector(".buttons-banner");

			const buttons = content.querySelectorAll(
				".buttons-banner__item:not(.item-more)"
			);
			buttons.forEach((button) => {
				button.classList.remove("hidden-button");
			});

			itemMoreButton.classList.add("hidden-button");
			[...buttons].reverse().forEach((button) => {
				const buttonsBannerHeight = buttonsBanner.offsetHeight;

				if (buttonsBannerHeight > containerHeight - titleHeight) {
					button.classList.add("hidden-button");
					excessButtons++;
				}
			});

			if (excessButtons > 0) {
				itemMoreButton.classList.remove("hidden-button");
				itemMoreNum.textContent = excessButtons;
				const buttonsBannerHeight = buttonsBanner.offsetHeight;

				if (buttonsBannerHeight > containerHeight - titleHeight) {
					const buttons = content.querySelectorAll(
						".buttons-banner__item:not(.item-more,.hidden-button)"
					);
					buttons[buttons.length - 1].classList.add("hidden-button");
					itemMoreNum.textContent = excessButtons + 1;
				}
			} else {
				itemMoreButton.classList.add("hidden-button");
			}

			itemMoreButton.addEventListener("click", function () {
				const itemMoreInner = content.querySelector(".item-more__inner");
				itemMoreInner.classList.toggle("active");
			});
		});
	}

	hideExcessButtons();

	let resizeTimeout;
	window.addEventListener("resize", function () {
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(hideExcessButtons, 100);
	});

	function mainBlockHeight() {
		const bannerBlockJs = document.querySelector(".js-block-height");
		if (!bannerBlockJs) return;
		const itemMoreNum = bannerBlockJs.querySelector(".link-info__date--num");
		const itemMoreButton = bannerBlockJs.querySelector(".item-more");
		let excessButtons = 0;
		let size = 182;

		if (document.documentElement.clientWidth < 991) {
			size = 80;
		}

		const buttons = bannerBlockJs.querySelectorAll(
			".buttons-banner__item:not(.item-more)"
		);
		buttons.forEach((button) => {
			button.classList.remove("hidden-button");
		});

		itemMoreButton.classList.add("hidden-button");
		[...buttons].reverse().forEach((button) => {
			const buttonsBannerHeight = bannerBlockJs.offsetHeight;

			if (buttonsBannerHeight > size) {
				button.classList.add("hidden-button");
				excessButtons++;
			}
		});

		if (excessButtons > 0) {
			itemMoreButton.classList.remove("hidden-button");
			itemMoreNum.textContent = excessButtons;
			const buttonsBannerHeight = bannerBlockJs.offsetHeight;

			if (buttonsBannerHeight > size) {
				const buttons = bannerBlockJs.querySelectorAll(
					".buttons-banner__item:not(.item-more,.hidden-button)"
				);
				buttons[buttons.length - 1].classList.add("hidden-button");
				itemMoreNum.textContent = excessButtons + 1;
			}
		} else {
			itemMoreButton.classList.add("hidden-button");
		}
	}

	mainBlockHeight();

	let resizeTimeoutMainBlock;
	window.addEventListener("resize", function () {
		clearTimeout(resizeTimeoutMainBlock);
		resizeTimeoutMainBlock = setTimeout(mainBlockHeight, 100);
	});

	// * End BlockHeightOfTitle

	//! GoBack

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

	// * End GoBack

	//! jsCurrentYear

	const jsCurrentYear = document.querySelector(".js-currentYear");

	if (jsCurrentYear) {
		const currentYear = new Date().getFullYear();
		jsCurrentYear.textContent = currentYear;
	}

	// * End jsCurrentYear

	//! modal

	function modal() {
		const popupLinks = document.querySelectorAll(".popup-link");
		const body = document.querySelector("body");
		const lockPadding = document.querySelectorAll(".lock-padding");

		let unlock = true;

		const timeout = 800;

		if (popupLinks.length > 0) {
			for (let index = 0; index < popupLinks.length; index++) {
				const popupLink = popupLinks[index];
				popupLink.addEventListener("click", function (e) {
					e.preventDefault();
					const popupName = popupLink.getAttribute("data-target");
					const curentPopup = document.querySelector(
						`[data-popup="${popupName}"]`
					);
					popupOpen(curentPopup);
				});
			}
		}

		const popupCloseIcon = document.querySelectorAll(".close-popup");
		if (popupCloseIcon.length > 0) {
			for (let index = 0; index < popupCloseIcon.length; index++) {
				const el = popupCloseIcon[index];
				el.addEventListener("click", function (e) {
					popupClose(el.closest(".popup"));
					e.preventDefault();
				});
			}
		}

		//? popupOpen
		function popupOpen(curentPopup) {
			if (curentPopup && unlock) {
				const popupActive = document.querySelector(".popup.open");
				if (popupActive) {
					popupClose(popupActive, false);
				} else {
					bodyLock();
				}
				curentPopup.classList.add("open");
				curentPopup.addEventListener("click", function (e) {
					if (!e.target.closest(".popup__content")) {
						popupClose(e.target.closest(".popup"));
					}
				});
			}
		}

		//? popupClose
		function popupClose(popupActive, doUnlock = true) {
			if (unlock) {
				popupActive.classList.remove("open");
				if (doUnlock) {
					bodyUnLock();
				}
			}
		}

		//? bodyLock
		function bodyLock() {
			const lockPaddingValue =
				window.innerWidth -
				document.querySelector(".site-container").offsetWidth +
				"px";

			if (lockPadding.length > 0) {
				for (let index = 0; index < lockPadding.length; index++) {
					const el = lockPadding[index];
					el.style.paddingRight = lockPaddingValue;
				}
			}

			body.style.paddingRight = lockPaddingValue;
			body.classList.add("lock");

			unlock = false;
			setTimeout(function () {
				unlock = true;
			}, timeout);
		}

		//? bodyUnLock
		function bodyUnLock() {
			setTimeout(function () {
				if (lockPadding.length > 0) {
					for (let index = 0; index < lockPadding.length; index++) {
						const el = lockPadding[index];
						el.style.paddingRight = "0px";
					}
				}

				body.style.paddingRight = "0px";
				body.classList.remove("lock");
			}, timeout);

			unlock = false;
			setTimeout(function () {
				unlock = true;
			}, timeout);
		}
	}
	modal();

	// * End modal

	//! menuGrouping

	function menuGrouping() {
		const vLinks = document.querySelector(".visible-links");
		const hLinks = document.querySelector(".hidden-links");
		const btn = document.querySelector(".nav-text");
		const breaks = [];

		if (!vLinks) return;
		const updateNav = () => {
			const nav = document.querySelector(".header-top__body");
			const availableSpace =
				btn && btn.classList.contains("hidden")
					? nav.offsetWidth
					: nav.offsetWidth - (btn && btn.offsetWidth) - 0;

			if (vLinks && hLinks && btn && nav) {
				if (vLinks.offsetWidth > availableSpace) {
					breaks.push(vLinks.offsetWidth);
					hLinks.insertBefore(
						vLinks.lastElementChild,
						hLinks.firstElementChild
					);
					if (btn.classList.contains("hidden") && hLinks.children.length > 0) {
						btn.classList.remove("hidden");
					}
				} else {
					if (availableSpace > breaks[breaks.length - 1]) {
						vLinks.appendChild(hLinks.firstElementChild);
						breaks.pop();
					}
					if (breaks.length < 1) {
						btn.classList.add("hidden");
						hLinks.classList.add("hidden");
					}
				}
				btn.setAttribute("count", breaks.length);

				if (hLinks.children.length > 0) {
					btn.textContent = "Еще";
					btn.classList.add("active");
				} else {
					btn.textContent = "";
					btn.classList.remove("active");
				}
			}
		};

		const toggleHiddenLinks = () => {
			if (hLinks) {
				hLinks.classList.toggle("hidden");
			}
		};

		if (btn) {
			btn.addEventListener("click", toggleHiddenLinks);

			document.addEventListener("click", (event) => {
				if (!btn.contains(event.target) && hLinks) {
					hLinks.classList.add("hidden");
				}
			});
		}

		if (window) {
			window.addEventListener("resize", updateNav);
			window.addEventListener("DOMContentLoaded", updateNav);
			window.addEventListener("load", updateNav);
		}
	}

	menuGrouping();

	// * End menuGrouping

	//! textJs
	const textJs = document.querySelector(".text-js-mobile-hidden");
	function textJsMobileHidden() {
		if (!textJs) return;

		const jsBlock = document.querySelector(".js-block");
		const jsButton = document.querySelector(".js-button");
		jsButton.addEventListener("click", function () {
			jsBlock.classList.add("active");
			jsButton.style.display = "none";
		});
	}
	textJsMobileHidden();

	// * textJs

	//! videoBlock

	const videoBlock = document.querySelector(".video-block");

	if (videoBlock) {
		const video = videoBlock.querySelector("video");
		const playBtn = videoBlock.querySelector(".video-block__play");

		playBtn.addEventListener("click", () => {
			videoBlock.classList.add("video-block--played");
			video.play();
			video.controls = true;
			playBtn.classList.add("video-block__play--played");
		});

		video.onpause = function () {
			videoBlock.classList.remove("video-block--played");
			video.controls = false;
			playBtn.classList.remove("video-block__play--played");
		};
	}

	// * videoBlock
	//========================================================================================================================================================

	document.getElementById("backToTop").onclick = function () {
		scrollToTop();
	};

	function scrollToTop() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth' // Плавная прокрутка
		});
	}
	window.onscroll = function () {
		scrollFunction();
	};

	function scrollFunction() {
		var backToTopBtn = document.getElementById("backToTop");
		if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
			backToTopBtn.style.display = "block";
		} else {
			backToTopBtn.style.display = "none";
		}
	}




});
