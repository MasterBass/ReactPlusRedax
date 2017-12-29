import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const users = [
  {
    uid: 'admin',
    displayName: 'Administrator',
    email: 'admin@msn.com',
    password: '123456'
  },
  {
    uid: 'user',
    displayName: 'User',
    email: 'user@msn.com',
    password: '123456'
  }];

const roles = [
  {
    uid: 'admin',
    role: 'admin'
  },
  {
    uid: 'user',
    role: 'user'
  }];

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (user) => {
  return user.displayName.toLowerCase();
};

class AccountApi {

  static login(account) {
    const user = users.find(u => u.email == account.email && u.password == account.password);
    if(user) {
      users.push(user);
    }
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(user);
      }, delay);
    });
  }

  static logOut() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, delay);
    });
  }

  static getRole(uid) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const userRole = roles.find(r => r.uid == uid);
        resolve({ val: () => userRole });
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
        if (user.displayName.length < minUserNameLength) {
          reject(`User Name must be at least ${minUserNameLength} characters.`);
        }

        if (user.password.length < minPasswordLength) {
          reject(`Password must be at least ${minPasswordLength} characters.`);
        }

        if (user.uid) {
          const existingUserIndex = users.findIndex(a => a.id == user.id);
          users.splice(existingUserIndex, 1, user);
        } else {
          //Just simulating creation here.
          //The server would generate ids for new authors in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          user.uid = generateId(user);
          users.push(user);
        }

        resolve(user);
      }, delay);
    });
  }
}

export default AccountApi;
