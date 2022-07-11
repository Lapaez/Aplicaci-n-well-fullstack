import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinnerHome from "./LoadingSpinnerHome";
import firebaseApp, { db } from "../firebase";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore,setDoc,doc,addDoc,collection  } from "firebase/firestore";

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);


const Home = ({ usuarioGlobal, correoUsuario }) =>{
  let navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false);
  const [user, setArrayUsername] = useState("");
  const [color, setColor] = useState("");
  const [data, setData] = useState([]);

const idU = usuarioGlobal.email

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  const newUser = {  id: idU,
    color,
    user };
    const docRef = doc(db, `Users`, newUser.id);
    await setDoc(docRef, newUser);
    setData([...data, newUser]);
    setIsLoading(false);
      navigate("/Feed");
};

    return ( <div className="login">
    <img src="imagenes/logo.png" className="img1"/>
    <div className="container-texto">
    <p className="texto1">Bienvenido <span>{usuarioGlobal.displayName}</span></p>
    <br/>
   <form onSubmit={handleSubmit}>
    <input 
    type="text" 
    className="input1"  
    id="input1"
    placeholder='Escriba su usuario'
    value={user}
    onChange={(e) => setArrayUsername(e.target.value)}/>
    <br/> <br/>
    {isLoading ? <LoadingSpinnerHome /> :Home}
      <p className="textColor">Selecciones su color favorito</p>
      <br/>
       <div className="botones">
          <button className="btn1" type="button" onClick={(e) => setColor(e.target.value)} value="#F50D5A"></button>
          <button className="btn2" type="button" onClick={(e) => setColor(e.target.value)}  value="#FF865C"></button>
          <button className="btn3" type="button" onClick={(e) => setColor(e.target.value)}  value="#FFEA5C"></button>
          <button className="btn4" type="button" onClick={(e) => setColor(e.target.value)}  value="#00DA76"></button>
          <button className="btn5" type="button" onClick={(e) => setColor(e.target.value)}  value="#0096CE"></button>
          <button className="btn6" type="button" onClick={(e) => setColor(e.target.value)}  value="#800FFF"></button>
       </div>
   <button type="submit" className="button">Continuar</button>
   </form>
        <p className="copy">&#169; 2022 Devs_United - <span>Beta</span></p>
        
    </div>
    </div>  ) 
};

export default Home;