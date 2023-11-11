package com.example.springbootmongodbatlas.service;

import com.example.springbootmongodbatlas.entity.Product;

import java.util.List;
import java.util.Optional;

public interface ProductService {

    public List<Product> getProducts();

    public Product addProduct(Product product);

    public Product deleteProduct(int id );
    public Optional<Product> getProductById(int id);

    public Product updateProduct(int id , Product product);
}
