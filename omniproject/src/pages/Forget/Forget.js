import React from 'react'
import { useState } from 'react'
import { useAuthentication } from "../../hooks/useAuthentication"
import './Forget.css'
import 'firebase/compat/auth';
import firebase from '../../firebase/config'
import { sendPasswordResetEmail } from 'firebase/auth'
const Forget = () => {

    const[email, setEmail] = useState("")
    const{login, error: authError, loading} = useAuthentication()

    function recuperarSenha(){
        firebase.auth().sendPasswordResetEmail(email).then(resultado => {
            alert("Email enviado com sucesso")
        }).catch(erro => {
            console.log(erro)
        })
        
    }

  return (
    <div className='login'>
         <form className='form'>
             <label>
                <span>E-mail:</span>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" required placeholder="E-mail do usuário"/>
            </label>
            {!loading &&<button className="btn" onClick={recuperarSenha}>Redefinir Senha</button>}

        </form>
    </div>

        )
}

export default Forget