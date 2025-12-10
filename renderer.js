document.addEventListener('DOMContentLoaded', () => {
  const showDiv = document.getElementById('showDiv');
  const hideDiv = document.getElementById('hideDiv');
  const toggleDiv = document.getElementById('cochesDiv');
  
  showDiv.addEventListener('change', () => {
    toggleDiv.style.display = 'flex';
  });
  
  hideDiv.addEventListener('change', () => {
    toggleDiv.style.display = 'none';
  });
});

function calculate() {
  const KM_PERCENT = 0.25;
  const TUNA_PERCENT = 0.15;
  
  const totalIncial = parseFloat(document.getElementById('total').value);
  let total = totalIncial;
  let gasolina = 0;
  let gasolinaTotal = 0;
  const hayCoches = document.querySelector('input[name="coches"]:checked').value === "show";
  const coches = parseInt(document.getElementById('coches').value) || 0;
  const km = parseFloat(document.getElementById('km').value) || 0;

  const datos = {
    veteranas: parseInt(document.getElementById('veteranas').value) || 0,
    casacas: parseInt(document.getElementById('casacas').value) || 0,
    pantalones: parseInt(document.getElementById('pantalones').value) || 0,
    disfraces: parseInt(document.getElementById('disfraces').value) || 0,
  };

  const puntosTotales = getPuntosTotales(datos);

  // Calculamos gasolina para cada coche
  if (hayCoches && coches > 0 && km > 0) {
    gasolinaTotal = redondeoDecimales(coches * km * KM_PERCENT);
    gasolina = redondeoDecimales(km * KM_PERCENT);  // <- gasolina por coche
    total -= gasolinaTotal;
  }
  
  // Sacámos porcentaje de la Tuna
  const fondoTuna = redondeoDecimales(total * TUNA_PERCENT);
  total -= fondoTuna;

  // Calculamos por prendas
  const prendaCalculada = {};
  let centimosTotales = 0;

  const puntosPorPrenda = {
    veteranas: 4,
    casacas: 3,
    pantalones: 2,
    disfraces: 1.5
  };
  
  for (let prenda in datos) {
    if (datos[prenda] > 0) {
      const valorReal = getPrecioPorPrenda(puntosPorPrenda[prenda], puntosTotales, total);
      const valorRedondeado = redondeoCentimos(valorReal);
      const diferencia = (valorReal - valorRedondeado) * datos[prenda];
      centimosTotales += diferencia;
      prendaCalculada[prenda] = valorRedondeado;
    } else {
      prendaCalculada[prenda] = 0;
    }
  }

   // Repartimos los céntimos
   let bote = 0;
   let disfraces = datos.disfraces;
   if (disfraces > 0) {
    let centimosParaDisfraz = (disfraces === 1) ? redondeoDecimales(centimosTotales) : Math.floor((centimosTotales * 100) / disfraces) / 100;
    prendaCalculada.disfraces += centimosParaDisfraz;
  
    if (disfraces > 1) {
      let centimosRepartidos = centimosParaDisfraz * disfraces;
      bote = redondeoDecimales(centimosTotales - centimosRepartidos);

    }
  } else {
    bote = redondeoDecimales(centimosTotales);
  }
  

   // Calculamos los céntimos perdidos
   const descuadre = redondeoDecimales(totalIncial - (fondoTuna + gasolina + 
    (prendaCalculada.veteranas * datos.veteranas) +
    (prendaCalculada.casacas * datos.casacas) +
    (prendaCalculada.pantalones * datos.pantalones) +
    (prendaCalculada.disfraces * datos.disfraces) +
    bote));

    if (datos.disfraces > 0) {
      prendaCalculada.disfraces += descuadre;
    } else {
      bote += descuadre;
    }

    // Recalcular totalMostrado ya con descuadre aplicado
    const totalMostrado = redondeoDecimales(fondoTuna + gasolina +
      prendaCalculada.veteranas * datos.veteranas +
      prendaCalculada.casacas * datos.casacas +
      prendaCalculada.pantalones * datos.pantalones +
      prendaCalculada.disfraces * datos.disfraces +
      bote);

  // Mostrar resultados
  document.getElementById('tuna-result').innerText = fondoTuna;
  document.getElementById('coches-result').innerText = gasolina;
  document.getElementById('veteranas-result').innerText = redondeoDecimales(prendaCalculada.veteranas);
  document.getElementById('casacas-result').innerText = redondeoDecimales(prendaCalculada.casacas);
  document.getElementById('pantalones-result').innerText = redondeoDecimales(prendaCalculada.pantalones);
  document.getElementById('disfraces-result').innerText = redondeoDecimales(prendaCalculada.disfraces);
  document.getElementById('bote-result').innerText =  redondeoDecimales(bote);

  // Mostrar/ocultar líneas según cantidad
  ["veteranas", "casacas", "pantalones", "disfraces", "bote", "coches"].forEach(id => {
    let cantidad = id === "coches" ? gasolina : (id === "bote" ? bote : prendaCalculada[id] || 0);
    document.getElementById(`${id}-li`).style.display = cantidad > 0 ? "list-item" : "none";
  });

  document.getElementById('total-result').innerText =totalMostrado

  //Functiones
  function redondeoCentimos(precio) {
    return Math.floor(precio);
  }

  function redondeoDecimales(num) {
    return Number(num.toFixed(2));
  }
  
  function getPuntosTotales(datos) {
    return (datos.veteranas * 4) + (datos.casacas * 3) + (datos.pantalones * 2) + (datos.disfraces * 1.5);
  }
  
  function getPrecioPorPrenda(puntosPorPrenda, puntosTotales, precioTotal) {
    return (precioTotal * puntosPorPrenda) / puntosTotales;
  }
}