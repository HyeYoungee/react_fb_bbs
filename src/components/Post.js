import React from "react";

const Post = ({postObj, userConfirm}) => (
  <li>
    <h4>{postObj.content}</h4>
    {
      userConfirm && (
      <>
        <button>Edit</button>
        <button>Delete</button>
      </>
      )
    }
  </li>
);

export default Post;