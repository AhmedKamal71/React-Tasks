import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts, deletePost } from "../../products/operations";
import { RootState, AppDispatch } from "../../store";
import "./ProductDetails.css";

const ProductDetails: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts.posts);
  const postStatus = useSelector((state: RootState) => state.posts.status);
  const error = useSelector((state: RootState) => state.posts.error);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  const handleDelete = (id: number) => {
    dispatch(deletePost(id));
  };

  let content;

  if (postStatus === "loading") {
    content = <p className="text-gray-500">Loading...</p>;
  } else if (postStatus === "succeeded") {
    content = posts.map((post) => (
      <div key={post.id} className="post-card">
        <h3 className="post-title">{post.title}</h3>
        <p className="post-body">{post.body}</p>
        <button onClick={() => handleDelete(post.id)} className="delete-button">
          Delete
        </button>
      </div>
    ));
  } else if (postStatus === "failed") {
    content = <p className="text-red-500">{error}</p>;
  }

  return (
    <section className="posts-container">
      <h2 className="posts-header">Posts</h2>
      {content}
    </section>
  );
};

export default ProductDetails;
