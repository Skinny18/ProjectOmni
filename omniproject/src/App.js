import logo from './logo.svg';
import './App.css';

import {AuthProvider} from "./context/AuthContext"
import { onAuthStateChanged } from 'firebase/auth';

//hooks
import{ useState, useEffect} from 'react'
import { useAuthentication } from './hooks/useAuthentication';

//Rotas
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"

//pages
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import { Principal } from './pages/Princ/Principal';
import Dashboard from './pages/Dashboard/Dashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Forget from './pages/Forget/Forget';

function App() {

  const [user,setUser] = useState(undefined)
  const {auth} = useAuthentication()

  const loadingUser = user === undefined
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [auth])

  if(loadingUser){
    return<p>Carregando...</p>
  }

  return (
    <div className="App">
      <AuthProvider value={{user}}>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element={!user ? <Principal/> : <Navigate to="/dashboard"/>}></Route>
          <Route path="/cadastro" element={<Home/>} ></Route>
          <Route path="/login" element={!user ? <Login/> : <Navigate to="/dashboard"/>}/>
          <Route path='/register' element={!user ? <Register/> : <Navigate to="/dashboard"/>}/>
          <Route path="/dashboard" element={user ? <Dashboard/> : <Navigate to="/login"/>}/>
          <Route path="/forget" element={<Forget/>}></Route>
        </Routes>
        <Footer/>
      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
