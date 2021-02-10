import React from 'react'
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase";

// Add the Firebase services that you want to use



    var firebaseConfig = {
        apiKey: "AIzaSyCr3o_yktpFN5YBML43zbn4p4LlB_a-H7I",
        authDomain: "bootcampus-1ef83.firebaseapp.com",
        databaseURL: "https://bootcampus-1ef83.firebaseio.com",
        projectId: "bootcampus-1ef83",
        storageBucket: "bootcampus-1ef83.appspot.com",
        messagingSenderId: "56175446868",
        appId: "1:56175446868:web:eff82160f6ce955d8a16c1",
        measurementId: "G-9HBQL8ZQJD",
        clientId: "56175446868-6uculn471b7f04teop0c9g2bia6ouomt.apps.googleusercontent.com",
        discoveryDocs :["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
        scope:'https://www.googleapis.com/auth/drive.file'
      };
      export default firebaseConfig;
      export const provider = new firebase.auth.GoogleAuthProvider();
      export const fire  = firebase.initializeApp(firebaseConfig);
      export const db = firebase.firestore();

