import React from "react";
import { db } from "../firebase";
import { doc, deleteDoc } from "firebase/firestore";

const Post = ({postObj,userConfirm})=>{
  console.log(postObj);
  const deletePost = async () =>{
    if(window.confirm('정말 삭제할까요')){
      await deleteDoc(doc(db, "posts", postObj.id));
    }    
  }
  
  return( 
  <li>
    <h4>{postObj.content}</h4>
    { 
      userConfirm && (
        <>
          <button onClick={deletePost}>Delete</button>  
          <button>Edit</button>  
        </>
      )
    }
  </li>
  )
};

export default Post;