import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore"; 

const Home = () => {
  const [post, setPost] = useState('');
  const [posts, setPosts] = useState([]);

  const onChange = (e) => {
    // const val = e.target.value; //ECMA script 2015이전 문법
    const {target:{value}} = e; //ES6 버전
    setPost(value);
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    try{
      const docRef = await addDoc(collection(db, "posts"), {
        content: post,
        date: serverTimestamp()
      });
      console.log("Document written with ID: ", docRef.id);
    } catch(e){
      console.log(e);
    }
  }

  const getPosts = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc) => {
      const postObj = {
        ...doc.data(),
        id:doc.id
      }
      setPosts((prev) => [postObj, ...prev]);
    });
  }

  // const test = {title:'title', content:'content1'};
  // const testcopy = {...test, title:'title2'}; //데이터를 복제해서 값 변경
   
  useEffect(() => {
    getPosts();
  }, [])

  return(
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" value={post} placeholder="포스트 쓰기" onChange={onChange}/>
        <input type="submit" value="입력"/>
      </form>
      <ul>
      {
        posts.map(item => <li key={item.id}>{item.content}</li>)
      }
      </ul>
    </div>
  )
}

export default Home;