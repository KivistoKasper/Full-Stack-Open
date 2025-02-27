import React, { useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import storage from "../services/storage";

const Blog = ({ blogs, doVote, doDelete, doComment }) => {
  if (!blogs || !doVote || !doDelete || !doComment) {
    return null;
  }

  const [newComment, setNewComment] = useState("");

  const id = useParams().id;
  //console.log("id: ", id);

  const blog = blogs.find((b) => b.id === id);
  //console.log("blog: ", blog);

  const nameOfUser = blog.user ? blog.user.name : "anonymous";
  const canRemove = blog.user ? blog.user.username === storage.me() : true;

  const handleNewCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handelSubmit = (event) => {
    event.preventDefault();
    doComment({
      id: blog.id,
      comment: newComment,
    });
    setNewComment("");
  };

  console.log(blog);
  return (
    <div className="blog">
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        likes {blog.likes}
        <button style={{ marginLeft: 3 }} onClick={() => doVote(blog)}>
          like
        </button>
      </div>
      <div>added by {nameOfUser}</div>
      {canRemove && <button onClick={() => doDelete(blog)}>remove</button>}
      <h2>comments</h2>
      <form onSubmit={handelSubmit}>
        <div>
          <label>Write comment </label>
          <input
            type="text"
            value={newComment}
            onChange={handleNewCommentChange}
          />
          <button type="submit">add comment</button>
        </div>
      </form>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

Blog.propTypes = {
  blogs: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      likes: PropTypes.number.isRequired,
      user: PropTypes.object,
    }).isRequired,
  ),
  doVote: PropTypes.func.isRequired,
  doDelete: PropTypes.func.isRequired,
};

export default Blog;
