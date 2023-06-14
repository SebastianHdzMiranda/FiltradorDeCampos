// variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

// contenedor de resultados
const resultado = document.querySelector('#resultado');
const max = 2020 /*new Date().getFullYear(); //muestra el año actual */
const min = max - 10;

const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
}





// events
document.addEventListener('DOMContentLoaded', ()=>{
    mostrarAutos(autos);
    llenarSelect();
});
// eventos para llenar selects de busqueda
eventoSelect(marca, 'marca');
eventoSelect(year, 'year');
eventoSelect(minimo, 'minimo');
eventoSelect(maximo, 'maximo');
eventoSelect(puertas, 'puertas');
eventoSelect(transmision, 'transmision');
eventoSelect(color, 'color');

function eventoSelect(elemento, propiedad) {
    elemento.addEventListener('change', e =>{
        datosBusqueda[propiedad] = e.target.value;
        // console.log(datosBusqueda);
        filtrarAuto();
    });
}




// functions
function mostrarAutos(autos) {
    
    limpiarHTML();
    autos.forEach( auto =>{
        const {marca, modelo, year, precio, puertas, color, transmision} = auto;
        const autoHTML = document.createElement('p');
        autoHTML.textContent = `
        ${marca}
        ${modelo} -
            ${year} -
            ${puertas} puertas -
            transmision: ${transmision} -
            precio: $${precio} -
            color: ${color}
        `;
        resultado.appendChild(autoHTML);

    });
    
    // creando mensaje en caso de que no haya ningun auto
    const heading = document.querySelector('#resultado-heading');

    if (!resultado.firstChild) {
        heading.classList.add('redAlert');
        return heading.textContent = 'Sin Resultados'
    }
    heading.classList.remove('redAlert');
    heading.textContent = 'Resultados';
    
}

function llenarSelect() {
    for (let i = max; i >= min ; i--) {
        // console.log(i);
        const years = document.createElement('option');
        years.value = i;
        years.textContent = i;
        // console.log(years);

        year.appendChild(years);
    }
}

function filtrarAuto(){
    const resultado = autos.filter( filtrarMarca )
                            .filter( filtrarYear )
                            .filter( filtrarMinimo )
                            .filter( filtrarMaximo )
                            .filter( filtrarPuertas )
                            .filter( filtrarTransmision )
                            .filter( filtrarColor ); //funciones de alto nivel
    console.log(resultado);

    mostrarAutos(resultado);
}
function filtrarMarca(auto) {
    const {marca} = datosBusqueda;
    if (marca) {
       return auto.marca === marca;
    }
    return auto;
}
function filtrarYear(auto) {
    const {year} = datosBusqueda;
    if (year) {
       return auto.year  === parseInt(year);
    }
    return auto;
}
function filtrarMinimo(auto) {
    const {minimo} = datosBusqueda;
    if (minimo) {
       return auto.precio  >= minimo;
    }
    return auto;
}
function filtrarMaximo(auto) {
    const {maximo} = datosBusqueda;
    if (maximo) {
       return auto.precio  <= maximo;
    }
    return auto;
}
function filtrarPuertas(auto) {
    const {puertas} = datosBusqueda;
    if (puertas) {

        return auto.puertas === parseInt(puertas);

    }
    return auto;
}
function filtrarTransmision(auto) {
    const {transmision} = datosBusqueda;
    if (transmision) {

        return auto.transmision === transmision;

    }
    return auto;
}
function filtrarColor(auto) {
    const {color} = datosBusqueda;
    if (color) {

        return auto.color === color;

    }
    return auto;
}

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}