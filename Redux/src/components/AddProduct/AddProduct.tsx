import React, { useState, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { addPost } from "../../products/operations";
import "./AddProduct.css";

const AddProduct: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const onTitleChanged = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const onBodyChanged = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setBody(e.target.value);

  const onSavePostClicked = () => {
    if (title && body) {
      dispatch(addPost({ title, body }));
      setTitle("");
      setBody("");
    }
  };

  return (
    <section className="section-container">
      <h2 className="section-header">Add a New Post</h2>
      <form className="form">
        <div className="form-group">
          <label htmlFor="postTitle" className="label">
            Post Title:
          </label>
          <input
            type="text"
            id="postTitle"
            name="postTitle"
            value={title}
            onChange={onTitleChanged}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="postBody" className="label">
            Content:
          </label>
          <textarea
            id="postBody"
            name="postBody"
            value={body}
            onChange={onBodyChanged}
            rows={4}
            className="textarea"
          />
        </div>
        <div className="button-container">
          <button type="button" onClick={onSavePostClicked} className="button">
            Save Post
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddProduct;
