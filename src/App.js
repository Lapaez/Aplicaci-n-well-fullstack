import React, { useState, useEffect } from "react";
import './App.css';
import { BrowserRouter, Route,Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login"
import FeedGeneral from "./components/FeedGeneral";
import Perfil from "./components/Perfil";
import firebaseApp from "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth(firebaseApp);

function App() {
  const [usuarioGlobal, setUsuarioGlobal] = useState(null);

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      //código en caso de que haya sesión inciiada
      setUsuarioGlobal(usuarioFirebase);
    } else {
      //código en caso de que no haya sesión iniciada
      setUsuarioGlobal(null);
    }
  });
  return (
    <div className="App">
       <BrowserRouter>
    <Routes>     
    <Route path='' element={usuarioGlobal ? (<Home usuarioGlobal={usuarioGlobal} correoUsuario={usuarioGlobal.email} /> ) : (<Login/> )} />
    <Route path='/Feed' element={usuarioGlobal ? (<FeedGeneral usuarioGlobal={usuarioGlobal} correoUsuario={usuarioGlobal.email} /> ) : (<Login/> )} />
    <Route path='/Perfil' element={usuarioGlobal ? (<Perfil usuarioGlobal={usuarioGlobal} correoUsuario={usuarioGlobal.email} /> ) : (<Login/> )} />
    </Routes>
  </BrowserRouter>
    </div>
  );
}

export default App;