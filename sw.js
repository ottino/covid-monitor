
// Instalacion del SW
self.addEventListener('install', event => {

    // Descarga de assets
    // Crear cache

    console.log('Instalando SW...');

    const instalacion = new Promise( (resolve, reject) => {

        setTimeout(() => {
            console.log('Instalaciones terminadas');
            resolve();
        },1);

    });

    event.waitUntil ( instalacion );

});


// Activacion del SW: toma el control de la aplicacion
self.addEventListener('activate', event => {

    console.log('SW Activo y listo para controlar la aplicacion! ');

    // Eliminar cache viejo


});

// FETCH: Manejo de peticiones http
self.addEventListener('fetch', event => {

    // Aplicar las estrategias del cache
    event.respondWith( fetch(event.request) );

});

// // SYNC: Recuparamos la conexion a internet
// self.addEventListener('sync', event => {

//     // console.log('Conexion a internet OK');


// });