// Verificar si podemos usar Service Workers
if (navigator.serviceWorker) {

        // registramos el SW
        navigator.serviceWorker.register('/sw.js')
            .then ( registro => {
                    console.log('SW Ok!');
            });
};

const urlCovid_hoy = `https://disease.sh/v3/covid-19/countries/ARG?yesterday=true&twoDaysAgo=true&strict=true&allowNull=true`;
const divTablero = document.querySelector('#tablero');

//divTablero.innerHTML = 

// `
// <div class="card">
//  <div class="card-body">
//   <h5 class="card-title">Card title</h5>
//   <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
//  </div>
//  <div class="card-footer">
//   <small class="text-muted">Last updated 3 mins ago</small>
//  </div>
// </div>
// `;




// Total de casos ahora
fetch( urlCovid_hoy )
        .then( resp => resp.json() )
        .then( resp => {

                const { todayCases , todayDeaths , active , cases , deaths , recovered , tests , updated } = resp;
                let fecha = new Date( updated );

                console.log( { todayCases , active , cases , deaths , recovered , tests , updated } );

                console.log( fecha );
                console.table( resp );

                divTablero.innerHTML = 
                `
                <div class="card">
                 <div class="card-body">
                  <h5 class="card-title">Datos actualizados a la fecha ${ fecha.getDate() }/${ fecha.getMonth()+1 } </h5>
                  <p class="card-text">
                        Contagiados: ${ todayCases } <br>
                        Fallecidos: ${ todayDeaths }
                  </p>
                 </div>
                 <div class="card-footer">
                  <small class="text-muted">Last updated 3 mins ago</small>
                 </div>
                </div>

                <div class="card">
                 <div class="card-body">
                  <h5 class="card-title">Acumulado </h5>
                  <p class="card-text">
                        Contagiados: ${ cases } <br>
                        Fallecidos: ${ deaths } <br>
                        Recuperados: ${ recovered }
                  </p>
                 </div>
                 <div class="card-footer">
                  <small class="text-muted">Last updated 3 mins ago</small>
                 </div>
                </div>
                `;

        });


// let fecha = new Date();

// let mes = fecha.getMonth()+1; //obteniendo mes
// let dia = fecha.getDate(); //obteniendo dia
// let ano = fecha.getFullYear(); //obteniendo añ

// console.log('Fecha' , { mes , dia , ano });
                
// let dias = 5;
// let urlCovid     = `https://disease.sh/v3/covid-19/historical/ARG?lastdays=${ dias }`;
        
// Total de casos acumulado por dia 
// fetch( urlCovid )
//         .then( resp => resp.json() )
//         .then( resp => {

//                 console.log( resp );
//         } );


// var results = Papa.parse('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.csv');
// console.log(results);


// Papa.parse('/data.csv', {
// 	download: true,
// 	step: function(row) {
// 		console.log("Row:", row.data);
// 	},
// 	complete: function() {
// 		console.log("All done!");
// 	}
// });

// console.log();
