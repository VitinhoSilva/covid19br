var dados,  estados_casos = [], estados_ordenado = [], casos_ordenado = [], recuperados, confirmados, ativos, obitos;

function carregaDados() {
    $.ajax({
        url: 'https://covid19-brazil-api.now.sh/api/report/v1',
        type: 'GET',
        contentType: 'application/json',
        success: function (result) {
            for (let i = 0; i < result.data.length; i++) {
                estados_casos.push([result.data[i].uf, result.data[i].cases]);
            }

            estados_casos.sort();

            for (let i = 0; i < estados_casos.length; i++) {
                estados_ordenado.push(estados_casos[i][0]);
                casos_ordenado.push(estados_casos[i][1]);
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
                    ativos = result.data.cases;
                }

                if (result.data.confirmed) {
                    confirmados = result.data.confirmed;
                }

                if (result.data.recovered) {
                    recuperados = result.data.recovered;
                }

                if (result.data.deaths) {
                    obitos = result.data.deaths;
                }

        }, error: function (error) {
            console.error('ERRO AO CARREGAR DADOS EM https://covid19-brazil-api.now.sh/api/report/v1/brazil');
            console.error('ERRO: ', error);
        },
        async: false
    });
}

function carregaGraficoUf() {
    let ctx = document.getElementById('graficoUfLinha').getContext('2d');
    let config = {
        type: 'line',
        data: {
            labels: estados_ordenado,
            datasets: [{
                label: 'Casos por UF',
                backgroundColor: '#1C1C1C',
                borderColor: '#1C1C1C',
                data: casos_ordenado,
                fill: false,
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'COVID-19'
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

    let ctx2 = document.getElementById('graficoUfPizza').getContext('2d');
    let config2 = {
        type: 'doughnut',
        //type: 'pie',
        data: {
            labels: estados_ordenado,
            datasets: [{
                data: casos_ordenado,
                borderColor: '#ffffff',
                    backgroundColor: [
                    '#363636',
                    '#191970',
                    '#4169E1',
                    '#008080',
                    '#008000',
                    '#BDB76B',
                    '#DAA520',
                    '#FF4500',
                    '#A0522D',
                    '#4B0082',
                    '#FF00FF',
                    '#FF0000',
                    '#FFD700',
                    '#D8BFD8',
                    '#4682B4',
                    '#48D1CC',
                    '#98FB98',
                    '#3CB371',
                    '#B8860B',
                    '#BC8F8F',
                    '#CD853F',
                    '#FFDEAD',
                    '#7B68EE',
                    '#9932CC',
                    '#A52A2A',
                    '#FFD700',
                    '#B0E0E6'
                ],
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Casos por UF'
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

    window.onload = function() {
        window.myLine = new Chart(ctx, config);
        window.myPie = new Chart(ctx2, config2);
    };

}