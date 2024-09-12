// // document.addEventListener('DOMContentLoaded', function() {
// 	const toggleButton = document.getElementById('toggleButton');
// 	const hiddenItems = document.querySelectorAll('.cards-action__item.hidden');
	
// 	toggleButton.addEventListener('click', function() {
// 			hiddenItems.forEach(item => {
// 			 if (item.style.display === 'none' || item.style.display === '') {
// 					item.style.display = 'block';
// 					setTimeout(() => {
// 					 item.classList.remove('hidden');
// 					}, 10); // Slight delay to allow for transition
// 			 } else {
// 					item.classList.add('hidden');
// 					setTimeout(() => {
// 					 item.style.display = 'none';
// 					}, 300); // Match the transition duration
// 			 }
// 			});
	
// 			toggleButton.textContent = toggleButton.textContent === 'Смотреть все' ? 'Скрыть' : 'Смотреть все';
// 	});
// 	// });

let _slideUp = (target, duration = 500, showmore = 0) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = `${target.offsetHeight}px`;
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = showmore ? `${showmore}px` : `0px`;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.hidden = !showmore ? true : false;
			!showmore ? target.style.removeProperty('height') : null;
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			!showmore ? target.style.removeProperty('overflow') : null;
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}
let _slideDown = (target, duration = 500, showmore = 0) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		target.hidden = target.hidden ? false : null;
		showmore ? target.style.removeProperty('height') : null;
		let height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = showmore ? `${showmore}px` : `0px`;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.transitionProperty = "height, margin, padding";
		target.style.transitionDuration = duration + 'ms';
		target.style.height = height + 'px';
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		window.setTimeout(() => {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}
let _slideToggle = (target, duration = 500) => {
	if (target.hidden) {
		return _slideDown(target, duration);
	} else {
		return _slideUp(target, duration);
	}
}

function showMore() {
	const showMoreBlocks = document.querySelectorAll('[data-showmore]');
	if (showMoreBlocks.length) {
			if (window.innerWidth >= 992) {
					initItems(showMoreBlocks);
					document.addEventListener("click", showMoreActions);
					window.addEventListener("resize", showMoreActions);
			}
	}

	function initItems(showMoreBlocks) {
			showMoreBlocks.forEach(showMoreBlock => {
					initItem(showMoreBlock);
			});
	}

	function initItem(showMoreBlock) {
			const showMoreContent = showMoreBlock.querySelector('[data-showmore-content]');
			if (showMoreContent) {
					const hiddenHeight = getHeight(showMoreBlock, showMoreContent);
					if (hiddenHeight < getOriginalHeight(showMoreContent)) {
							_slideUp(showMoreContent, 0, hiddenHeight);
					}
			}
	}

	function getHeight(showMoreBlock, showMoreContent) {
			let hiddenHeight = 0;
			const showMoreType = showMoreBlock.dataset.showmore ? showMoreBlock.dataset.showmore : 'size';
			if (showMoreType === 'items') {
					const showMoreTypeValue = showMoreContent.dataset.showmoreContent ? showMoreContent.dataset.showmoreContent : 3;
					const showMoreItems = showMoreContent.children;
					for (let index = 1; index < showMoreItems.length; index++) {
							const showMoreItem = showMoreItems[index - 1];
							hiddenHeight += showMoreItem.offsetHeight;
							if (index === showMoreTypeValue) break;
					}
			} else {
					const showMoreTypeValue = showMoreContent.dataset.showmoreContent ? showMoreContent.dataset.showmoreContent : 150;
					hiddenHeight = showMoreTypeValue;
			}
			return hiddenHeight;
	}

	function getOriginalHeight(showMoreContent) {
			let hiddenHeight = showMoreContent.offsetHeight;
			showMoreContent.style.removeProperty('height');
			let originalHeight = showMoreContent.offsetHeight;
			showMoreContent.style.height = `${hiddenHeight}px`;
			return originalHeight;
	}

	function showMoreActions(e) {
			const targetEvent = e.target;
			const targetType = e.type;
			if (window.innerWidth >= 992) {
					if (targetType === 'click') {
							if (targetEvent.closest('[data-showmore-button]')) {
									const showMoreButton = targetEvent.closest('[data-showmore-button]');
									const showMoreBlockId = showMoreButton.dataset.showmoreButton;
									const showMoreBlock = document.querySelector(`[data-showmore="${showMoreBlockId}"]`);
									if (showMoreBlock) {
											const showMoreContent = showMoreBlock.querySelector('[data-showmore-content]');
											if (showMoreContent) {
													const showMoreSpeed = showMoreBlock.dataset.showmoreSpeed ? showMoreBlock.dataset.showmoreSpeed : '500';
													const hiddenHeight = getHeight(showMoreBlock, showMoreContent);
													if (!showMoreContent.classList.contains('_slide')) {
															console.log('Toggling show more content');
															showMoreBlock.classList.contains('_showmore-active') ? _slideUp(showMoreContent, showMoreSpeed, hiddenHeight) : _slideDown(showMoreContent, showMoreSpeed, hiddenHeight);
															showMoreBlock.classList.toggle('_showmore-active');
															showMoreButton.textContent = showMoreBlock.classList.contains('_showmore-active') ? 'Скрыть' : 'Смотреть все';
													}
											} else {
													console.error('Show more content not found');
											}
									} else {
											console.error('Show more block not found');
									}
							}
					} else if (targetType === 'resize') {
							initItems(showMoreBlocks);
					}
			}
	}
}

showMore(); 