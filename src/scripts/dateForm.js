export default function formDate() {
  function debounce(func, delay) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  }

  let dateParams = {};

  const dayInput = document.querySelector('#day');
  if (dayInput) {
    dayInput.addEventListener('input', debounce((event) => {
      dateParams.day = parseInt(event.target.value, 10);
      console.log(`Jour : ${dateParams.day}`);
    }, 300));
  } else {
    console.error('Élément avec l\'ID "day" non trouvé.');
  }

  const monthInput = document.querySelector('#month');
  if (monthInput) {
    monthInput.addEventListener('input', debounce((event) => {
      dateParams.month = parseInt(event.target.value, 10);
      console.log(`Mois : ${dateParams.month}`);
    }, 300));
  } else {
    console.error('Élément avec l\'ID "month" non trouvé.');
  }

  const yearInput = document.querySelector('#year');
  if (yearInput) {
    yearInput.addEventListener('input', debounce((event) => {
      dateParams.year = parseInt(event.target.value, 10);
      console.log(`Année : ${dateParams.year}`);
    }, 300));
  } else {
    console.error('Élément avec l\'ID "year" non trouvé.');
  }

  const confirmButton = document.querySelector("#submit-button");
  if (confirmButton) {
    confirmButton.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      console.log('Paramètres de date soumis :', dateParams);
    });
  } else {
    console.error('Élément avec l\'ID "submit-button" non trouvé.');
  }

  const today = new Date();
  console.log('Date actuelle :', today);
}
