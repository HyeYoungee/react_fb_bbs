import React, { useEffect, useState } from "react";
import AppRouter from './Router';
import { getAuth, onAuthStateChanged} from "firebase/auth";
import '../App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [init, setInit] = useState(false);
  
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if(user){
        setIsLoggedIn(true);
        console.log(user);
      } else{
        //user is signed out
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? 
        <AppRouter isLoggedIn={isLoggedIn}/>  
        : "회원정보 확인중..."
      }
    </>
  );
}

export default App; 