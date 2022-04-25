const fs = require("fs");
class Container {
	constructor(name) {
		this.name = name;
	}

	//crea archivo
	async createFile(path) {
		try {
			// verifico si el archivo ya existe. Si no existe, lo creo
			if (fs.existsSync(path)) {
				//El archivo ya existe, entonces no hago nada;
				return false;
			} else {
				//El archivo no existe, entonces lo creo;
				await fs.promises.writeFile(path, "", "utf8");
				return true;
			}
		} catch (err) {
			console.log("Error en la creación del archivo", err);
			return false;
		}
	}

	//lee el archivo
	async read() {
		try {
			let file = await fs.promises.readFile(this.name, "utf-8");
			console.log(file, "hola");
			//si el archivo esta vacío
			if (file === "") {
				file = [];
				console.log(file, "array????");
				return file;
			}
			//si tiene objeos
			else {
				let fileObj = JSON.parse(file);
				console.log(fileObj, "array???");
				return fileObj;
			}
		} catch (error) {
			console.log(error);
		}
	}

	//escibe el archivo
	async write(res) {
		try {
			await fs.promises.writeFile(this.name, res);
		} catch (error) {
			console.log(error);
		}
	}

	//agrega y guarda un nuevo objeto
	async save(obj) {
		try {
			//verifica si existe el archivo o lo tiene que crear
			await this.createFile(this.name);
			//lee el archivo
			let res = await this.read();
			//busca repetidos
			console.log(res.length);
			if (res.length >= 1) {
				for (let el of res) {
					console.log(el["title"], obj["title"]);
					if (el["title"] === obj["title"]) throw "error, producto repetido";
				}
			}
			//agrega el nuevo id
			obj["id"] = res.length + 1;
			res.push(obj);
			console.log(res);
			//escribe el nuevo objeto
			this.write(JSON.stringify(res));
			return `el id del nuevo objeto es ${obj["id"]}`;
		} catch (error) {
			return error;
		}
	}

	//devuelve el producto por su ID
	async getById(id) {
		try {
			let res = await this.read();
			for (let el of res) {
				if (id === el["id"]) {
					return el;
				}
			}
			return null;
		} catch (error) {
			return error;
		}
	}

	//devuelve tosdos los objetos
	async getAll() {
		try {
			let all = await this.read();
			return all;
		} catch (error) {
			return error;
		}
	}

	//elimina objeto por su id
	async deleteById(id) {
		try {
			let res = await this.read();
			let nres = res.filter((el) => el["id"] !== id);
			console.log(nres);
		} catch (error) {
			console.log(error);
		}
	}

	//borra todos los objetos
	async deleteAll() {
		try {
			let res = await this.read();
			res = "";
			this.write(res);
		} catch (error) {
			console.log(error);
		}
	}
}
module.exports = Container;
