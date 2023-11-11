package com.example.springbootmongodbatlas.controller;

import com.example.springbootmongodbatlas.entity.Product;
import com.example.springbootmongodbatlas.service.ProductService;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    private ProductService productService;
    
 
    @GetMapping("/all")
    public List<Product> getProducts() {
       return productService.getProducts();
    }
    @GetMapping("/{id}")
    public ResponseEntity<Product> findProductById(@PathVariable Integer id) {
        Optional<Product> product = productService.getProductById(id);
        return product.map(p -> new ResponseEntity<>(p, HttpStatus.OK))
                      .orElseGet(() -> new ResponseEntity<>(HttpStatus.NO_CONTENT));
    }


    @PostMapping("/insert")
    public Product insert(@RequestBody Product product){
        return  productService.addProduct(product);
    }

    @PutMapping("/update/{id}")
   public Product update(@PathVariable int id,@RequestBody Product product ){
       return productService.updateProduct(id,product);
    }

    @DeleteMapping("/delete/{id}")
    public Product delete(@PathVariable int id ){

        return  productService.deleteProduct(id);
    }
}
