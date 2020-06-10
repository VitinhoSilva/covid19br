var confirmados = [], confirmados_uf = [], confirmados_casos = [], obitos = [], obitos_uf = [], obitos_casos = [], suspeitos = [], suspeitos_uf = [], suspeitos_casos = [], recuperado, confirmado, ativo, suspeito;

function carregaDados() {
    $.ajax({
        url: 'https://covid19-brazil-api.now.sh/api/report/v1',
        type: 'GET',
        contentType: 'application/json',
        success: function (result) {
            for (let i = 0; i < result.data.length; i++) {
                confirmados.push([result.data[i].uf, result.data[i].cases]);
                obitos.push([result.data[i].uf, result.data[i].deaths]);
                suspeitos.push([result.data[i].uf, result.data[i].suspects]);
            }

            confirmados.sort();
            suspeitos.sort();
            obitos.sort();

            for (let i = 0; i < confirmados.length; i++) {
                confirmados_uf.push(confirmados[i][0]);
                confirmados_casos.push(confirmados[i][1]);
            }

            for (let i = 0; i < suspeitos.length; i++) {
                suspeitos_uf.push(suspeitos[i][0]);
                suspeitos_casos.push(suspeitos[i][1]);
            }

            for (let i = 0; i < obitos.length; i++) {
                obitos_uf.push(obitos[i][0]);
                obitos_casos.push(obitos[i][1]);
            }

        }, error: function (error) {
            console.error('ERRO AO CARREGAR DADOS EM https://covid19-brazil-api.now.sh/api/report/v1');
            console.error('ERRO: ', error);
        },
        async: false
    });
}

function carregaDadosGeralBr() {
    $.ajax({
        url: 'https://covid19-brazil-api.now.sh/api/report/v1/brazil',
        type: 'GET',
        contentType: 'application/json',
        success: function (result) {
            if (result.data.cases) {
                ativo = result.data.cases;
            }

            if (result.data.confirmed) {
                confirmado = result.data.confirmed;
            }

            if (result.data.recovered) {
                recuperado = result.data.recovered;
            }

            if (result.data.deaths) {
                suspeito = result.data.deaths;
            }


        }, error: function (error) {
            console.error('ERRO AO CARREGAR DADOS EM https://covid19-brazil-api.now.sh/api/report/v1/brazil');
            console.error('ERRO: ', error);
        },
        async: false
    });
}

function carregaGraficoConfirmadoUf() {
    let ctx = document.getElementById('graficoConfirmadoUf').getContext('2d');
    let config = {
        type: 'line',
        data: {
            labels: confirmados_uf,
            datasets: [{
                label: 'UF',
                backgroundColor: '#1C1C1C',
                borderColor: '#1C1C1C',
                data: confirmados_casos,
                fill: false,
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'CONFIRMADOS'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
        }
    };

    window.onload = function () {
        window.myLine = new Chart(ctx, config);
    };
}

function carregaGraficoSuspeitoUf() {
    let ctx = document.getElementById('graficoSuspeitoUf').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: suspeitos_uf,
            datasets: [{
                label: 'UF',
                data: suspeitos_casos,
                backgroundColor: '#D2691E',
                borderColor: '#D2691E',
                fill: false
               
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'SUSPEITOS'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
        }
    });
}

function carregaGraficoObitoUf() {
    let ctx = document.getElementById('graficoObitoUf').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: obitos_uf,
            datasets: [{
                label: 'UF',
                data: obitos_casos,
                backgroundColor: '#800000',
                borderColor: '#800000',
                fill: false
               
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'ÓBITOS'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
        }
        
    });
}
