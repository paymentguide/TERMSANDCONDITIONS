// Load all currencies dynamically into the dropdown
async function loadCurrencies() {
  const apiUrl = `https://api.exchangerate-api.com/v4/latest/USD`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const currencies = Object.keys(data.rates);
    const currencySelect = document.getElementById('currency');

    currencies.forEach((currency) => {
      const option = document.createElement('option');
      option.value = currency;
      option.textContent = currency;
      currencySelect.appendChild(option);
    });
  } catch (error) {
    alert('Error loading currencies. Please refresh the page.');
  }
}

// Convert currency
async function convertCurrency() {
  const amount = document.getElementById('amount').value;
  const currency = document.getElementById('currency').value;

  const apiUrl = `https://api.exchangerate-api.com/v4/latest/USD`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const rate = data.rates[currency];
    const converted = (amount * rate).toFixed(2);
    document.getElementById('output').textContent = 
      `Equivalent in ${currency}: ${converted}`;
  } catch (error) {
    document.getElementById('output').textContent = 
      'Error fetching exchange rates.';
  }
}

// Initialize the page by loading currencies
document.addEventListener('DOMContentLoaded', loadCurrencies);
