// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database. 
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.newUser = functions.auth.user().onCreate(event => {
    const user = event.data; // The Firebase user. 
    const usersRef = admin.database().ref('users');
    let role = 'user';

    return usersRef.once('value', function(snapshot) {
        if(snapshot.numChildren() === 0) {
            role = 'admin';
        }
    }).then(() => {    
        usersRef.child(user.uid).set({ 
            email: user.email,
            role: role        
        });          
    });
});
