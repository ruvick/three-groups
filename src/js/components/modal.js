//! modal

function modal() {
	const popupLinks = document.querySelectorAll('.popup-link');
	const body = document.querySelector('body');
	const lockPadding = document.querySelectorAll('.lock-padding');

	let unlock = true;

	const timeout = 800;

	if (popupLinks.length > 0) {
		for (let index = 0; index < popupLinks.length; index++) {
			const popupLink = popupLinks[index];
			popupLink.addEventListener('click', function (e) {
				e.preventDefault();
				const popupName = popupLink.getAttribute('data-target');
				const curentPopup = document.querySelector(`[data-popup="${popupName}"]`);
				popupOpen(curentPopup);
			});
		}
	}

	const popupCloseIcon = document.querySelectorAll('.close-popup');
	if (popupCloseIcon.length > 0) {
		for (let index = 0; index < popupCloseIcon.length; index++) {
			const el = popupCloseIcon[index];
			el.addEventListener('click', function (e) {
				popupClose(el.closest('.popup'));
				e.preventDefault();
			});
		}
	}

	//? popupOpen
	function popupOpen(curentPopup) {
		if (curentPopup && unlock) {
			const popupActive = document.querySelector('.popup.open');
			if (popupActive) {
				popupClose(popupActive, false);
			} else {
				bodyLock();
			}
			curentPopup.classList.add('open');
			curentPopup.addEventListener('click', function (e) {
				if (!e.target.closest('.popup__content')) {
					popupClose(e.target.closest('.popup'));
				}
			});
		}
	}

	//? popupClose
	// function popupClose(popupActive, doUnlock = true) {
	// 	if (unlock) {
	// 		popupActive.classList.remove('open');
	// 		if (doUnlock) {
	// 			bodyUnLock();
	// 		}
	// 	}
	// }

	//? popupClose
	function popupClose(popupActive, doUnlock = true) {
		if (unlock) {
			popupActive.classList.remove('open');
			popupActive.removeEventListener('click', popupCloseHandler);
			if (doUnlock) {
				bodyUnLock();
			}
		}
	}

	function popupCloseHandler(e) {
		if (!e.target.closest('.popup__content')) {
			popupClose(e.target.closest('.popup'));
		}
	}

	window.addEventListener('keydown', function (event) {
		if (event.keyCode === 27) {
			const popupActive = document.querySelector('.popup.open');
			if (popupActive && unlock) {
				popupClose(popupActive, true);
			}
		}
	});

	//? bodyLock
	function bodyLock() {
		const lockPaddingValue =
			window.innerWidth - document.querySelector('.site-container').offsetWidth + 'px';

		if (lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = lockPaddingValue;
			}
		}

		body.style.paddingRight = lockPaddingValue;
		body.classList.add('lock');

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
					el.style.paddingRight = '0px';
				}
			}

			body.style.paddingRight = '0px';
			body.classList.remove('lock');
		}, timeout);

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, timeout);
	}
}
modal()


