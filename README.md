# ✈️ Sistema de Registro de Equipaje de Vuelos

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Express](https://img.shields.io/badge/Express.js-Backend-black)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-UI-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
![Status](https://img.shields.io/badge/Status-Academic%20Project-orange)

Aplicación web desarrollada con **Node.js y Express** que permite registrar el equipaje de pasajeros en vuelos, calcular automáticamente el **peso total**, detectar **exceso de equipaje**, calcular **costos adicionales** y generar un **resumen consolidado por vuelo**.

La aplicación utiliza **Tailwind CSS** para la interfaz y **SweetAlert2** para notificaciones visuales.

---

# 📑 Tabla de Contenidos

* [Descripción](#-descripción)
* [Características](#-características)
* [Reglas de negocio](#-reglas-de-negocio)
* [Arquitectura del sistema](#-arquitectura-del-sistema)
* [Capturas del proyecto](#-capturas-del-proyecto)
* [Estructura del proyecto](#-estructura-del-proyecto)
* [Instalación](#-instalación)
* [Flujo de funcionamiento](#-flujo-de-funcionamiento)
* [Validaciones](#-validaciones)
* [Roadmap](#-roadmap)
* [Autor](#-autor)

---

# 📌 Descripción

Este sistema permite registrar pasajeros y su equipaje para un vuelo determinado.
A partir de los pesos ingresados de cada maleta, el servidor calcula:

* Peso total del equipaje
* Exceso sobre la franquicia permitida
* Costo adicional por exceso

Además, genera un **resumen general del vuelo** que incluye estadísticas del equipaje registrado.

---

# 🚀 Características

✔ Registro de pasajeros y equipaje
✔ Cálculo automático de peso total
✔ Detección de exceso de equipaje
✔ Cálculo de costos adicionales
✔ Tabla dinámica de resultados
✔ Resumen del vuelo
✔ Alertas interactivas con SweetAlert2
✔ Interfaz moderna con Tailwind CSS

---

# 🧮 Reglas de negocio

El sistema aplica las siguientes políticas de equipaje:

| Concepto            | Valor                  |
| ------------------- | ---------------------- |
| Franquicia gratuita | **15 kg por pasajero** |
| Tarifa por exceso   | **COP 8.000 por kg**   |

### Fórmulas

```
Peso total = suma de los pesos de todas las maletas

Exceso = peso total - 15 kg

Costo exceso = exceso * 8000
```

Si el peso total es menor o igual a 15 kg, **no hay costo adicional**.

---

# 🏗 Arquitectura del sistema

El proyecto sigue una arquitectura simple basada en **cliente-servidor**.

```
Usuario
   │
   ▼
Formulario HTML
   │
   ▼
Express Server (Node.js)
   │
   ├── Procesamiento de datos
   ├── Validación de información
   ├── Cálculo de equipaje
   │
   ▼
Renderizado dinámico de tabla
   │
   ▼
Página de resultados (/vuelos)
```

---

# 📸 Capturas del proyecto

## Formulario de registro

Aquí el usuario ingresa:

* nombre
* correo
* código de vuelo
* peso de maletas


![alt text](/src/public/images/image1.png "Formulario de registro")


---

## Tabla de resultados

La página de resultados muestra:

| Pasajero | Maletas | Peso Total | Exceso | Costo |
| -------- | ------- | ---------- | ------ | ----- |

Debajo se muestra el **resumen del vuelo**.


![alt text](/src/public/images/image.png "Tabla de resultados")


---

# 📂 Estructura del proyecto

```
registro-equipaje-vuelos
│
├── node_modules
│
├── src
│   │
│   ├── public
│   │   │
│   │   ├── images
│   │   │   ├── aeroplane-1.svg
│   │   │   ├── agenda (1).svg
│   │   │   └── file-pencil.svg
│   │   │
│   │   └── js
│   │       └── validaciones.js
│   │
│   └── views
│       ├── index.html
│       ├── registro.html
│       └── vuelos.html
│
├── .gitignore
├── app.js
├── package.json
├── package-lock.json
└── README.md
```

---

# ⚙️ Instalación

## 1️⃣ Clonar repositorio

```bash
git clone https://github.com/tu-usuario/registro-equipaje-vuelos.git
```

---

## 2️⃣ Entrar al proyecto

```bash
cd registro-equipaje-vuelos
```

---

## 3️⃣ Instalar dependencias

```bash
npm install
```

---

## 4️⃣ Ejecutar servidor

```bash
node app.js
```

Servidor disponible en:

```
http://localhost:3000
```

---

# 🔄 Flujo de funcionamiento

* 1️⃣ El usuario abre el formulario.
* 2️⃣ Ingresa la información del pasajero.
* 3️⃣ El servidor procesa los datos.
* 4️⃣ Se calcula peso total y exceso.
* 5️⃣ Se muestra alerta de éxito con SweetAlert2.
* 6️⃣ El usuario es redirigido a `/vuelos`.
* 7️⃣ Se renderiza la tabla con los registros.

---

# ⚠️ Validaciones

El sistema valida:

* Nombre obligatorio
* Correo válido
* Código de vuelo obligatorio
* Peso de maletas válido
* Manejo de errores y retorno al formulario

---

# 🗺 Roadmap (Mejoras futuras)

Posibles mejoras para futuras versiones:

* [ ] Implementar base de datos (MongoDB / MySQL)
* [ ] Crear API REST completa
* [ ] Autenticación de usuarios
* [ ] Historial de vuelos
* [ ] Dashboard administrativo
* [ ] Exportar reportes en PDF
* [ ] Visualización de estadísticas

---

# 👨‍💻 Autor

**Luis Alejandro Londoño Valle**

Estudiante de desarrollo de software enfocado en backend y tecnologías web.

---

💡 Proyecto desarrollado como práctica académica para fortalecer conocimientos en:

* Node.js
* Express
* Desarrollo web
* Lógica de negocio en backend

---

## ⭐ Si este proyecto te fue útil

Puedes darle **una estrella al repositorio** para apoyar el proyecto.

