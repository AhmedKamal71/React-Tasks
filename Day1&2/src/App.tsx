import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import UsersList from "./components/ClassComponent/ClassFetching";
import ImageSlider from "./components/ImageSlider/ImageSlider";
import UserCard from "./components/FunctionComponent/FunctionFetching";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <nav className="bg-yellow-500  p-6 shadow-lg">
          <div className="container mx-auto flex justify-center items-center">
            <ul className="flex space-x-6">
              <li>
                <Link
                  to="/"
                  className="nav-link transition duration-500 hover:text-gray-500"
                >
                  Image Slider
                </Link>
              </li>
              <li>
                <Link
                  to="/users-list"
                  className="nav-link transition duration-500 hover:text-gray-500"
                >
                  Users List
                </Link>
              </li>
              <li>
                <Link
                  to="/users-card"
                  className="nav-link transition duration-500 hover:text-gray-500"
                >
                  Users card
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="flex-grow container mx-auto p-8">
          <Routes>
            <Route path="/" element={<ImageSlider />} />
            <Route path="/users-list" element={<UsersList />} />
            <Route path="/users-card" element={<UserCard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
