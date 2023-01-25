export const up = async function(knex) {
    const authorInitList = [
        {
            "authorId": 1,
            "name": "Walt Disney"
        },
        {
            "authorId": 2,
            "name": "Mark Twain"
        },
        {
            "authorId": 3,
            "name": "Albert Einstein"
        }
    ];

    await knex('author').insert(authorInitList);
};

export const down = async function(knex) {
    await knex.raw("TRUNCATE author RESTART IDENTITY CASCADE");
};
