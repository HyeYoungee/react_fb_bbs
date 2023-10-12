import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import Post from "../components/Post";
import { doc, onSnapshot, query, orderBy, collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore"; 

const Home = (userObj) => {
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
        date: serverTimestamp(),
        uid: userObj.userObj
      });
      console.log("Document written with ID: ", docRef.id);
    } catch(e){
      console.log(e);
    }
  }

  /*
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
  */

  // const test = {title:'title', content:'content1'};
  // const testcopy = {...test, title:'title2'}; //데이터를 복제해서 값 변경
   
  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("date"));
    onSnapshot(q, (querySnapshot) => {
      /*
      const cities = [];
      querySnapshot.forEach((doc) => {
          cities.push(doc.data().name);
      });
      */
      const postArr = querySnapshot.docs.map((doc) => ({
        id:doc.id,
        ...doc.data()
      }))
      setPosts(postArr);
      console.log(postArr);
    });
  }, [])

  return(
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" value={post} placeholder="포스트 쓰기" onChange={onChange}/>
        <input type="submit" value="입력"/>
      </form>
      <ul>
      {
        posts.map(item => <Post key={item.id} postObj={item}/>)
      }
      </ul>
    </div>
  )
}

export default Home;