const Container = require("../desafio-2/contenedor.js");
const express = require("express");

const app = express();

const file = new Container("productos.txt");

//obtener id aleatorio
const randomId = async () => {
	const products = await file.read();
	const size = products.length;
	return Math.floor(Math.random() * size) + 1;
};

//
app.get("/productos", async (req, res) => {
	try {
		const getAlls = await file.getAll();
		res.send(getAlls);
	} catch (error) {
		console.log(error);
	}
});

app.get("/productoRandom", async (req, res) => {
	try {
		const id = await randomId();
		const product = await file.getById(id);
		res.send(product);
	} catch (error) {
		console.log(error);
	}
});

app.listen(8080);
