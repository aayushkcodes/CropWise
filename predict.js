const predictForm = document.getElementById("predictForm");
const resultBox = document.getElementById("result");
const loadingBar = document.getElementById("loadingBar");
const API_KEY = "AIzaSyDWJp-Eq0neroNvCpN093nbjRYxCZSxdxs";

predictForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  loadingBar.classList.remove("hidden");
  resultBox.classList.add("hidden");

  const crop = document.getElementById("crop").value;
  const soil = parseFloat(document.getElementById("soil").value);
  const rainfall = parseFloat(document.getElementById("rainfall").value);
  const area = parseFloat(document.getElementById("area").value);

  const baseYields = {
    paddy: 4,
    maize: 3.5,
    wheat: 2.8,
    soybean: 2.2,
    cotton: 1.8,
    potato: 5.0,
    sugarcane: 8.0,
  };

  const baseYield = baseYields[crop] || 2;
  const city = sessionStorage.getItem('userCity') || 'DefaultCity';

  const startTime = Date.now();

  try {
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );
    const weatherData = await weatherResponse.json();

    const currentRain = weatherData?.rain?.["1h"] || 0;

    let y = baseYield;
    if (soil < 5.5) y -= 0.5;
    if (rainfall < 500) y -= 0.7;
    if (rainfall > 1200) y -= 0.3;
    if (currentRain > 5) y += 0.3;
    else if (currentRain === 0) y -= 0.2;

    y = Math.max(y, 1);
    const total = y * area;

    const elapsed = Date.now() - startTime;
    const remaining = 2000 - elapsed;

    setTimeout(() => {
      loadingBar.classList.add("hidden");
      resultBox.classList.remove("hidden");
      resultBox.innerHTML = `
        <h3>🌾 Predicted Yield for ${crop.toUpperCase()}</h3>
        <p><strong>${y.toFixed(2)} tons/hectare</strong></p>
        <p>Total Expected: <strong>${total.toFixed(2)} tons</strong></p>
        <hr>
        <ul style="text-align:left">
          <li>${soil < 5.5 ? "Apply lime to improve soil pH" : "Soil pH is optimal ✅"}</li>
          <li>${rainfall < 500 ? "Schedule irrigation soon" : "Rainfall is adequate ✅"}</li>
          <li>${currentRain > 5 ? "Recent rainfall is good for crops ✅" : "Recent rainfall is low, monitor irrigation"}</li>
          <li>Use balanced fertilizer to maximize yield</li>
        </ul>
      `;
    }, remaining > 0 ? remaining : 0);
  } catch (error) {
    loadingBar.classList.add("hidden");
    resultBox.classList.remove("hidden");
    resultBox.innerHTML = `
      <p style="color:red;">Error fetching weather data. Showing basic prediction instead.</p>
      <p>Fallback prediction based on input data only.</p>
    `;
  }
});
