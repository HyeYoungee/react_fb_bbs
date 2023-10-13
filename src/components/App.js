import React, { useEffect, useState } from "react";
import AppRouter from './Router';
import { getAuth, onAuthStateChanged} from "firebase/auth";
import '../App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if(user){
        setIsLoggedIn(true);
        setUserObj(user.uid);
      } else{
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  console.log(userObj);

  return (
    <>
      {init ? 
        <AppRouter isLoggedIn={isLoggedIn} userObj={userObj}/>  
        : "회원정보 확인중..."
      }
    </>
  );
}

export default App; 