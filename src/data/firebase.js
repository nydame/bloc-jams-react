import firebase from "firebase";

const config = {
  apiKey: "AIzaSyApKX5t4q4wcz5LPp77noqk9x_fw8xJrlQ",
  authDomain: "blocmetrics-4e5b3.firebaseapp.com",
  databaseURL: "https://blocmetrics-4e5b3.firebaseio.com",
  projectId: "blocmetrics-4e5b3",
  storageBucket: "blocmetrics-4e5b3.appspot.com",
  messagingSenderId: "576734756421"
};
firebase.initializeApp(config);

export default firebase;
export const database = firebase.database();
export const auth = firebase.auth();
