// Verificar si podemos usar Service Workers
if (navigator.serviceWorker) {

        // registramos el SW
        navigator.serviceWorker.register('/sw.js')
            .then ( registro => {
                    console.log('SW Ok!');
            });
};

// fetch('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.csv')
//         .then( resp => { 
//                 console.log(resp.body);
                
//         });


// var results = Papa.parse('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.csv');
// console.log(results);


Papa.parse('/data.csv', {
	download: true,
	step: function(row) {
		console.log("Row:", row.data);
	},
	complete: function() {
		console.log("All done!");
	}
});

// console.log();
