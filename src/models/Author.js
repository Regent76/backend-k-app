import { Model } from 'objection';

class Author extends Model {
	static get tableName() {
		return 'author';
	}

  	static get idColumn() {
	    return 'authorId';
	}

    static get jsonSchema() {
        return {
            type: "object",
            properties: {
                authorId: { type: "integer" },
                name: { type: "string" },
            }
        };
    }
}

export default Author;
