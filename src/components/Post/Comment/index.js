import React from "react";

const Comment = (props) => {
  return (
    <div className="comment">
      <div className="user">{props.user}</div>
      <div className="body">{props.body}</div>
    </div>
  );
};
export default Comment;
