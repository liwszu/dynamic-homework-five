import React, { useEffect, useState } from 'react';
import { Redirect, Route, BrowserRouter as Router } from "react-router-dom";
import * as firebase from 'firebase/app';
import "firebase/auth";

import './App.css';

import Header from "./Components/Header";
import Login from "./Pages/Login";
import UserProfile from "./Pages/UserProfile";
import Signup from "./Pages/Signup";

let firebaseConfig = {
  apiKey: "AIzaSyB3hgBMAVxMem2x385LuNEoQyspZRcSFVU",
  authDomain: "five-db8cc.firebaseapp.com",
  databaseURL: "https://five-db8cc.firebaseio.com",
  projectId: "five-db8cc",
  storageBucket: "five-db8cc.appspot.com",
  messagingSenderId: "825788400834",
  appId: "1:825788400834:web:95ac44c685e78d5a37675b",
  measurementId: "G-D9ELX0MMLV"
};

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    //initialize firebase
    if(!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .catch(function(error) {
        console.log('error', error);
      });
  }, [])

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        setLoggedIn(true);
        setUser(user);
      } else {
        // No user is signed in.
        setLoggedIn(false);
        setUser({});
      }
    });
  }, [])

  function signupFunction(e) {
    e.preventDefault();

    let email = e.currentTarget.createEmail.value;
    let password = e.currentTarget.createPassword.value;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function(response) {
        setLoggedIn(true);
      })
      .catch(function(error) {
        console.log('error', error);       
    });
  }

  function loginFunction(e) {
    e.preventDefault();
    let email = e.currentTarget.loginEmail.value;
    let password = e.currentTarget.loginPassword.value;
    
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(function(response) {
        setLoggedIn(true);
      })
      .catch(function(error) {
        console.log('error', error);       
    });
  }

  function logoutFunction() {
    firebase
      .auth()
      .signOut()
      .then(function() {
        // Sign-out successful.
        setLoggedIn(false);
      })
      .catch(function(error) {
        console.log('error', error);
      });
  }
  
  return (
    <div className="App">
      <Header loggedIn={loggedIn} logoutFunction={logoutFunction}/>
      <Router>
        <Route exact path="/">
          { loggedIn ? <UserProfile user={user} /> : <Redirect to="/login" /> }
        </Route>
        <Route exact path="/signup">
          { loggedIn ? <Redirect to="/" /> : <Signup signupFunction={signupFunction} /> }
        </Route>
        <Route exact path="/login">
          { loggedIn ? <Redirect to="/" /> : <Login loginFunction={loginFunction}/> }
        </Route>
      </Router>
    </div>
  );
}

export default App;