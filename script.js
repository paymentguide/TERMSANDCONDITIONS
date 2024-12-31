async function populateCurrencyList() {
  const apiUrl = 'https://api.exchangerate-api.com/v4/latest/USD';
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json();
    const currencies = Object.keys(data.rates).sort();
    const currencySelect = document.getElementById('currency');
    
    // Add placeholder option
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = 'Select currency';
    placeholder.disabled = true;
    placeholder.selected = true;
    currencySelect.appendChild(placeholder);
    
    // Add currency options
    currencies.forEach((currency) => {
      const option = document.createElement('option');
      option.value = currency;
      option.textContent = `${currency} - ${getCurrencyName(currency)}`;
      currencySelect.appendChild(option);
    });
  } catch (error) {
    console.error('Error fetching currency list:', error);
    document.getElementById('currency').innerHTML = 
      '<option value="">Error loading currencies</option>';
  }
}

async function convertCurrency() {
  const amount = 99.99;
  const currency = document.getElementById('currency').value;
  const output = document.getElementById('output');
  
  if (!currency) {
    output.textContent = 'Please select a currency';
    return;
  }

  output.textContent = 'Converting...';
  
  try {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`);
    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json();
    const rate = data.rates[currency];
    const converted = (amount * rate).toFixed(2);
    const formatter = new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currency
    });
    
    output.textContent = `${formatter.format(converted)} ${currency}`;
  } catch (error) {
    output.textContent = 'Error fetching exchange rates. Please try again later.';
  }
}

function getCurrencyName(code) {
  const currencies = {
    USD: 'United States Dollar',
    EUR: 'Euro',
    GBP: 'British Pound Sterling',
    JPY: 'Japanese Yen',
    AUD: 'Australian Dollar',
    CAD: 'Canadian Dollar',
    CHF: 'Swiss Franc',
    CNY: 'Chinese Yuan',
    SEK: 'Swedish Krona',
    NZD: 'New Zealand Dollar',
    MXN: 'Mexican Peso',
    SGD: 'Singapore Dollar',
    HKD: 'Hong Kong Dollar',
    NOK: 'Norwegian Krone',
    KRW: 'South Korean Won',
    INR: 'Indian Rupee',
    RUB: 'Russian Ruble',
    BRL: 'Brazilian Real',
    ZAR: 'South African Rand',
    TRY: 'Turkish Lira',
    ARS: 'Argentine Peso',
    ILS: 'Israeli New Shekel',
    MYR: 'Malaysian Ringgit',
    THB: 'Thai Baht',
    CLP: 'Chilean Peso',
    PHP: 'Philippine Peso',
    IDR: 'Indonesian Rupiah',
    COP: 'Colombian Peso',
    PKR: 'Pakistani Rupee',
    EGP: 'Egyptian Pound',
    VND: 'Vietnamese Dong',
    PLN: 'Polish Zloty',
    HUF: 'Hungarian Forint',
    CZK: 'Czech Koruna',
    DKK: 'Danish Krone',
    BHD: 'Bahraini Dinar',
    OMR: 'Omani Rial',
    KWD: 'Kuwaiti Dinar',
    QAR: 'Qatari Rial',
    SAR: 'Saudi Riyal',
    JOD: 'Jordanian Dinar',
    KZT: 'Kazakhstani Tenge',
    RSD: 'Serbian Dinar',
    MKD: 'Macedonian Denar',
    BYN: 'Belarusian Ruble',
    GEL: 'Georgian Lari',
    LKR: 'Sri Lankan Rupee',
    NGN: 'Nigerian Naira',
    TWD: 'New Taiwan Dollar',
    AFN: 'Afghan Afghani',
    ALL: 'Albanian Lek',
    DZD: 'Algerian Dinar',
    AOA: 'Angolan Kwanza',
    XCD: 'East Caribbean Dollar',
    AWG: 'Aruban Florin',
    AZN: 'Azerbaijani Manat',
    BSD: 'Bahamian Dollar',
    BDT: 'Bangladeshi Taka',
    BWP: 'Botswana Pula',
    BND: 'Brunei Dollar',
    BGN: 'Bulgarian Lev',
    BDI: 'Burundian Franc',
    KHR: 'Cambodian Riel',
    CVE: 'Cape Verdean Escudo',
    KMF: 'Comorian Franc',
    CDF: 'Congolese Franc',
    CRC: 'Costa Rican Colón',
    HRK: 'Croatian Kuna',
    CUB: 'Cuban Peso',
    CYP: 'Cypriot Pound',
    DOP: 'Dominican Peso',
    GMD: 'Gambian Dalasi',
    GHS: 'Ghanaian Cedi',
    GIP: 'Gibraltar Pound',
    GMD: 'Gambian Dalasi',
    GRD: 'Greek Drachma',
    GTQ: 'Guatemalan Quetzal',
    GNF: 'Guinean Franc',
    GUF: 'French Guiana Franc',
    GYD: 'Guyanese Dollar',
    HTG: 'Haitian Gourde',
    HNL: 'Honduran Lempira',
    HUF: 'Hungarian Forint',
    ISK: 'Icelandic Króna',
    INR: 'Indian Rupee',
    IDR: 'Indonesian Rupiah',
    IRR: 'Iranian Rial',
    IQD: 'Iraqi Dinar',
    ILS: 'Israeli Shekel',
    JMD: 'Jamaican Dollar',
    JPY: 'Japanese Yen',
    JOD: 'Jordanian Dinar',
    KES: 'Kenyan Shilling',
    KWD: 'Kuwaiti Dinar',
    KGS: 'Kyrgyzstani Som',
    LAK: 'Lao Kip',
    LBP: 'Lebanese Pound',
    LKR: 'Sri Lankan Rupee',
    LRD: 'Liberian Dollar',
    LSL: 'Lesotho Loti',
    LTL: 'Lithuanian Litas',
    LUX: 'Luxembourg Franc',
    LYD: 'Libyan Dinar',
    MAD: 'Moroccan Dirham',
    MDL: 'Moldovan Leu',
    MGA: 'Malagasy Ariary',
    MKD: 'Macedonian Denar',
    MMK: 'Myanmar Kyat',
    MNT: 'Mongolian Tugrik',
    MOP: 'Macanese Pataca',
    MRU: 'Mauritanian Ouguiya',
    MWK: 'Malawian Kwacha',
    MXN: 'Mexican Peso',
    MYR: 'Malaysian Ringgit',
    MZN: 'Mozambican Metical',
    NAD: 'Namibian Dollar',
    NGN: 'Nigerian Naira',
    NIO: 'Nicaraguan Córdoba',
    NOK: 'Norwegian Krone',
    NPR: 'Nepalese Rupee',
    NZD: 'New Zealand Dollar',
    OMR: 'Omani Rial',
    PAB: 'Panamanian Balboa',
    PEN: 'Peruvian Nuevo Sol',
    PGK: 'Papua New Guinean Kina',
    PHP: 'Philippine Peso',
    PKR: 'Pakistani Rupee',
    PLN: 'Polish Zloty',
    PYG: 'Paraguayan Guarani',
    QAR: 'Qatari Rial',
    RON: 'Romanian Leu',
    RUB: 'Russian Ruble',
    RWF: 'Rwandan Franc',
    SAR: 'Saudi Riyal',
    SBD: 'Solomon Islands Dollar',
    SCR: 'Seychelles Rupee',
    SGD: 'Singapore Dollar',
    SHP: 'Saint Helena Pound',
    SLL: 'Sierra Leonean Leone',
    SOS: 'Somali Shilling',
    SRD: 'Surinamese Dollar',
    SSP: 'South Sudanese Pound',
    STD: 'São Tomé and Príncipe Dobra',
    SYP: 'Syrian Pound',
    SZL: 'Swazi Lilangeni',
    THB: 'Thai Baht',
    TJS: 'Tajikistani Somoni',
    TMT: 'Turkmenistani Manat',
    TND: 'Tunisian Dinar',
    TOP: 'Tongan Paʻanga',
    TRY: 'Turkish Lira',
    TTD: 'Trinidad and Tobago Dollar',
    TWD: 'New Taiwan Dollar',
    TZS: 'Tanzanian Shilling',
    UAH: 'Ukrainian Hryvnia',
    UGX: 'Ugandan Shilling',
    USD: 'United States Dollar',
    UYU: 'Uruguayan Peso',
    UZS: 'Uzbekistani Som',
    VND: 'Vietnamese Dong',
    VUV: 'Vanuatu Vatu',
    WST: 'Samoan Tala',
    XOF: 'West African CFA Franc',
    XPF: 'CFP Franc',
    YER: 'Yemeni Rial',
    ZAR: 'South African Rand',
    ZMK: 'Zambian Kwacha',
    ZWD: 'Zimbabwean Dollar'

 };
      return currencies[code] || code;
    }

  // Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  populateCurrencyList();
});
