import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 

const Home = () => {
  const [post, setPost] = useState('');
  const onChange = (e) => {
    // const val = e.target.value; //ECMA script 2015이전 문법
    const {target:{value}} = e; //ES6 버전
    setPost(value);
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    const docRef = await addDoc(collection(db, "posts"), {
      content: post,
      date: serverTimestamp()
    });
    console.log("Document written with ID: ", docRef.id);
  }
  console.log(post);
  return(
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" value={post} placeholder="포스트 쓰기" onChange={onChange}/>
        <input type="submit" value="입력"/>
      </form>
    </div>
  )
}

export default Home;