import "tailwindcss/tailwind.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts, deletePost } from "../../products/operations";
import { useEffect } from "react";
import { RootState } from "../../store";

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function FunctionComponent() {
  const dispatch = useDispatch();
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
    content = <p className="text-center text-lg text-gray-500">Loading...</p>;
  } else if (postStatus === "succeeded") {
    content = posts.map((post: Post) => (
      <div key={post.id} className="bg-white shadow-md rounded-md p-4 mb-4">
        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
        <p className="text-gray-600">{post.body}</p>
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => handleDelete(post.id)}
            className="text-red-500 hover:text-red-600"
          >
            Delete
          </button>
          <div className="space-x-4">
            <a
              href={`/details/${post.id}`}
              className="text-blue-500 hover:text-blue-600"
            >
              See Details
            </a>
            {/* <a href={`/edit-product/${post.id}`} className="text-blue-500 hover:text-blue-600">
              Edit
            </a> */}
          </div>
        </div>
      </div>
    ));
  } else if (postStatus === "failed") {
    content = <p className="text-center text-lg text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">All Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {content}
      </div>
      <a
        href="/add-product"
        className="fixed bottom-10 right-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300"
      >
        Add
      </a>
    </div>
  );
}
