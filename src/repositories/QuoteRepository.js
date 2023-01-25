
import Quote from '../models/Quote';

class QuoteRepository {
  findRandomQuoteByAuthor(data, trx) {
    return Quote.query(trx)
        .where(data)
        .orderByRaw('RANDOM()').first();
  }
}

export default QuoteRepository;
