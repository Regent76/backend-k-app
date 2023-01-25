import { Model } from 'objection';

class Quote extends Model {
	static get tableName() {
		return 'quote';
	}

	static get idColumn() {
	    return 'quoteId';
	}

    static get jsonSchema() {
        return {
            type: "object",
            properties: {
                quoteId: { type: "integer" },
                authorId: { type: "integer" },
                quote: { type: "string" },
            }
        };
    }
}

export default Quote;
