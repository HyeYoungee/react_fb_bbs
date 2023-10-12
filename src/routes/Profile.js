import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";


const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const onLogoutClick = () => {
    signOut(auth).then(() => {
      navigate("/");
    }).catch((error) => {
      console.log(error);
    });
  }

  return(
    <>
      <button onClick={onLogoutClick}>Log out</button>
    </>
  )
}


export default Profile;