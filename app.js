const express = require("express")
const path = require("path")
const port = 3000;
const registros = []
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static(path.join(__dirname, "src/public")));

// Arreglos con los vuelo y pasajeros ya definidos
const vuelos = ["AV123", "LA456", "IB789"]
const pasajeros = [
    {
        id: 101,
        nombre: "Carlos Ramírez",
        correo: "carlos.ramirez@email.com"
    },
    {
        id: 202,
        nombre: "Laura Gómez",
        correo: "laura.gomez@email.com"
    },
    {
        id: 303,
        nombre: "Andrés Martínez",
        correo: "andres@email.com"
    },
    {
        id: 404,
        nombre: "Sofía Torres",
        correo: "sofia@email.com"
    }
]


// ----------- Rutas ----------------

// ..... Ruta Principal .....
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "src/views/index.html"))
})


// ..... Ruta Get de Registros .....
// Redirige a la pagina de registro
app.get("/registro", (req, res) => {
    res.sendFile(path.join(__dirname, "src/views/registro.html"))
})


// ..... Ruta Post de Registros .....
// Recibe los datos del formulario, los valida y los guarda en una constante llamada registro
app.post("/registro", (req, res) => {

    const { codigoVuelo, idPasajero, maletas } = req.body

    if (!vuelos.includes(codigoVuelo)) {
        return res.json({ error: "Vuelo no encontrado" })
    }

    const pasajero = pasajeros.find(p => p.id === Number(idPasajero))

    if (!pasajero) {
        return res.json({ error: "Pasajero no existe" })
    }

    const pesos = maletas.split(",").map(x => parseFloat(x.trim()))

    if (pesos.length > 5) {
        return res.json({ error: "Máximo 5 maletas permitidas" })
    }

    for (let peso of pesos) {

        if (isNaN(peso) || peso <= 0) {
            return res.json({ error: "Peso inválido" })
        }

        if (peso > 32) {
            return res.json({ error: "Una maleta excede 32kg" })
        }

    }

    const pesoTotal = pesos.reduce((total, p) => total + p, 0)

    const registro = {
        pasajero: pasajero.nombre,
        correo: pasajero.correo,
        vuelo: codigoVuelo,
        maletas: pesos.length,
        pesoTotal: pesoTotal.toFixed(2)
    }

    registros.push(registro)

    res.json({
        success: true,
        pasajero: pasajero.nombre,
        correo: pasajero.correo,
        vuelo: codigoVuelo,
        maletas: pesos.length,
        pesoTotal: pesoTotal.toFixed(2)
    })

})


// ..... Ruta Get de Informacion de vuelos .....
app.get("/vuelos", (req, res) => {

    // Kilos gratuitos por pasajero
    const FRANQUICIA = 15
    // Tarifa por kilo excedido
    const TARIFA_EXCESO = 8000

    // Se inicializan las variables sin valor
    let totalMaletas = 0
    let pesoTotalVuelo = 0
    let pasajerosConExceso = 0
    let recaudacionTotal = 0

    // Se recorre el arreglo de registros y se calcula el total de maletas, el peso total del vuelo, el numero de pasajeros con exceso y la recaudacion total
    let filas = registros.map(r => {

        const peso = Number(r.pesoTotal)

        // Este metodo se usa para calcular el peso excedido, se pasan dos numeros en sus parametros (0, (peso excedido)), Si sí hay exceso, devuelve el exceso. Si no hay exceso, devuelve 0.
        const exceso = Math.max(0, peso - FRANQUICIA)
        const costo = exceso * TARIFA_EXCESO

        totalMaletas += r.maletas
        pesoTotalVuelo += peso

        if (exceso > 0) pasajerosConExceso++

        recaudacionTotal += costo

        return `
        <tr class="hover:bg-gray-50">
            <td class="px-6 py-4 font-medium text-gray-900">${r.pasajero}</td>
            <td class="px-6 py-4">${r.maletas}</td>
            <td class="px-6 py-4">${peso} kg</td>
            <td class="px-6 py-4">${exceso.toFixed(2)} kg</td>
            <td class="px-6 py-4">$ ${costo.toLocaleString("es-CO")}</td>
        </tr>
        `
    }).join("")


    res.send(`
    <!DOCTYPE html>
    <html lang="es">

    <head>
        <meta charset="UTF-8">
        <title>Registros de Equipaje</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="shortcut icon" href="/images/agenda (1).svg" type="image/x-icon">

    </head>

    <body class="bg-gray-100 min-h-screen">

    <div class="max-w-6xl mx-auto mt-10">

        <h1 class="text-3xl font-bold text-gray-800 mb-6">
        Control de Equipaje ✈️
        </h1>

        <div class="bg-white shadow-lg rounded-xl overflow-hidden">

            <div class="px-6 py-4 border-b bg-gray-50">
                <h2 class="text-lg font-semibold text-gray-700">
                Registro de Pasajeros
                </h2>
            </div>

            <div class="overflow-x-auto">

                <table class="min-w-full text-sm text-left text-gray-600">

                    <thead class="bg-gray-100 text-gray-700 uppercase text-xs">

                        <tr>
                            <th class="px-6 py-3">Pasajero</th>
                            <th class="px-6 py-3">Maletas</th>
                            <th class="px-6 py-3">Peso total</th>
                            <th class="px-6 py-3">Exceso</th>
                            <th class="px-6 py-3">Costo</th>
                        </tr>

                    </thead>

                    <tbody class="divide-y">

                        ${filas}

                    </tbody>

                </table>

            </div>

        </div>


        <!-- RESUMEN DEL VUELO -->

        <div class="mt-8 bg-white shadow-lg rounded-xl p-6">

            <h2 class="text-xl font-semibold mb-4">
            Resumen del Vuelo
            </h2>

            <div class="grid grid-cols-2 gap-4 text-gray-700">

                <p><b>Total de maletas:</b> ${totalMaletas}</p>

                <p><b>Peso total del vuelo:</b> ${pesoTotalVuelo.toFixed(2)} kg</p>

                <p><b>Pasajeros con exceso:</b> ${pasajerosConExceso}</p>

                <p><b>Recaudación total:</b> $ ${recaudacionTotal.toLocaleString("es-CO")}</p>

            </div>

        </div>

    </div>

    </body>
    </html>
    `)

})



app.listen(port, () => {
    console.log(`Servidor Corriendo en http://localhost:${port}`)
});