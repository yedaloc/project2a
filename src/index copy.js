import './index.css';
//import React from 'react';
//import ReactDOM from 'react-dom/client';
//import { BrowserRouter } from 'react-router-dom';
//import App from './components/App';
//import { AuthContextProvider } from "./components/context/AuthContext";
//import { DarkModeContextProvider } from "./components/context/darkModeContext";
//import { initializeApp } from "firebase/app";
import "jquery/dist/jquery";
import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter } from 'react-router-dom';
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { AuthContextProvider } from "./components/context/AuthContext";
import { DarkModeContextProvider } from "./components/context/darkModeContext";
//import reportWebVitals from './reportWebVitals';
import 'whatwg-fetch';
import UserView from './components/UserView';


ReactDOM.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </DarkModeContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);



// Import the functions you need from the SDKs you need







// Your web app's Firebase configuration
/*const firebaseConfig = {

    apiKey: "AIzaSyBDQN76ga08rbUCn8nrxSbvNz9rEywy5bM",
  
    authDomain: "healthplanningapp.firebaseapp.com",
  
    databaseURL: "https://healthplanningapp-default-rtdb.firebaseio.com",
  
    projectId: "healthplanningapp",
  
    storageBucket: "healthplanningapp.appspot.com",
  
    messagingSenderId: "105820559940",
  
    appId: "1:105820559940:web:82f18531b13660f06cfa11",
  
    measurementId: "G-6C4GH9PKM4"
  
  };*/
  
  // Initialize Firebase
  //const app = initializeApp(firebaseConfig);

//const root = ReactDOM.createRoot(document.getElementById('root'));
//root.render(
//    <BrowserRouter>
//        <App />
//    </BrowserRouter>
//);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();