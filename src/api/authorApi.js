import database from './database';

class AuthorApi {
  static getAllAuthors() {
    return database.ref('/authors/').once('value');
  }
}

export default AuthorApi;
