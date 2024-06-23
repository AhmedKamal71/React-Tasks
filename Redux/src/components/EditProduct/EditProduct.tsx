import { useParams, useNavigate } from "react-router-dom";
import "./EditProduct.css";
import axios from "axios";
import { usePosts } from "../Posts/ManagingPosts";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface Params {
  id: string;
}

const EditProduct: React.FC = () => {
  const { id } = useParams<Params>();
  const { posts, setPosts } = usePosts();
  const [product, setProduct] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => response.json())
      .then((data: Post) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error: Error) => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (product) {
      axios
        .put(`https://jsonplaceholder.typicode.com/posts/${id}`, product)
        .then((response) => {
          setPosts([...posts, response.data]);
          navigate(`/details/${id}`);
        })
        .catch((error: Error) => {
          setError(error);
        });
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (product) {
      setProduct({
        ...product,
        [name]: value,
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching product details</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label htmlFor="title" className="label">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={product.title}
          onChange={handleChange}
          className="input"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="body" className="label">
          Body
        </label>
        <textarea
          id="body"
          name="body"
          value={product.body}
          onChange={handleChange}
          className="textarea"
          rows={4}
          required
        ></textarea>
      </div>
      <div className="button-container">
        <button type="submit" className="button">
          Update Product
        </button>
      </div>
    </form>
  );
};

export default EditProduct;
