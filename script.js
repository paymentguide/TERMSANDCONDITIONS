async function populateCurrencyList() {
  const apiUrl = `https://api.exchangerate-api.com/v4/latest/USD`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const currencies = Object.keys(data.rates);
    const currencySelect = document.getElementById('currency');

    // Populate dropdown with currency options
    currencies.forEach((currency) => {
      const option = document.createElement('option');
      option.value = currency;
      option.textContent = currency;
      currencySelect.appendChild(option);
    });
  } catch (error) {
    console.error('Error fetching currency list:', error);
  }
}

async function convertCurrency() {
  const amount = 99.99; // Fixed amount in USD
  const currency = document.getElementById('currency').value;

  const apiUrl = `https://api.exchangerate-api.com/v4/latest/USD`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const rate = data.rates[currency];
    const converted = Math.ceil(amount * rate); // Round up to nearest whole number

    // Display the rounded converted amount
    document.getElementById('output').textContent = 
      `Equivalent in ${currency}: ${converted}`;

    // Mark the conversion step as complete
    document.getElementById('step2').classList.add('completed');
  } catch (error) {
    document.getElementById('output').textContent = 
      'Error fetching exchange rates.';
  }
}

function openEmail() {
  const emailLink = 
    "mailto:yourstudybuddy303@gmail.com?subject=Proof of Payment for Math Tutoring&body=Please find my proof of payment attached.";
  window.location.href = emailLink;

  // Mark the proof submission step as complete
  document.getElementById('step3').classList.add('completed');
}

// Populate the currency dropdown on page load
document.addEventListener('DOMContentLoaded', populateCurrencyList);

function copyToClipboard() {
  // Get the bank account number
  const accountNumber = "2032202001590";

  // Create a temporary input element to hold the text
  const tempInput = document.createElement("input");
  tempInput.value = accountNumber;
  document.body.appendChild(tempInput);

  // Select the text in the input and copy it
  tempInput.select();
  tempInput.setSelectionRange(0, 99999); // For mobile devices
  document.execCommand("copy");

  // Remove the temporary input element
  document.body.removeChild(tempInput);

  // Show a success message
  const copyMessage = document.getElementById("copyMessage");
  copyMessage.style.display = "inline";

  // Hide the message after 2 seconds
  setTimeout(() => {
    copyMessage.style.display = "none";
  }, 2000);
}
