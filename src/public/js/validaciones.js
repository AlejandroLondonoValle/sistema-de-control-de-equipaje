document.addEventListener("DOMContentLoaded", () => {

    const formulario = document.getElementById("formEquipaje")

    formulario.addEventListener("submit", async function (e) {

        e.preventDefault()

        const codigoVuelo = document.getElementById("codigoVuelo").value.trim().toUpperCase()
        const idPasajero = document.getElementById("idPasajero").value.trim()
        const maletasInput = document.getElementById("maletas").value.trim()

        if (!codigoVuelo || !idPasajero || !maletasInput) {

            Swal.fire({
                icon: "error",
                title: "Campos incompletos",
                text: "Todos los campos son obligatorios"
            })

            return
        }

        if (!/^[A-Z]{2}\d+$/.test(codigoVuelo)) {

            Swal.fire({
                icon: "error",
                title: "Código de vuelo inválido",
                text: "Formato correcto: AV123"
            })

            return
        }

        const maletas = maletasInput.split(",").map(x => parseFloat(x.trim()))

        for (let peso of maletas) {

            if (isNaN(peso) || peso <= 0) {

                Swal.fire({
                    icon: "error",
                    title: "Peso inválido"
                })

                return
            }

        }

        try {

            const response = await fetch("/registro", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    codigoVuelo,
                    idPasajero,
                    maletas: maletasInput
                })
            })

            const data = await response.json()

            if (data.error) {

                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: data.error
                })

                return
            }

            Swal.fire({
                icon: "success",
                title: "Equipaje registrado ✈️",
                html: `
    <b>Pasajero:</b> ${data.pasajero}<br>
    <b>Correo:</b> ${data.correo}<br>
    <b>Maletas:</b> ${data.maletas}<br>
    <b>Peso total:</b> ${data.pesoTotal} kg
    `
            }).then(() => {

                window.location.href = "/vuelos"

            })

            formulario.reset()

        } catch (error) {

            Swal.fire({
                icon: "error",
                title: "Error del servidor",
                text: "No se pudo conectar con el servidor"
            })

        }

    })

})