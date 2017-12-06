import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const users = [];

class AuthorApi {

  static login(account) {
    const user = users.find(u => u.username == account.username && u.password == account.password);
    if(user) {
      users.push(user);
    }
    return users;
  }

  static register(user) {
    return users.push(user);
  }
}

export default AuthorApi;
