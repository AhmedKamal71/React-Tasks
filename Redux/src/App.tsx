import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import ErrorComponent from "./components/Error/ErrorComponent";
import FunctionComponent from "./components/Function/FunctionComponent";
import AddProduct from "./components/AddProduct/AddProduct";
import EditProduct from "./components/EditProduct/EditProduct";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FunctionComponent />} />
          <Route path="/product" element={<FunctionComponent />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route path="/details/:id" element={<ProductDetails />} />
          <Route path="*" element={<ErrorComponent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
