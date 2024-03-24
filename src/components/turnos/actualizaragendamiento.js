import firebaseApp from "../credenciales";

import { getFirestore, collection, doc, setDoc, updateDoc } from "firebase/firestore";


function actualizaragendamieto(infoUsuario) {

  
    const db = getFirestore(firebaseApp);
    //const infoU = obtenerUid();
    
    const docuRef = doc(db, 'agenda',infoUsuario.id);
    updateDoc(docuRef, {  fecha: infoUsuario.fecha, turno:infoUsuario.turno,estado:infoUsuario.estado});
  
   // escribirLog("Edición", infoProducto, autor);
  }
  
  export default actualizaragendamieto;
  
