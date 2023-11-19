const url = 'https://655a7e5d6981238d054d87fc.mockapi.io/users/';
const inputBusqueda = document.getElementById('inputGet1Id');
const btnBuscar = document.getElementById('btnGet1');
const btnCrear = document.getElementById('btnPost');
const inputName = document.getElementById('inputPostNombre');
const inputLastName = document.getElementById('inputPostApellido');
const nombreModal = document.getElementById('inputNombreMod');
const apellidoModal = document.getElementById('inputApellidoMod');
const btnPut = document.getElementById('btnPut');
const btnGuardar = document.getElementById('btnGuardar');
const inputIdModificar = document.getElementById('inputPutId');
const modal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
const inputBorrar = document.getElementById('inputDelete');
const btnBorrar = document.getElementById('btnDelete');
let registroActual = {};

function buscarRegistro(busqueda) {
    fetch(url + busqueda)
        .then(response => {
            if (!response.ok) {
                throw new Error('Algo salió mal');
            }
            return response.json();
        })
        .then(data => {
            const result = document.getElementById('results');

            result.innerHTML = '';

            if (data) {
                const nombre = data.name;
                const apellido = data.lastname;
                const id = data.id;

                const nameItem = document.createElement('li');
                nameItem.textContent = `Nombre : ${nombre}`;
                result.appendChild(nameItem);

                const lastNameItem = document.createElement('li');
                lastNameItem.textContent = `Apellido : ${apellido}`;
                result.appendChild(lastNameItem);

                const idItem = document.createElement('li');
                idItem.textContent = `ID : ${id}`;
                result.appendChild(idItem);

                console.log(data);
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}

btnBuscar.addEventListener('click', () => {
    busqueda = inputBusqueda.value;
    buscarRegistro(busqueda);
});

btnBuscar.addEventListener('click',()=>{
    busqueda = inputBusqueda.value;
    buscarRegistro(busqueda);
})

function crearRegistro(){
    const nuevoRegistro ={
        name: inputName.value,
        lastname: inputLastName.value
    }

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoRegistro),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('No se pudo crear el registro');
        }
        return response.json();
    })
    .then(data => {
        console.log('Registro creado exitosamente:', data);
    })
    .catch(error => {
        console.error('Error al crear el registro:', error);
    });
}

btnCrear.addEventListener('click',()=>{
    crearRegistro()
})

btnPut.addEventListener('click', () => {
    const idModificar = inputIdModificar.value;

    fetch(url + idModificar)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo crear el registro');
            }
            return response.json();
        })
        .then(data => {
            registroActual = data;

            nombreModal.value = data.name;
            apellidoModal.value = data.lastname;

        })
        .catch(error => {
            console.error('Error al obtener el registro:', error);
        });
});

btnGuardar.addEventListener('click', () => {
    registroActual.name = nombreModal.value;
    registroActual.lastname = apellidoModal.value;

    modificarRegistro(registroActual);
});

modal._element.addEventListener('hidden.bs.modal', () => {
    nombreModal.value = '';
    apellidoModal.value = '';
    registroActual = {};
});

function modificarRegistro(registro) {
    const idModificar = inputIdModificar.value;

    fetch(url + idModificar, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(registro),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo modificar el registro');
            }
            return response.json();
        })
        .then(data => {
            console.log('Registro modificado:', data);
        })
        .catch(error => {
            console.error('No se pudo modificar el registro:', error);
        });
}

function borrarRegistro (){
    const idBorrar = inputBorrar.value

    fetch(url + idBorrar, {
        method: 'DELETE',
    })
        .then(response => {
            if(!response.ok){
                throw new Error('No se pudo borrar el registro')
            }
            console.log('Registro borrado');
        })
        .catch (error => {
            console.error('No se pudo borrar el registro:', error)
        })
}

btnBorrar.addEventListener('click',()=>{
    borrarRegistro();
})