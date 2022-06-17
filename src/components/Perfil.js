import React, {useEffect, useState} from "react";
import {IoChevronBack,IoLogOutOutline} from 'react-icons/io5';
import { AiOutlineDelete,AiFillHeart } from 'react-icons/ai';
import 'bootstrap/dist/css/bootstrap.css';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Link } from "react-router-dom";
import firebaseApp, { db } from "../firebase";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, collection, getDocs, query, where,doc,deleteDoc} from '@firebase/firestore';

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

const Perfil = ({ usuarioGlobal,correoUsuario}) =>{

const [ListaComentarios, setListaComentarios] = useState([]);
const [user, setUser] = useState([]);
const idU = usuarioGlobal.email

useEffect(()=>{
    const getTwits = async()=>{
        try {
          const querySnapshot = await getDocs(query(collection(db, "Twits"),where("correo", "==", idU)))  
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

useEffect(()=>{
    const getUsers = async()=>{
        try {
          const querySnapshot = await getDocs(query(collection(db, "Users"),where("id", "==", idU)))  
          const docs = []
          querySnapshot.forEach((doc)=>{
              docs.push({...doc.data(),id:doc.id})
          })
          setUser(docs)
        } catch (error) {
            console.log(error)
        }
    }
    getUsers()
},[user])

const deleteUser = async(id)=>{
    if (window.confirm("Esta seguro de eliminar este comentario")) {
        await deleteDoc(doc(db,'Twits',id))
      }
}


return (<div className="login2">
            <div className="header5">              
               <Link to="/Feed"><p className="enlace"><IoChevronBack className="aaa"/>{usuarioGlobal.displayName}</p></Link>
               <button onClick={() => signOut(auth)} className="btnL">Logout <IoLogOutOutline className="aa"/></button>
            </div>
            <div className="contentFeed2">
            {user.map(list=>(
            <div key={list.id} className="contentFeed2-sub">
            <img style={{ borderColor: list.color}} src={usuarioGlobal.photoURL} className="img12"/>
            <p style={{background: list.color}} className="enlace2">{usuarioGlobal.displayName}</p>
           
            </div>
            ))}
            </div>
            <Tabs defaultActiveKey="first">
        <Tab eventKey="first" title="POST">
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
                        <p className="heart"><AiFillHeart/> 0</p>
                    </div>
                        </div>
                    </div>
                </div>   
                ))}
            </div>  
        </Tab>
        <Tab eventKey="second" title="FAVORITOS">
          Hii, I am 2nd tab content
        </Tab>
      </Tabs>
           
      
    </div> 
    )

};

export default Perfil;