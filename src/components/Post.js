import React, { useState } from "react";
import { db } from "../firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";

const Post = ({postObj,userConfirm})=>{
  
  const deletePost = async () =>{
    if(window.confirm('정말 삭제할까요?')){
      await deleteDoc(doc(db, "posts", postObj.id));
      const storage = getStorage();
      const storageRef = ref(storage, postObj.attachmentUrl);
      deleteObject(storageRef);
    }
  }

  const [edit, setEdit] = useState(false);
  const [newPost, setNewPost] = useState(postObj.content);
  const toggleEditMode = () => setEdit((prev) => !prev);
  const onChange = (e) => {
    // setNewPost(e.target.value) //기존문법
    const {target:{value}} = e; //ES6 문법 (여러값을 넘길때 유용)
    setNewPost(value)
  }
  const onSubmit = async (e) => {
    e.preventDefault();

    const postRef = doc(db, "posts", postObj.id);
    await updateDoc(postRef, {
      content: newPost
    });
    setEdit(false);
  }
  
  return( 
    <li>
      {edit ? ( //참일때 할 일
        <>
          <form onSubmit={onSubmit}>
            <input value={newPost} onChange={onChange} required/>
            <button >Update Post</button>
          </form>
          <button onClick={toggleEditMode}>cancel</button>
        </>
        ) : ( //거짓일때 할 일
          <>
        <h4>{postObj.content}</h4>
        {postObj.attachmentUrl && <img src={postObj.attachmentUrl} alt="" width="100"/>}
        { 
          userConfirm && (
            <>
              <button onClick={deletePost}>Delete</button>  
              <button onClick={toggleEditMode}>Edit</button>  
            </>
          )
        }
        </>
        )
      }
    </li>
  )
};

export default Post;