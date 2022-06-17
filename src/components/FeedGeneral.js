import React, {useEffect, useState, useRef} from "react";
import { AiOutlineDelete,AiFillHeart } from 'react-icons/ai';
import { Link } from "react-router-dom";
import firebaseApp, { db } from "../firebase";
import {deleteUser, getAuth,signOut} from "firebase/auth";
import {getFirestore,collection,addDoc,getDocs,where,query,deleteDoc,doc} from '@firebase/firestore';

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);


const FeedGeneral = ({usuarioGlobal}) => {
    const [comentario, setComentario] = useState("");
    const [ListaComentarios, setListaComentarios] = useState([]);
    const MESES = [ "Enero","Febrero", "Marzo", "Abril", "Mayo","Junio","Julio","Agosto", "Septiembre", "Octubre","Noviembre","Diciembre",];
    const diaActual = new Date();
    var day = diaActual.getDate();
    var month = MESES[diaActual.getMonth()+1];
    const fecha  = ' - ' + day + ' ' + month + '.' ;
    const idU = usuarioGlobal.email
    const foto = usuarioGlobal.photoURL
    
    const guardarComentarios = async (e) => {
        e.preventDefault();
        const q = query(collection(db, "Users"),where("id", "==", idU));
        const querySnapshot = await getDocs(q);
        const datos = querySnapshot.docs.map((doc) => doc.data());
        const newUser = {  
          comentario: comentario,
          Fecha: fecha,
          correo: idU,
          foto: foto,
          usuario: datos,
         };
          const docRef = collection(db, 'Twits');
          await addDoc(docRef, newUser);
          setComentario("");
      };

    useEffect(()=>{
        const getTwits = async()=>{
            try {
              const querySnapshot = await getDocs(collection(db,'Twits'))  
              const docs = []
              querySnapshot.forEach((doc)=>{
                  docs.push({...doc.data(),id:doc.id})
              })
              setListaComentarios(docs)
            } catch (error) {
                console.log(error)
            }
        }
        getTwits()
    },[ListaComentarios])

    const deleteUser = async(id)=>{
        if (window.confirm("Esta seguro de eliminar este comentario")) {
            await deleteDoc(doc(db,'Twits',id))
          }
        
    }
    
    const [count, setCount] = useState(0);
    const messagesEnqueued = useRef(0);
  
    function sendMessage() {
      setCount(count + 1);
    }
  
    messagesEnqueued.current = count;
  
    useEffect(
      function () {
        setTimeout(function () {
          console.log(count);
          console.log(`Messages enqued: ${messagesEnqueued.current}`);
        }, 3000);
      },
      [count]
    );
    return (
        <div className="login2">
        <div className="header5">              
        <Link to="/Perfil"><img src={usuarioGlobal.photoURL} className="img10"/></Link>
        <img src="imagenes/logo2-removebg-preview.png" className="img9"/>
        </div>
        <div className="contentFeed">
        <img src={usuarioGlobal.photoURL} className="img11"/>
        <form onSubmit={guardarComentarios}>
        <div className="contentFeed1">
         
        <textarea 
                type="text" 
                className="input3"
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}></textarea>
        <p className="texto4">200 max.</p>
        <button className="btn8" type="submit">POST</button>
       
        </div>
        </form>
        </div>
        <div className="ListComents">
            {ListaComentarios.map(list=>(
        <div key={list.id}>
            <div className="cabecera">
                <img  src={list.foto} className="FotoUser"/>
                    <div className="textoU">
                    <div className="textoU1">
                    <p className="u" style={{background: list.usuario[0].color}}>{list.usuario[0].user}</p>
                    <p className="fecha">{list.Fecha}</p>
                    <button className="btnDelete" onClick={()=>deleteUser(list.id)}><AiOutlineDelete/></button>
                    </div>
                    <div className="textoU2">
                        <p>{list.comentario}</p>
                        <p className="heart"><AiFillHeart onClick={sendMessage} /> {count}</p>
                    </div>
                        </div>
                    </div>
                </div>   
                ))}
            </div>   
            </div>   
    )
}

export default FeedGeneral