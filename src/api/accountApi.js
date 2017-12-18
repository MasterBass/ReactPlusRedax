import { auth } from './database';

class AccountApi {

  static login(account) {
    return auth.signInWithEmailAndPassword(account.email, account.password);
  }

  static logOut() {
    return auth.signOut();
  }

  static register(user) {
    user = Object.assign({}, user); // to avoid manipulating object passed in.
    return auth.createUserWithEmailAndPassword(user.email, user.password);
  }

}

export default AccountApi;
