
import Token from '../models/Token';

class TokenRepository {
  createToken(data, trx) {
    return Token.query(trx).insert(data);
  }

  findRelatedUserByToken(data, trx) {
    return Token.query(trx)
        .select('user.fullname', 'user.email')
        .join('user', 'user.userId', 'token.userId')
        .where(data).first();
  }

  clearTokenByFilter(data, trx) {
    return Token.query(trx).where(data).delete();
  }
}

export default TokenRepository;
