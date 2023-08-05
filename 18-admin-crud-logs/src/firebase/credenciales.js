// Importamos la función para inicializar la aplicación de Firebase
import { initializeApp } from "firebase/app";

// Añade aquí tus credenciales
const firebaseConfig = {
  apiKey: "AIzaSyBDQN76ga08rbUCn8nrxSbvNz9rEywy5bM",
  authDomain: "healthplanningapp.firebaseapp.com",
  databaseURL: "https://healthplanningapp-default-rtdb.firebaseio.com",
  projectId: "healthplanningapp",
  storageBucket: "healthplanningapp.appspot.com",
  messagingSenderId: "105820559940",
  appId: "1:105820559940:web:82f18531b13660f06cfa11",
  measurementId: "G-6C4GH9PKM4"
};

// Inicializamos la aplicación y la guardamos en firebaseApp
const firebaseApp = initializeApp(firebaseConfig);
// Exportamos firebaseApp para poder utilizarla en cualquier lugar de la aplicación
export default firebaseApp;
