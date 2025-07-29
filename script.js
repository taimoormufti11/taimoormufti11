let userName = '', userAge = '', userGender = '';

document.getElementById("continue-btn").addEventListener("click", () => {
  userName = document.getElementById("name").value.trim();
  userAge = document.getElementById("age").value.trim();
  userGender = document.getElementById("gender").value;

  if (!userName || !userAge || userAge <= 0 || !userGender) {
    alert("Please fill in all fields correctly.");
    return;
  }

  document.getElementById("welcome-section").style.display = "none";
  document.getElementById("calculator-section").style.display = "block";
  document.getElementById("greeting").textContent = `Hello, ${userName} (${userAge} yrs, ${userGender})`;
  updateInputs();
});

document.getElementById("calculator-type").addEventListener("change", updateInputs);

document.getElementById("calculate-btn").addEventListener("click", () => {
  const type = document.getElementById("calculator-type").value;
  const resultDiv = document.getElementById("result");

  const getVal = id => parseFloat(document.getElementById(id)?.value);

  let resultText = "";

  const weight = getVal("weight");
  const height = getVal("height") / 100; // cm to m
  const waist = getVal("waist");
  const hip = getVal("hip");

  switch (type) {
    case "bmi":
      if (!weight || !height) return resultDiv.textContent = "Enter valid height and weight.";
      const bmi = (weight / (height * height)).toFixed(2);
      let bmiCat = "";
      if (bmi < 18.5) bmiCat = "Underweight";
      else if (bmi < 25) bmiCat = "Normal";
      else if (bmi < 30) bmiCat = "Overweight";
      else bmiCat = "Obese";
      resultText = `BMI: ${bmi} (${bmiCat})`;
      break;

    case "bmr":
      if (!weight || !height) return resultDiv.textContent = "Enter valid height and weight.";
      const bmr = userGender === "male"
        ? (10 * weight + 6.25 * (height * 100) - 5 * userAge + 5)
        : (10 * weight + 6.25 * (height * 100) - 5 * userAge - 161);
      resultText = `BMR: ${bmr.toFixed(2)} kcal/day`;
      break;

    case "whr":
      if (!waist || !hip) return resultDiv.textContent = "Enter valid waist and hip values.";
      const whr = (waist / hip).toFixed(2);
      resultText = `WHR: ${whr}`;
      break;

    case "whtr":
      if (!waist || !height) return resultDiv.textContent = "Enter valid waist and height.";
      const whtr = (waist / (height * 100)).toFixed(2);
      resultText = `WHtR: ${whtr}`;
      break;

    case "lbm":
      if (!weight || !height) return resultDiv.textContent = "Enter valid height and weight.";
      const lbm = userGender === "male"
        ? (0.407 * weight + 0.267 * (height * 100) - 19.2)
        : (0.252 * weight + 0.473 * (height * 100) - 48.3);
      resultText = `LBM: ${lbm.toFixed(2)} kg`;
      break;

    case "ibw":
      if (!height) return resultDiv.textContent = "Enter valid height.";
      const hInches = height * 39.3701;
      let ibw = userGender === "male"
        ? 50 + 2.3 * (hInches - 60)
        : 45.5 + 2.3 * (hInches - 60);
      if (hInches < 60) ibw = userGender === "male" ? 50 : 45.5;
      resultText = `IBW: ${ibw.toFixed(2)} kg`;
      break;
  }

  resultDiv.textContent = resultText;
});

function updateInputs() {
  const type = document.getElementById("calculator-type").value;
  const inputArea = document.getElementById("input-fields");

  const html = {
    bmi: `<input type="number" id="weight" placeholder="Weight (kg)" />
          <input type="number" id="height" placeholder="Height (cm)" />`,
    bmr: `<input type="number" id="weight" placeholder="Weight (kg)" />
          <input type="number" id="height" placeholder="Height (cm)" />`,
    whr: `<input type="number" id="waist" placeholder="Waist (cm)" />
          <input type="number" id="hip" placeholder="Hip (cm)" />`,
    whtr: `<input type="number" id="waist" placeholder="Waist (cm)" />
           <input type="number" id="height" placeholder="Height (cm)" />`,
    lbm: `<input type="number" id="weight" placeholder="Weight (kg)" />
          <input type="number" id="height" placeholder="Height (cm)" />`,
    ibw: `<input type="number" id="height" placeholder="Height (cm)" />`
  };

  inputArea.innerHTML = html[type] || '';
}
