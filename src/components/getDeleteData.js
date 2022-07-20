import firebaseApp, { db } from "../firebase";
import {getFirestore,collection,addDoc,getDocs,where,query,deleteDoc,doc,setDoc,updateDoc,orderBy,getDoc} from '@firebase/firestore';
export async function delTwit(id) {
    try {
      await deleteDoc(doc(db, "Twits", id));
      return id;
    } catch (e) {
      console.log("Error al borrar el twit", e);
    }
  }