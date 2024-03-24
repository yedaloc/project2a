import React, { useState, useEffect, Fragment, useContext } from 'react';
import {app} from '../firebaseconfig'
import { getFirestore, collection,query,onSnapshot, where } from "firebase/firestore";
import { useFirestoreQuery } from "@react-query-firebase/firestore";

function ObtenerNutriQ() {

    
const [nutri, setNutri] = useState([]);
const [loading, setLoading] = useState(false);

//REALTIME GET FUNCTION
  useEffect(() => {
    const db = getFirestore(app);

    const colletionRef = collection(db, "usuarios");


console.log("entra en query")
    const q = query(
      colletionRef,
      //  where('owner', '==', currentUserId),
      where('rol', '==', 'nutri') // does not need index
      //  where('score', '<=', 100) // needs index  https://firebase.google.com/docs/firestore/query-data/indexing?authuser=1&hl=en
      // orderBy('score', 'asc'), // be aware of limitations: https://firebase.google.com/docs/firestore/query-data/order-limit-data#limitations
      // limit(1)
    );

    setLoading(true);
    // const unsub = onSnapshot(q, (querySnapshot) => {
    const unsub = onSnapshot(colletionRef, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setNutri(items);
      console.log(nutri);
      setLoading(false);
    });
    return nutri;

    // eslint-disable-next-line
  }, []);
}

export default ObtenerNutriQ;