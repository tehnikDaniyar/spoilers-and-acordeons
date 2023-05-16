"use strict"


//spolers
const spollersArray = document.querySelectorAll('[data-spollers]');

if (spollersArray.length > 0) {
	//=====get regular spollers=====
	const spollersRegular = [...spollersArray].filter(item => !item.dataset.spollers.split(",")[0]);

	//===initialization regular spollers====== 
	if (spollersRegular.length > 0) {
		initSpollers(spollersRegular);
	};

	//=====get media spollers=======
	const mediaSpolers = [...spollersArray].filter(item => item.dataset.spollers.split(",")[0]);

	//====initialization media spollers=======
	if (mediaSpolers.length > 0) {
		const breakpointsArray = [];
		mediaSpolers.forEach(item => {
			const params = item.dataset.spollers;
			const paramsArray = params.split(",");
			const breakpoints = {};
			breakpoints.value = paramsArray[0];
			breakpoints.type = paramsArray[1] ? paramsArray[1] : "max";
			breakpoints.item = item;
			breakpointsArray.push(breakpoints)
		});

		let mediaQueries = breakpointsArray.map(item => {
			return `(${item.type}-width: ${item.value}px),${item.value},${item.type}`;
		});

		mediaQueries = mediaQueries.filter((item, index, self) => {
			return self.indexOf(item) === index;
		});

		mediaQueries.forEach(breakpoint => {
			const paramsArray = breakpoint.split(",");
			const mediaBreakpoint = paramsArray[1];
			const mediaType = paramsArray[2];
			const matchMedia = window.matchMedia(paramsArray[0]);

			const spollersArray = breakpointsArray.filter(item => {
				if (item.value == mediaBreakpoint && item.type == mediaType) {
					return true
				};
			});

			matchMedia.addListener(() => {
				initSpollers(spollersArray, matchMedia);
			})
			initSpollers(spollersArray, matchMedia);
		});
	};
};





//=======creat function initSpollers===========
function initSpollers(spollersArray, matchMedia = false) {
	spollersArray.forEach(spollersBlock => {
		spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;

		if (matchMedia.matches || !matchMedia) {
			spollersBlock.classList.add('_init');
			initSpollerBody(spollersBlock);
			spollersBlock.addEventListener("click", setSpollerAction);
		} else {
			spollersBlock.classList.remove('_init');
			initSpollerBody(spollersBlock, false);
			spollersBlock.removeEventListener("click", setSpollerAction);
		};
	});
};

function initSpollerBody(spollersBlock, hideSpollerBody = true) {
	const spollerTitles = spollersBlock.querySelectorAll('[data-spoller');

	if (spollerTitles.length > 0) {
		spollerTitles.forEach(spollerTitle => {
			if (hideSpollerBody) {
				spollerTitle.removeAttribute('tabindex');
				if (!spollerTitle.classList.contains('_active')) {
					spollerTitle.nextElementSibling.hidden = true;
				};
			} else {
				spollerTitle.setAttribute('tabindex', '-1');
				spollerTitle.nextElementSibling.hidden = false;
			};
		});
	};
};

function setSpollerAction(e) {
	const el = e.target;
	console.log(el);
	if (el.hasAttribute('data-spoller') || el.closest('[data-spoller')) {
		const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller');
		const spollerBlock = el.closest('[data-spollers]');
		const oneSpoller = spollerBlock.hasAttribute('[data-one-spoller]') ? true : false;
		if (!spollerBlock.querySelectorAll('._slide').length) {
			if (oneSpoller && !spollerTitle.classList.contains('_active')) {
				hideSpollersBody(spollerBlock);
			};
			spollerTitle.classList.toggle('_active');
			_slideToggle(spollerTitle.nextElementSibling, 500);
		};
	};
};

function hideSpollersBody(spollersBlock) {
	const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
	console.log(spollerActiveTitle);
	if (spollerActiveTitle) {
		spollerActiveTitle.classList.remove('_active');
		_slideUp(spollerActiveTitle.nextElementSibling, 500);
	};
};

let _slideUp = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = target.offsetHeight + "px";
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.hidden = true;
			target.style.removeProperty('height');
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration)
	};
};

let _slideDown = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (target.hidden) {
			target.hidden = false;
		}
		let height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = target.offsetHeight + "px";
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		window.setTimeout(() => {
			target.hidden = true;
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration)
	};
};

let _slideToggle = (target, duration = 500) => {
	console.log(target.hidden);
	if (target.hidden) {
		return _slideDown(target, duration);
	} else {
		return _slideUp(target, duration);
	}
};





