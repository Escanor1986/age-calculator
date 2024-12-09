import './style.css';
import formDate from './scripts/dateForm';

async function displayDOM() {
	const data = (document.querySelector('#app').innerHTML = `

  <section id="form-container">
  <form id="form" autocomplete="on">
    <span>
      <label for="day">DAY</label>
      <input type="text" id="day" name="day" placeholder="DD" aria-label="Day" maxlength="2" pattern="[0-9]{2}" title="Veuillez entrer deux chiffres." />
    </span>
    <span>
      <label for="month">MONTH</label>
      <input type="text" id="month" name="month" placeholder="MM" aria-label="Month" maxlength="2" pattern="[0-9]{2}" title="Veuillez entrer deux chiffres." />
    </span>
    <span>
      <label for="year">YEAR</label>
      <input type="text" id="year" name="year" placeholder="YYYY" aria-label="Year" maxlength="4" pattern="[0-9]{4}" title="Veuillez entrer quatre chiffres." />
    </span>
    
    <div id="svg-wrapper">
      <svg width="100" height="100">
        <circle cx="50" cy="50" r="40" stroke="#e6e6e6" fill="#7368b6" />
      </svg>
      <button type="submit" id="submit-button" aria-label="Submit"></button>
    </div>
  </form>
</section>
<section id="form-result">
  <div class="result-item">
    <span id="result-year">test</span>
    <p>years</p>
  </div>
  <div class="result-item">
    <span id="result-month">test</span>
    <p>months</p>
  </div>
  <div class="result-item">
    <span id="result-day">test</span>
    <p>days</p>
  </div>
</section>     

<div class="attribution">
  Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>.
  Coded by <a href="https://github.com/Escanor1986" target="_blank">Escanor1986</a>.
</div>

`);

	return data;
}

await displayDOM();

try {
	formDate();
} catch (e) {
	console.log(e);
}
