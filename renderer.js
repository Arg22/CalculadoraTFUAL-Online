document.addEventListener('DOMContentLoaded', () => {
  const showDiv = document.getElementById('showDiv');
  const hideDiv = document.getElementById('hideDiv');
  const toggleDiv = document.getElementById('carsDiv');
  
  showDiv.addEventListener('change', () => {
    toggleDiv.style.display = 'flex';
  });
  
  hideDiv.addEventListener('change', () => {
    toggleDiv.style.display = 'none';
  });
});

function calculate() {
  const TUNA_PERCENT = 0.15;
  const KM_PERCENT = 0.25;
  const VETERAN_POINTS = 4;
  const JACKET_POINTS = 3;
  const PANT_POINTS = 2;
  const COSTUME_POINTS = 1.5;
  
  let resultTuna = 0, resultCars = 0, resultVeterans = 0, resultJackets = 0, resultPants = 0, resultCostumes = 0, finalResult = 0, totalCents = 0;
  let total = document.getElementById('total').value;
  let hasCars = document.querySelector('input[name="cars"]:checked').value;
  let cars = document.getElementById('cars').value;
  let km = document.getElementById('km').value;
  let veterans = document.getElementById('veterans').value;
  let jackets = document.getElementById('jackets').value;
  let pants = document.getElementById('pants').value;
  let costumes = document.getElementById('costumes').value;
  let totalPoints = (veterans * VETERAN_POINTS) + (jackets * JACKET_POINTS) + (pants * PANT_POINTS) + (costumes * COSTUME_POINTS);
  let hasCostumes = costumes !== "0" && costumes !== "";
  let hasPants = pants !== "0" && pants !== "";
  let hasJackets = jackets !== "0" && jackets !== "";
  
  if (hasCars === "show") {
    resultCars = km * KM_PERCENT;
    document.getElementById('car-result').innerText = resultCars;
    document.getElementById("car-li").style.display = "list-item";
    total -= (resultCars * cars);
  } else {
    resultCars = 0;
    document.getElementById("car-li").style.display = "none";
  }
  resultTuna = total * TUNA_PERCENT;
  
  finalResult = roundPrice(resultTuna);
  resultTuna = finalResult.roundedValue;
  totalCents=Math.round(((totalCents+ finalResult.difference) + Number.EPSILON) * 100) / 100;
  total -= resultTuna;
  

  // Hay disfraces
  if (hasCostumes) {
    resultVeterans = updateResult("veteran",veterans,VETERAN_POINTS);
    resultJackets = updateResult("jacket",jackets,JACKET_POINTS);
    resultPants = updateResult("pant",pants,PANT_POINTS);

    resultCostumes = (total * COSTUME_POINTS) / totalPoints;
    finalResult = roundPrice(resultCostumes);
    resultCostumes = finalResult.roundedValue;
    totalCents += finalResult.difference * costumes;
    
    resultCostumes += (totalCents / costumes);
    resultCostumes = Math.round(resultCostumes * 100) / 100;
    
    let remainingTotal = total - ((resultVeterans * veterans) + (resultJackets * jackets) + (resultPants * pants) + (resultCostumes * costumes));
    let diff = Math.round(remainingTotal * 100) / 100;
    
    if (countDecimals(diff / costumes) < 3) {
      resultCostumes += (diff / costumes);
      resultCostumes = Math.round(resultCostumes * 100) / 100;
    } else {
      resultTuna = Math.round((resultTuna + diff) * 100) / 100;
    }
  
    document.getElementById('tuna-result').innerText = resultTuna;
    document.getElementById("total-result").innerText = Math.round(((resultTuna + (resultCars * cars) + (resultVeterans * veterans) + (resultJackets * jackets) + (resultPants * pants) + (resultCostumes * costumes)) + Number.EPSILON) * 100) / 100;
    document.getElementById('costume-result').innerText = resultCostumes;
    document.getElementById("costume-li").style.display = "list-item";
  } else if (hasPants) {
    resultVeterans = updateResult("veteran",veterans,VETERAN_POINTS);
    resultJackets = updateResult("jacket",jackets,JACKET_POINTS);
    resultCostumes = updateResult("costume",costumes,COSTUME_POINTS);

    resultPants = (total * PANT_POINTS) / totalPoints;
    finalResult = roundPrice(resultPants);
    resultPants = finalResult.roundedValue;
    totalCents += finalResult.difference * pants;
    
    resultPants += (totalCents / pants);
    resultPants = Math.round(resultPants * 100) / 100;
    
    let remainingTotal = total - ((resultVeterans * veterans) + (resultJackets * jackets) + (resultPants * pants));
    let diff = Math.round(remainingTotal * 100) / 100;
    
    if (countDecimals(diff / pants) < 3) {
      resultPants += (diff / pants);
      resultPants = Math.round(resultPants * 100) / 100;
    } else {
      resultTuna = Math.round((resultTuna + diff) * 100) / 100;
    }
  
    document.getElementById('tuna-result').innerText = resultTuna;
    document.getElementById("total-result").innerText = Math.round(((resultTuna + (resultCars * cars) + (resultVeterans * veterans) + (resultJackets * jackets) + (resultPants * pants)) + Number.EPSILON) * 100) / 100;
    document.getElementById('pant-result').innerText = resultPants;
    document.getElementById("pant-li").style.display = "list-item";
  } else if (hasJackets) {
    resultVeterans = updateResult("veteran",veterans,VETERAN_POINTS);
    resultPants = updateResult("pant",pants,PANT_POINTS);
    resultCostumes = updateResult("costume",costumes,COSTUME_POINTS);

    resultJackets = (total * JACKET_POINTS) / totalPoints;
    finalResult = roundPrice(resultJackets);
    resultJackets = finalResult.roundedValue;
    totalCents += finalResult.difference * jackets;
    
    resultJackets += (totalCents / jackets);
    resultJackets = Math.round(resultJackets * 100) / 100;
    
    let remainingTotal = total - ((resultVeterans * veterans) + (resultJackets * jackets));
    let diff = Math.round(remainingTotal * 100) / 100;
    
    if (countDecimals(diff / jackets) < 3) {
      resultJackets += (diff / jackets);
      resultJackets = Math.round(resultJackets * 100) / 100;
    } else {
      resultTuna = Math.round((resultTuna + diff) * 100) / 100;
    }
  
    document.getElementById('tuna-result').innerText = resultTuna;
    document.getElementById("total-result").innerText = Math.round(((resultTuna + (resultCars * cars) + (resultVeterans * veterans) + (resultJackets * jackets)) + Number.EPSILON) * 100) / 100;
    document.getElementById('jacket-result').innerText = resultJackets;
    document.getElementById("jacket-li").style.display = "list-item";
  } else{
    resultVeterans = updateResult("veteran",veterans,VETERAN_POINTS);
    resultJackets = updateResult("jacket",jackets,JACKET_POINTS);
    resultPants = updateResult("pant",pants,PANT_POINTS);
    resultCostumes = updateResult("costume",costumes,COSTUME_POINTS);

    let remainingTotal = total - ((resultVeterans * veterans) + (resultJackets * jackets) + (resultPants * pants) + (resultCostumes * costumes));
    
    let diff = Math.round(remainingTotal * 100) / 100;
    resultTuna = Math.round((resultTuna + diff) * 100) / 100;
    
    document.getElementById("costume-li").style.display = "none";
    document.getElementById('tuna-result').innerText = resultTuna;
    document.getElementById("total-result").innerText = Math.round(((resultTuna + (resultCars * cars) + (resultVeterans * veterans) + (resultJackets * jackets) + (resultPants * pants) + (resultCostumes * costumes)) + Number.EPSILON) * 100) / 100;
    
  } 
  

  //Functions
  
  function updateResult(id, value, points) {
    if (value !== 0 && value !== "") {
      let result = (total * points) / totalPoints;
      if(hasCostumes || hasPants || hasJackets){
        finalResult = saveCents(result);
      }else{
        finalResult = roundPrice(result);
      }
      result = finalResult.roundedValue;
      totalCents += finalResult.difference * value;
      document.getElementById(`${id}-result`).innerText = result;
      document.getElementById(`${id}-li`).style.display = "list-item";
      return result;
    } else {
      document.getElementById(`${id}-li`).style.display = "none";
      return 0;
    }
  }
  
  function saveCents(value) {
    let roundedValue = Math.floor(value * 2) / 2;
    let difference = value - roundedValue;
    return {
      roundedValue: roundedValue,
      difference: difference
    };
  }
  
  function roundPrice(value) {
    let valueString = value.toString();
    let decimalIndex = valueString.indexOf('.');
    let hasMoreThanTwoDecimals = decimalIndex !== -1 && valueString.length - decimalIndex - 1 > 2;
    if (!hasMoreThanTwoDecimals) {
      return {
        roundedValue: value,
        difference: 0
      };
    }
    
    let roundedValue = Math.floor(value * 100) / 100;
    let difference = value - roundedValue;
    
    return {
      roundedValue: roundedValue,
      difference: difference
    };
  }
  
  function countDecimals(number) {
    let numberString = number.toString();
    let decimalIndex = numberString.indexOf('.');
    
    if (decimalIndex === -1) {
      return 0;
    }
    
    let decimals = numberString.length - decimalIndex - 1;
    
    return decimals;
  }
}