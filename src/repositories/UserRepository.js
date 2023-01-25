
import User from '../models/User';

class UserRepository {
  createUser(data, trx) {
    return User.query(trx).insert(data);
  }
  findUserByEmail(data, trx) {
    return User.query(trx).where(data).first();
  }
}

export default UserRepository;
