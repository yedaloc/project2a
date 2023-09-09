import firebaseApp from "../firebase/credenciales";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import escribirLog from "./escribirLog";

async function añadirUsuario(infoUsuario) {
  const firestore = getFirestore(firebaseApp);
  //const collectionRef = collection(db, "usuarios");
  //const docRef = doc(collectionRef, infoUsuario.id);
  //setDoc(docRef, infoUsuario);
 
  const auth = getAuth(firebaseApp);


  const infoU = await createUserWithEmailAndPassword(
    auth,
    infoUsuario.correo,
    infoUsuario.contrasena
  ).then((usuarioFirebase) => {
    return usuarioFirebase;
  });
  console.log(infoU.user.uid);
  const sku=infoU.user.uid;
  const docuRef = doc(firestore, `usuarios/${infoU.user.uid}`);
  setDoc(docuRef, { correo: infoUsuario.correo, rol: infoUsuario.rol, nombre:infoUsuario.nombre,estado:infoUsuario.estado,sku:sku });

  //escribirLog("Creación", infoUsuario, autor);
}

export default añadirUsuario;
