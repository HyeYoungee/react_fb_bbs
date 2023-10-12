import React from "react";

const Post = ({postObj}) => (
  <li>
    <h4>{postObj.content}</h4>
    <button>Edit</button>
    <button>Delete</button>
  </li>
);

export default Post;