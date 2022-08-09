import MongoClass from "../../contenedores/MongoClass.js";
import UserSchema from "../../models/User.schema.js";

const collection = "User";

export class MongoDBUsers extends MongoClass {
	constructor() {
		super(collection, UserSchema);
	}

	//encuentra usuario por email
	async getByEmail(email) {
		try {
			const document = await this.collection.findOne({ email }, { __v: 0 });
			if (!document) {
				const errorMessage = `Wrong username or password`;
				throw new Error(errorMessage);
			} else {
				return document;
			}
		} catch (error) {
			throw new Error(error);
		}
	}
}
