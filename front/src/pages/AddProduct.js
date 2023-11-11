import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function AddProduct() {
  const [product, setProduct] = useState({
    id: 0, // Initialize with 0 or any default value
    name: '',
    price: 0,
    quantity: 0
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send a request to create a new product
    axios.post('http://localhost:8080/api/products/insert', product)
      .then(response => {
        console.log('Product added successfully:', response.data);
        alert("Product added successfully");
        setProduct({
          id: 0,
          name: '',
          price: 0,
          quantity: 0
        });
        // Handle success, e.g., redirect to product list page
      })
      .catch(error => {
        console.error('Error adding product:', error);
        // Handle error
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <button className="bg-blue-500 text-white py-2 px-4 mt-4 rounded m-4">
        <Link to="/" className="text-white">All Products</Link>
      </button>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="id" className="block text-sm font-semibold mb-1">Product ID:</label>
          <input type="number" id="id" name="id" value={product.id} onChange={handleInputChange} className="w-full px-4 py-2 border rounded" />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-semibold mb-1">Product Name:</label>
          <input type="text" id="name" name="name" value={product.name} onChange={handleInputChange} className="w-full px-4 py-2 border rounded" />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-semibold mb-1">Price:</label>
          <input type="number" id="price" name="price" value={product.price} onChange={handleInputChange} className="w-full px-4 py-2 border rounded" />
        </div>
        <div className="mb-4">
          <label htmlFor="quantity" className="block text-sm font-semibold mb-1">Quantity:</label>
          <input type="number" id="quantity" name="quantity" value={product.quantity} onChange={handleInputChange} className="w-full px-4 py-2 border rounded" />
        </div>
        <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">Add Product</button>
      </form>
    </div>
  );
}
