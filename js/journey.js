const url = "http://localhost:8080/flights"
const url1 = "http://localhost:8080/flights/list"


const contenedor = document.querySelector('tbody')

let resultados = ''

const modalClientes = new bootstrap.Modal(document.getElementById('modalCliente'))
const formClientes = document.querySelector('form')
const idCliente = document.getElementById('id')
const nombreCliente = document.getElementById('nombre')
const claveCliente = document.getElementById('clave')

let opcion = ''
btnBuscarVuelo.addEventListener('click', (mostrar) => {
    id.value = ''
    origing.value = ''
    destination.value = ''
    price.value = ''
    id.disabled = false
    JourneyModel.show()
    opcion = 'crear'
})
const mostrar = (flights) => {
    JourneyModel.forEach(JourneyModel => {
        resultados += `<tr>
                        <td >${JourneyModel.id}</td>
                        <td >${JourneyModel.origin}</td>
                        <td >${JourneyModel.destination}</td>
                        <td >${JourneyModel.price}</td>
                        <td class="text-center" width="20%"><a class="btnEditar btn btn-primary">Editar</a><a class="btnBorrar btn btn-danger">Borrar</a></td>
                    </tr>`
    })

    contenedor.innerHTML = resultados
}

fetch(url)
    .then(response => response.json())
    .then(data => mostrar(data))
    .catch(error => console.log(error))

const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector))
            handler(e)
    })
}

on(document, 'click', '.btnBorrar', e => {
    const fila = e.target.parentNode.parentNode
    const id = fila.firstElementChild.innerHTML
    console.log(id)

    alertify.confirm("Desea eliminar el Cliente "+id,
        function () {
            fetch(url + id, {
                method: 'DELETE'
            })
                .then(() => location.reload())
        },
        function () {
            alertify.error('Cancel')
        });
})


let idForm = 0
on(document, 'click', '.btnEditar', e => {

    const fila = e.target.parentNode.parentNode
    
    idForm = fila.children[0].innerHTML
    const nombre = fila.children[1].innerHTML
    const clave = fila.children[2].innerHTML
    idCliente.value = idForm
    idCliente.disabled = true
    nombreCliente.value = nombre
    claveCliente.value = clave

    opcion = 'editar'
    modalClientes.show()
})

/formClientes.addEventListener('submit', (e) => {
    e.preventDefault()

        if (opcion == 'crear') {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_cliente: idCliente.value,
                    nombre_cliente: nombreCliente.value,
                    clave_cliente: claveCliente.value
                })
            })
                .then(response => response.json())
                .then(data => {
                    const nuevoCliente = []
                    nuevoCliente.push(data)
                    mostrar(nuevoCliente)
                })
        }
        if (opcion == 'editar') {

            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_cliente: idCliente.value,
                    nombre_cliente: nombreCliente.value,
                    clave_cliente: claveCliente.value
                })
            })
                .then(response => location.reload())

        }
        modalClientes.hide()
    
})



