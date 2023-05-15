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
};

//=======creat function initSpollers===========
function initSpollers() {
}