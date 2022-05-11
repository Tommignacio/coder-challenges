const { number } = require("prop-types");

let db = [];
class Container {
	constructor() {}

	async getAll() {
		try {
			let products = db;
			// if (products.length === 0) return "base de datos vacia";
			return products;
		} catch (error) {
			return error;
		}
	}

	//devuelve el producto por su ID
	async getById(id) {
		try {
			let products = db;
			for (let el of products) {
				if (el["id"] === parseInt(id)) {
					return el;
				}
			}
			return false;
		} catch (error) {
			return error;
		}
	}

	//agrega y guarda un nuevo objeto
	async add(obj) {
		try {
			let products = db;
			//busca repetidos
			// if (products.length >= 1) {
			// 	for (let el of products) {
			// 		console.log(el["title"], obj["title"]);
			// 		if (el["title"] === obj["title"]) throw "error, producto repetido";
			// 	}
			// }
			//agrega el nuevo id
			console.log(db);
			obj["id"] = products.length + 1;
			products.push(obj);
			return obj;
		} catch (error) {
			return error;
		}
	}

	//actualizar
	async upload(obj) {
		try {
			let products = db;
			// console.log(obj, "objeto");
			let msj = products.splice(obj.id - 1, 1, obj);
			// console.log(msj, "msj");
			return obj;
		} catch (error) {
			return error;
		}
	}

	//elimina objeto por su id
	async deleteById(id) {
		try {
			let products = db;
			let nProducts = products.filter((el) => el["id"] !== id);
			return nProducts;
		} catch (error) {
			console.log(error);
		}
	}
}
module.exports = Container;
