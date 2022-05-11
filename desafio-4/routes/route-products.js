const { Router } = require("express");
const router = Router();
const Products = require("../container.js");

//instancio la clase con la base de datos y sus metodos
const product = new Products();

//middlewares
const existProduct = async function (req, res, next) {
	//controla si eciste el producto por su id
	const allProducts = await product.getAll();
	for (el of allProducts) {
		console.log(typeof el.id, "aajdoja");
		if (el.id === Number(req.params.id)) {
			return next();
		}
	}
	//si no existe
	next("error");
};

const noProductError = async function (err, req, res, next) {
	//mensaje de error al no existir producto
	if (err) {
		return res
			.status(500)
			.json({ error: ` producto con el id ${req.params.id} no encontrado` });
	}
	next();
};

//devuelve todos los productos
router.get("/", async (req, res) => {
	try {
		let allProducts = await product.getAll();
		return res.json({ Productos: allProducts });
	} catch (error) {
		console.log(error);
	}
});

//devuelve producto por ID
router.get("/:id", existProduct, noProductError, async (req, res) => {
	try {
		const { id } = req.params;
		let productId = await product.getById(id);
		return res.json({ Producto: productId });
	} catch (error) {
		console.log(error);
	}
});

//agrega producto
router.post("/", async (req, res) => {
	try {
		const { title, price, thumbnail } = req.body;
		const obj = { title: title, price: price, thumbnail: thumbnail };
		let productAdd = await product.add(obj);
		return res.json({ Agregado: productAdd });
	} catch (error) {
		console.log(error);
	}
});

//actualiza producto(reemplaza)
router.put("/:id", existProduct, noProductError, async (req, res) => {
	try {
		const { id } = req.params;
		const { title, price, thumbnail } = req.body;
		const obj = {
			title: title,
			price: price,
			thumbnail: thumbnail,
			id: Number(id),
		};
		let productUpload = await product.upload(obj);
		res.json({ productUpload });
	} catch (error) {
		console.log(error);
	}
});

router.delete("/:id", existProduct, noProductError, async (req, res) => {
	try {
		const { id } = req.params;
		let productDelete = await product.deleteById(Number(id));
		return res.json({ productDelete });
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
