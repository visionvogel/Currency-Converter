document.addEventListener("DOMContentLoaded", () => {
  const fromCurrency = document.getElementById("fromCurrency");
  const toCurrency = document.getElementById("toCurrency");
  const amountInput = document.getElementById("amount");
  const convertBtn = document.getElementById("convert");
  const result = document.getElementById("result");

  const currencies = [
    { code: "USD", name: "US Dollar", flag: "🇺🇸" },
    { code: "EUR", name: "Euro", flag: "🇪🇺" },
    { code: "GBP", name: "British Pound", flag: "🇬🇧" },
    { code: "TRY", name: "Turkish Lira", flag: "🇹🇷" },
    { code: "JPY", name: "Japanese Yen", flag: "🇯🇵" },
    { code: "AUD", name: "Australian Dollar", flag: "🇦🇺" },
    { code: "CAD", name: "Canadian Dollar", flag: "🇨🇦" },
    { code: "CHF", name: "Swiss Franc", flag: "🇨🇭" },
    { code: "CNY", name: "Chinese Yuan", flag: "🇨🇳" },
    { code: "INR", name: "Indian Rupee", flag: "🇮🇳" },
  ];

  currencies.forEach((currency) => {
    let option1 = document.createElement("option");
    option1.value = currency.code;
    option1.textContent = `${currency.flag} ${currency.code} - ${currency.name}`;
    fromCurrency.appendChild(option1);

    let option2 = document.createElement("option");
    option2.value = currency.code;
    option2.textContent = `${currency.flag} ${currency.code} - ${currency.name}`;
    toCurrency.appendChild(option2);
  });

  fromCurrency.value = "USD";
  toCurrency.value = "EUR";

  convertBtn.addEventListener("click", () => {
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const amount = amountInput.value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
      .then((response) => response.json())
      .then((data) => {
        const rate = data.rates[to];
        const convertedAmount = (amount * rate).toFixed(2);
        result.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
      })
      .catch((error) => {
        result.textContent = "Error fetching exchange rate.";
      });
  });
});
