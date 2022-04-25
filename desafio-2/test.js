const Container = require("./contenedor");

async function test() {
	const file = new Container("./productos.txt");

	const saveNew = await file.save({
		title: "remera",
		price: 123.45,
		thumbnail: "cartulina.jpg",
	});
	console.log(saveNew);
	// let getId = await file.getById(2);
	// console.log(getId);

	// const read = await file.getAll();
	// console.log(read);

	// await file.deleteById(1);
	// await file.deleteAll();
}
test();
