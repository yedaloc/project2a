import firebaseApp from "../firebase/credenciales";
import { getFirestore, collection, doc, setDoc, getDoc, query, where, limit } from "firebase/firestore";
import { getAuth,onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";


export default async function obtenerUid(correo) {
    const uid = [];
    const db = getFirestore(firebaseApp);
    //const auth = getAuth(firebaseApp);
    //const docRef = doc(db, "usuarios");
    //const docSnap =  getDoc(docRef);
    const q = query(collection(db,"usuarios"),where("correo","==",correo));

    const querySnapshot = await getDoc(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        uid.push(doc.data());
        console.log(doc.data());
      });

   return uid;
    
    

}
