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

function sendProof() {
  const fileInput = document.getElementById('proof');
  if (fileInput.files.length === 0) {
    alert('Please upload a file before sending.');
    return;
  }
  alert('Proof of payment sent successfully. Please wait for confirmation!');
}
