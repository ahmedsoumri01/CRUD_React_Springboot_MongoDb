import React from 'react';
import { Routes, Route } from "react-router-dom";
/* import Home from "./pages/Home"; */
import AllProducts from "./pages/AllProducts";
import EditProduct from "./pages/EditProduct";
import AddProduct from './pages/AddProduct';
function App() {
  return (
    <>
      <Routes>
       {/*  <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<AllProducts />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/product/:id" element={<EditProduct />} />
       
      </Routes>
    </>
  );
}

export default App;
