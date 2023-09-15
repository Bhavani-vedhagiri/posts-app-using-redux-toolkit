import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postAdded, addNewPost } from "../reducers/posts/postsSlice";
import { selectAllUser } from "../reducers/posts/userSlice";
import lodash from "lodash";
// import { nanoid } from "@reduxjs/toolkit";

function AddPost() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserID] = useState("");
  const users = useSelector(selectAllUser);
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const onTitleChange = (e) => setTitle(e.target.value);
  const onContentChange = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserID(e.target.value);

  // const isSave = Boolean(title) && Boolean(content) && Boolean(userId)
  const isSave = (
    [title, content, userId].every(Boolean) &&
    addRequestStatus === "idle"
  )
  // const handleSavePost = () => {
  //   if (title && content) {
  //     dispatch(
  //       // postAdded({
  //       //   id: nanoid(),
  //       //   title,
  //       //   content,
  //       // })
  //       postAdded(title, content, userId)
  //     );
  //     setTitle("");
  //     setContent("");
  //   }
  // };

  const handleSavePost = () => {
    if(isSave) {
      try {
        setAddRequestStatus('pending');
        dispatch(addNewPost({ title, body: content, userId})).unwrap() //used to "unwrap" the result of the dispatched action. 
        setTitle("");
        setContent("");
        setUserID("")
      } catch (error) {
          console.error('Failed to add new post',error)
      } finally {
            setAddRequestStatus('idle')
      }
    }
    
    
  }



  const renderUserOption = lodash.map(users, (user) => {
    return (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    );
  });
  return (
    <section id="review-section">
      <h3>Add Your Post</h3>

      <form className="review-form">
        <label htmlFor="postUser">Author</label>
        <select
          id="postAuthor"
          value={userId}
          onChange={onAuthorChanged}
          placeholder="Select a post author"
        >
          {renderUserOption}
        </select>

        <label htmlFor="posTitle">Post Title</label>
        <input
          type="text"
          id="posTitle"
          name="posTitle"
          value={title}
          onChange={onTitleChange}
          placeholder="title"
        />

        <label htmlFor="posTitle">Post Content</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChange}
          placeholder="Message"
        />
        <button
          type="button"
          onClick={handleSavePost}
          className="btn-primary"
          disabled={!isSave}
        >
          + Add Another
        </button>
      </form>
    </section>
  );
}

export default AddPost;
