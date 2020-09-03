var url            = window.location.href;
var swLocation     = '/covid-monitor/sw.js';
//var urlCovid_ER = `https://gist.githubusercontent.com/Cuchu/95bc6f743842f1315f716627f2610d4c/raw/covid-19-arg.csv`;
var urlCovid_ER    = `https://gist.githubusercontent.com/ottino/d67d6fd9f823192c50173e824f774b54/raw/261299046f96475a00e9d032ca97cab3266e40f4/basecovidarg.csv`;
var urlCovidMinSa  = `/covid-monitor/minsaer_db.json`;
// Verificar si podemos usar Service Workers
if (navigator.serviceWorker) {

        if ( url.includes('127.0') )
        {
                swLocation  = '/sw.js';
                urlCovid_ER = `/data.csv`;
                urlCovidMinSa = `/minsaer_db.json`;
                console.log('Trabajando en el localhost!');
        }

        // registramos el SW
        navigator.serviceWorker.register( swLocation )
            .then ( registro => {
                    console.log('SW Ok!');
            });
};

let _fecha = ( param_dias = 1 ) => {

        let fecha = new Date();
        fecha.setDate(fecha.getDate() - param_dias);

        let mes = fecha.getMonth()+1 < 10
                  ?  "0".concat(fecha.getMonth()+1)
                  : fecha.getMonth()+1 , 

            dia = fecha.getDate(), 
            ano = fecha.getFullYear(); 

        return dia + "/" + mes + "/" + ano;

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

fecha_completa          = _fecha(1);
fecha_completa_ayer     = _fecha(2);

let totalER = 0;

console.log({ fecha_completa });
Papa.parse( urlCovid_ER , {
	download: true,
	step: function(row) {

                totalER += row.data[4] == "Entre Ríos"
                           ? Number(row.data[7])
                           : 0;

                divTableroProvinciaHoy.innerHTML =
                `
                <div class="card-body carta_ultrep">
                <h5 class="card-title"> ${ fecha_completa }</h5>
                <p class="card-text">
                        Todavia no se procesaron los datos
                </p>
                </div>
                `;

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
                          <h5 class="card-title"> ${ fecha_completa }</h5>
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

fetch( urlCovidMinSa )
        .then(resp => resp.json())
        .then(resp => {
                imgProvincia.src = resp[0][_fecha(0)]["img"];

        }).catch(()=> {

                // imgProvincia.src = "";

        });
