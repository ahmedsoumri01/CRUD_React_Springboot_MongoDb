import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [filterId, setFilterId] = useState('');

  useEffect(() => {
    // Fetch data when the component mounts
    axios.get('http://localhost:8080/api/products/all')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []); // Empty dependency array to run the effect only once when the component mounts

  const handleDelete = (productId) => {
    // Send a request to delete the product
    axios.delete(`http://localhost:8080/api/products/delete/${productId}`)
      .then(response => {
        console.log('Product deleted successfully:', response.data);
        // Update the product list after deletion
        alert("Product deleted successfully");
        setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
      })
      .catch(error => {
        console.error('Error deleting product:', error);
        // Handle error
      });
  };

  const handleFilterChange = (e) => {
    setFilterId(e.target.value);
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    // Fetch data for the specified product ID
    axios.get(`http://localhost:8080/api/products/${filterId}`)
      .then(response => {
        setProducts([response.data]); // Update the product list with the filtered product
      })
      .catch(error => {
        console.error('Error fetching product:', error);
      });
  };

  const handleClearFilter = () => {
    setFilterId('');
    // Fetch all products
    axios.get('http://localhost:8080/api/products/all')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All products</h1>

      <button className="bg-green-500 text-white py-2 px-4 mt-4 rounded m-4">
        <Link to="/addproduct" className="text-white">Add New product</Link>
      </button>

      <form onSubmit={handleFilterSubmit} className="mb-4">
        <label htmlFor="filterId" className="block text-sm font-semibold mb-1">Filter by ID:</label>
        <div className="flex">
          <input
            type="text"
            id="filterId"
            value={filterId}
            onChange={handleFilterChange}
            className="w-full px-4 py-2 border rounded"
          />
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 ml-2 rounded">Filter</button>
        </div>
      </form>

      {filterId && (
        <button onClick={handleClearFilter} className="bg-yellow-500 text-white py-2 px-4 rounded mb-4">
          Clear Filter
        </button>
      )}

      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Quantity</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{product.id}</td>
              <td className="py-2 px-4 border-b">{product.name}</td>
              <td className="py-2 px-4 border-b">{product.price}</td>
              <td className="py-2 px-4 border-b">{product.quantity}</td>
              <td className="py-2 px-4 border-b">
                <Link to={`/product/${product.id}`} className="text-white bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-400 m-1">Edit</Link>
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-400 m-1"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
