export default async function formDate() {
	function debounce(func, delay) {
		let timeout;
		return function (...args) {
			clearTimeout(timeout);
			timeout = setTimeout(() => func.apply(this, args), delay);
		};
	}

	const isObjectEmpty = object => {
		return Object.keys(object).length === 0 && object.contructor === Object;
	};

	let dateParams = {};

	// Sélection des inputs
	const dayInput = document.querySelector('#day');
	const monthInput = document.querySelector('#month');
	const yearInput = document.querySelector('#year');

	let domInputs = [];

	if (dayInput && monthInput && yearInput) {
		domInputs.push(dayInput, monthInput, yearInput);
	}

	console.log(
		domInputs[0].value.length === 0,
		domInputs[0].validity.valid,
		domInputs[0]
	);

	for (let i = 0; i < domInputs.length; i++) {
		domInputs[i].addEventListener(
			'input',
			debounce(event => {
				try {
					const inputId = domInputs[i].id;
					let value = event.target.value;
					if (inputId === 'day' && value.length <= 2) {
						dateParams.day = parseInt(value, 10);
						console.log(`Jour : ${dateParams.day}`);
					} else if (inputId === 'month' && value.length <= 2) {
						dateParams.month = parseInt(value, 10);
						console.log(`Mois : ${dateParams.month}`);
					} else if (inputId === 'year' && value.length <= 4) {
						dateParams.year = parseInt(value, 10);
						console.log(`Année : ${dateParams.year}`);
					}
				} catch (e) {
					console.error(
						`Erreur sur l'ID «${domInputs[i]?.id}»; Erreur:`,
						e
					);
				}
			}, 500)
		);
	}

	// Sélection des spans pour l'affichage des erreurs potentielles
	const dayErrorSpans = document.querySelector('#day + span.error');
	const monthErrorSpans = document.querySelector('#month + span.error');
	const yearErrorSpans = document.querySelector('#year + span.error');

	let errorSpans = [];

	if ((dayErrorSpans, monthErrorSpans, yearErrorSpans)) {
		errorSpans.push(dayErrorSpans, monthErrorSpans, yearErrorSpans);
	}

	let dateOfBirth;
	const today = new Date();

	// Sélection des spans pour l'affichage des résultats
	const resultDay = document.querySelector('#result-day');
	const resultMonth = document.querySelector('#result-month');
	const resultYear = document.querySelector('#result-year');

	const confirmButton = document.querySelector('#submit-button');
	if (confirmButton) {
		confirmButton.addEventListener('click', event => {
			event.preventDefault();
			event.stopPropagation();
			console.log('Date actuelle :', today);
			console.log('Paramètres de date soumis :', dateParams);

			if (isObjectEmpty(dateParams)) {
			}

			try {
				dateOfBirth = new Date(
					dateParams.year,
					dateParams.month - 1, // Ajustement du mois
					dateParams.day
				);
				console.log(dateOfBirth);

				// Calcul brut
				let years = today.getFullYear() - dateOfBirth.getFullYear();
				let months = today.getMonth() - dateOfBirth.getMonth();
				let days = today.getDate() - dateOfBirth.getDate();

				// Ajustement si le jour actuel est inférieur au jour de naissance
				if (days < 0) {
					// On emprunte un mois
					// Pour connaître le nombre de jours dans le mois précédent de la date "today"
					let prevMonth = new Date(
						today.getFullYear(),
						today.getMonth(),
						0
					);
					let daysInPrevMonth = prevMonth.getDate();

					days += daysInPrevMonth;
					months -= 1;
				}

				// Ajustement si le mois actuel est inférieur au mois de naissance
				if (months < 0) {
					months += 12;
					years -= 1;
				}

				// Affichage des résultats
				resultYear.innerHTML = years;
				resultMonth.innerHTML = months;
				resultDay.innerHTML = days;
			} catch (e) {
				console.log(`Date of birth creation error: ${e}`);
			}
		});
	} else {
		console.error('Élément avec l\'ID "submit-button" non trouvé.');
	}
}
