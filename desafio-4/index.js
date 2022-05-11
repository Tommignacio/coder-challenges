const express = require("express");
const app = express();
const morgan = require("morgan");
const productsRoutes = require("./routes/route-products.js");

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(__dirname + "/public")); //dirname sirve para que si abro desde otro directoro, siempre encontrara la carpeta publica
app.use(express.urlencoded({ extended: true })); //sirve para leer los datos enviados por html formulario

//Rutas
app.use("/api/productos", productsRoutes);

//empezando servidor
const PORT = 8080;
const server = app.listen(PORT, () =>
	console.log(`servidor escuchando en el puerto ${PORT}`)
);
