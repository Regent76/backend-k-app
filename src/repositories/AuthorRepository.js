
import Author from '../models/Author';

class AuthorRepository {
  findRandomAuthor(trx) {
    return Author.query(trx)
        .select('authorId', 'name')
        .orderByRaw('RANDOM()').first();
  }
}
export default AuthorRepository;
