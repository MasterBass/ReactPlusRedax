import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const users = [
  {
    id: 'admin',
    username: 'admin',
    password: '123456'
  },
  {
    id: 'user',
    username: 'user',
    password: '123456'
  }];

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (user) => {
  return user.username.toLowerCase();
};

class AccountApi {

  static login(account) {
    const user = users.find(u => u.username == account.username && u.password == account.password);
    if(user) {
      users.push(user);
    }
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(user);
      }, delay);
    });
  }

  static register(user) {
    user = Object.assign({}, user); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minUserNameLength = 3;
        const minPasswordLength = 1;
        if (user.username.length < minUserNameLength) {
          reject(`User Name must be at least ${minUserNameLength} characters.`);
        }

        if (user.password.length < minPasswordLength) {
          reject(`Password must be at least ${minPasswordLength} characters.`);
        }

        if (user.id) {
          const existingUserIndex = users.findIndex(a => a.id == user.id);
          users.splice(existingUserIndex, 1, user);
        } else {
          //Just simulating creation here.
          //The server would generate ids for new authors in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          user.id = generateId(user);
          users.push(user);
        }

        resolve(user);
      }, delay);
    });
  }
}

export default AccountApi;
