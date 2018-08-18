'use strict';

let sListaBitacoras = obtenerBitacoras();
let asistente = [];
let cantAsistencias = [];
mostrarReporte();

const inputFechaInicial = document.querySelector('#txtFechaInicial');
const inputFechaFinal = document.querySelector('#txtFechaFinal');

// inputFechaInicial.addEventListener('change', function(){
//     mostrarReporte(inputFechaInicial.value)
// });

function mostrarReporte(fechaInicial){
    let sListaAsistentes = [];
    
    for(let i=0; i < sListaBitacoras.length; i++){
        let bAsignado = false;
        for(let k=0; k < sListaAsistentes.length; k++){ 
            if (sListaAsistentes[k] == sListaBitacoras[i]['asistente']){
                bAsignado = true;
            }
        }
        if(!bAsignado){
            sListaAsistentes.push(sListaBitacoras[i]['asistente']);
        }
    }
    for(let k=0; k < sListaAsistentes.length; k++){ 
        console.log(sListaAsistentes[k]);
    }

    for (let i=0; i < sListaAsistentes.length; i++){
        let nHorasTotales = 0;
        for(let j=0; j < sListaBitacoras.length; j++){
            if(sListaBitacoras[j]['estado'] == 'Aprobada'){
                if(sListaAsistentes[i] == sListaBitacoras[j]['asistente']){
                    for(let k=0; k < sListaBitacoras[j]['entradas'].length; k++){
                        nHorasTotales += Number(sListaBitacoras[j]['entradas'][k]['horas']);
                    }
                }
            }
        }
        cantAsistencias.push(nHorasTotales);
        asistente.push(sListaAsistentes[i]);
    }

    var ctx = document.getElementById("myChart");
    ctx.innerHTML = '';
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: asistente,
            datasets: [{
                label: '# de asistencias',
                data: cantAsistencias,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
};