export default function formDate() {
	function debounce(func, delay) {
		let timeout;
		return function (...args) {
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				func.apply(this, args);
			}, delay);
		};
	}

	const isObjectEmpty = object => {
		return Object.keys(object).length === 0 && object.constructor === Object;
	};

	let dateParams = {};

	const dayInput = document.querySelector('#day');
	const monthInput = document.querySelector('#month');
	const yearInput = document.querySelector('#year');
	const confirmButton = document.querySelector('#submit-button');

	const resultDay = document.querySelector('#result-day');
	const resultMonth = document.querySelector('#result-month');
	const resultYear = document.querySelector('#result-year');

	const errorSpans = document.querySelectorAll('span.error');

	const inputs = [dayInput, monthInput, yearInput];

	if (inputs.some(input => !input)) {
		console.error('One or more inputs are missing.');
		return;
	}

	inputs.forEach(input => {
		input.addEventListener(
			'input',
			debounce(event => {
				try {
					dateParams[input.id] = event.target.value;
				} catch (e) {
					console.error(`Error on input ${input.id}`, e);
				}
			}, 500)
		);
	});

	confirmButton.addEventListener('click', event => {
		event.preventDefault();
		let hasErrors = false;

		inputs.forEach((input, index) => {
			const value = parseInt(input.value, 10);
			const errorSpan = errorSpans[index];

			if (!input.value) {
				errorSpan.textContent = 'This field is required.';
				hasErrors = true;
			} else if (
				(input.id === 'day' && (value < 1 || value > 31)) ||
				(input.id === 'month' && (value < 1 || value > 12)) ||
				(input.id === 'year' && value > new Date().getFullYear())
			) {
				errorSpan.textContent = 'Invalid value.';
				hasErrors = true;
			} else {
				errorSpan.textContent = '';
			}
		});

		if (hasErrors) return;

		const dateOfBirth = new Date(
			dateParams.year,
			dateParams.month - 1,
			dateParams.day
		);
		if (isNaN(dateOfBirth)) {
			console.error('Invalid date.');
			return;
		}

		const today = new Date();
		let years = today.getFullYear() - dateOfBirth.getFullYear();
		let months = today.getMonth() - dateOfBirth.getMonth();
		let days = today.getDate() - dateOfBirth.getDate();

		if (days < 0) {
			const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
			days += prevMonth.getDate();
			months -= 1;
		}

		if (months < 0) {
			months += 12;
			years -= 1;
		}

		animateResult(resultYear, years);
		animateResult(resultMonth, months);
		animateResult(resultDay, days);
	});
}

function animateResult(element, finalValue) {
	let currentValue = 0;
	const interval = setInterval(() => {
		if (currentValue < finalValue) {
			currentValue++;
			element.textContent = currentValue;
		} else {
			clearInterval(interval);
		}
	}, 50);
}
