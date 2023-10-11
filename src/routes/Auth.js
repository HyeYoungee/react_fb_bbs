import React, { useState } from "react";
import { authService } from "../firebase";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');
  const auth = getAuth();

  const onSubmit = (e) => {
    e.preventDefault();
    if(newAccount){
      //Create Account 회원가입
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setError(errorMessage);
      });
    } else{
      //로그인
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
    }
  }
  const onChange = (e) => {
    // let name = e.target.value;
    const {target:{name,value}} = e;

    if(name === "email"){
      setEmail(value);
    } else{
      setPassword(value);
    }
  }

  return(
    <div>
      <form onSubmit={onSubmit}>
        <input name="email" type="email" placeholder="email" value={email} onChange={onChange}/>
        <input name="password" type="password" placeholder="password" value={password} onChange={onChange}/>
        <button>{newAccount ? "Create Account" : "Login"}</button>
      </form>
      {error}
    </div>
  )
}

export default Auth;