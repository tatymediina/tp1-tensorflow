let model;
const threshold = 0.9; // * Nivel de confianza para considerar que es tóxico


toxicity.load(threshold).then(m => { // * Carga el modelo preentrenado
  model = m; // * Se guarda en la varianle model
  console.log("Modelo cargado");
});

function analyzeText() {
  const text = document.getElementById("inputText").value;
  const resultBox = document.getElementById("resultBox");

  if (!text || !model) {
    resultBox.innerHTML = "Cargando modelo o entrada vacía...";
    return;
  }
  
  // * Usa el modelo para clasificar el texto. 
  model.classify([text]).then(predictions => {
    let output = `<strong>Resultado para:</strong> "${text}"<br><br>`;

    predictions.forEach(pred => {
      const match = pred.results[0].match;
      const probability = pred.results[0].probabilities[1];
      output += `
        <div>
          <strong>${pred.label}</strong>: ${match ? "Tóxico" : " No tóxico"} 
          (${(probability * 100).toFixed(2)}%)
        </div>
      `;
    });

    resultBox.innerHTML = output;
  });
}
