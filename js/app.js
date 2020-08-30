// Verificar si podemos usar Service Workers
if (navigator.serviceWorker) {

        // registramos el SW
        navigator.serviceWorker.register('/sw.js')
            .then ( registro => {
                    console.log('SW Ok!');
            });
};

const urlCovid_hoy            = `https://disease.sh/v3/covid-19/countries/ARG?yesterday=true&twoDaysAgo=true&strict=true&allowNull=true`;
const divTableroPais          = document.querySelector('#tableroPais');
const divTableroProvinciaHoy  = document.querySelector('#provincia_hoy');
const divTableroProvinciaAyer = document.querySelector('#provincia_ayer');
const imgProvincia            = document.querySelector('#img_prov');

// Tablero -> Pais
fetch( urlCovid_hoy )
        .then( resp => resp.json() )
        .then( resp => {

                const { todayCases , 
                        todayDeaths , 
                        active , 
                        cases , 
                        deaths , 
                        recovered , 
                        tests , 
                        updated ,
                        casesPerOneMillion ,
                        deathsPerOneMillion ,
                        testsPerOneMillion } = resp;

                divTableroPais.innerHTML = 
                `
                <div class="card">
                 <div class="card-body carta_ultrep">
                  <h5 class="card-title">Ultimo reporte</h5>
                  <p class="card-text">
                        Contagiados: ${ todayCases.toLocaleString() } <br>
                        Fallecidos: ${ todayDeaths.toLocaleString() } <br>
                        Test. Acum.: ${ tests.toLocaleString() } <br>
                  </p>
                 </div>
                </div>

                <div class="card carta_acumulado">
                 <div class="card-body">
                  <h5 class="card-title">Acumulado</h5>
                  <p class="card-text">
                        Contagiados: ${ cases.toLocaleString() } <br>
                        Fallecidos: ${ deaths.toLocaleString() } <br>
                        Recuperados: ${ recovered.toLocaleString() }
                  </p>
                 </div>
                </div>

                <div class="card carta_millon">
                 <div class="card-body">
                  <h5 class="card-title">Por millon</h5>
                  <p class="card-text">
                        Contagiados: ${ casesPerOneMillion.toLocaleString() } <br>
                        Fallecidos: ${ deathsPerOneMillion.toLocaleString() } <br>
                        Testeos: ${ testsPerOneMillion.toLocaleString() }
                  </p>
                 </div>
                </div>
                `;

        });

let fecha = new Date();

// ayer
fecha.setDate(fecha.getDate() - 1);

let mes = fecha.getMonth()+1 < 10
          ?  "0".concat(fecha.getMonth()+1)
          : fecha.getMonth()+1 ; //obteniendo mes

let dia = fecha.getDate(); //obteniendo dia
let ano = fecha.getFullYear(); //obteniendo a

fecha_completa = dia + "/" + mes + "/" + ano;
fecha_completa_ayer = "27" + "/" + mes + "/" + ano;
let totalER = 0;

console.log({ fecha_completa });
Papa.parse('/data.csv', {
	download: true,
	step: function(row) {

                totalER += row.data[4] == "Entre Ríos"
                           ? Number(row.data[7])
                           : 0;

                if ( row.data[4] == "Entre Ríos" && row.data[0] == fecha_completa )
                {
                       [fecha,dia_inicio,dia_cuarentena_dnu260,
                        osm_admin_level_2,osm_admin_level_4,
                        osm_admin_level_8,tot_casosconf,
                        nue_casosconf_diff,tot_fallecidos,
                        nue_fallecidos_diff,tot_recuperados,
                        tot_terapia,test_RT_PCR_negativos,
                        test_RT_PCR_total,transmision_tipo,
                        informe_tipo,informe_link,
                        observacion,covid19argentina_admin_level_4] = row.data;

                        divTableroProvinciaHoy.innerHTML =
                        `
                         <div class="card-body carta_ultrep">
                          <h5 class="card-title"> ${ fecha }</h5>
                          <p class="card-text">
                                Contagiados: ${ nue_casosconf_diff } <br>
                                Fallecidos: ${ nue_fallecidos_diff } <br>
                                Test. Acum.: ${ totalER } <br>
                          </p>
                         </div>
                        `;
                } else if ( row.data[4] == "Entre Ríos" && row.data[0] == fecha_completa_ayer )
                {
                       [fecha,dia_inicio,dia_cuarentena_dnu260,
                        osm_admin_level_2,osm_admin_level_4,
                        osm_admin_level_8,tot_casosconf,
                        nue_casosconf_diff,tot_fallecidos,
                        nue_fallecidos_diff,tot_recuperados,
                        tot_terapia,test_RT_PCR_negativos,
                        test_RT_PCR_total,transmision_tipo,
                        informe_tipo,informe_link,
                        observacion,covid19argentina_admin_level_4] = row.data;

                        divTableroProvinciaAyer.innerHTML =
                        `
                         <div class="card-body carta_ultrep">
                          <h5 class="card-title"> ${ fecha }</h5>
                          <p class="card-text">
                                Contagiados: ${ nue_casosconf_diff } <br>
                                Fallecidos: ${ nue_fallecidos_diff } <br>
                          </p>
                         </div>
                        `;
                }



	},
	complete: function() {}
});

fetch('/minsaer_db.json')
        .then(resp => resp.json())
        .then(resp => {

                imgProvincia.src = resp[0]["20200828"]["img"];

        });
