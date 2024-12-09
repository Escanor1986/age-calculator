export default function formDate() {
	function debounce(func, delay) {
		let timeout;
		return function (...args) {
			clearTimeout(timeout);
			timeout = setTimeout(() => func.apply(this, args), delay);
		};
	}

	let dateParams = {
		day: 10,
		month: 10,
		year: 2000,
	};

	const dayInput = document.querySelector('#day');
	if (dayInput) {
		dayInput.addEventListener(
			'input',
			debounce(event => {
				let day = event.target.value;
				if (day.length <= 2) {
					dateParams.day = parseInt(day, 10);
					console.log(`Jour : ${dateParams.day}`);
				} else {
					return;
				}
			}, 500)
		);
	} else {
		console.error('Élément avec l\'ID "day" non trouvé.');
	}

	const monthInput = document.querySelector('#month');
	if (monthInput) {
		monthInput.addEventListener(
			'input',
			debounce(event => {
				let month = event.target.value;
				if (month.length <= 2) {
					dateParams.month = parseInt(month, 10);
					console.log(`Mois : ${dateParams.month}`);
				} else {
					return;
				}
			}, 500)
		);
	} else {
		console.error('Élément avec l\'ID "month" non trouvé.');
	}

	const yearInput = document.querySelector('#year');
	if (yearInput) {
		yearInput.addEventListener(
			'input',
			debounce(event => {
				let year = event.target.value;
				if (year.length <= 4) {
					dateParams.year = parseInt(year, 10);
					console.log(`Année : ${dateParams.year}`);
				} else {
					return;
				}
			}, 500)
		);
	} else {
		console.error('Élément avec l\'ID "year" non trouvé.');
	}

	let dateOfBirth;
	const today = new Date();

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
