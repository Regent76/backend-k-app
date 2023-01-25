import { Model } from 'objection';

class Token extends Model {
	static get tableName() {
		return 'token';
	}

  	static get idColumn() {
	    return 'tokenId';
	}

    static get jsonSchema() {
        return {
            type: "object",
            properties: {
                tokenId: { type: "integer" },
                userId: { type: "integer" },
                token: { type: "string" },
            }
        };
    }
}

export default Token;
