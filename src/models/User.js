import { Model } from 'objection';

class User extends Model {

	static get tableName() {
		return 'user';
	}

	static get idColumn() {
	    return 'userId';
	}

    static get jsonSchema() {
        return {
            type: "object",
            properties: {
                userId: { type: "integer" },
                email: { type: "string" },
                fullname: { type: "string" },
                password: { type: "string" },
            }
        };
    }
}

export default User;
