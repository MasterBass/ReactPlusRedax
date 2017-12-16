import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDu5vLaR95UewdZaHi58UDfQGEWkvUI_fw",
  authDomain: "shengen-52363.firebaseapp.com",
  databaseURL: "https://shengen-52363.firebaseio.com"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const database = firebase.database();

export default database;
