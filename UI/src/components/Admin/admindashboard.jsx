import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Button, Form, Modal } from 'react-bootstrap';
import Navbar from '../Navbar/navbar';


const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const [productForm, setProductForm] = useState({
    productname: '',
    description: '',
    productCost: '',
    productImage: '',
    category:''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('There was an error fetching the products!', error);
    }
  };

  const handleShow = (product) => {
    setEditProduct(product);
    setProductForm(product || {
      productname: '',
      description: '',
      productCost: '',
      productImage: '',
      category:'',
    });
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setEditProduct(null);
  };

  const handleChange = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
        if (editProduct) {
            // Updating existing product
            await axios.put(`http://localhost:4000/api/products/${editProduct._id}`, productForm);
        } else {
            // Adding new product
            await axios.post('http://localhost:4000/api/products', productForm);
        }
        fetchProducts(); 
        handleClose(); 
    } catch (error) {
        console.error('There was an error saving the product!', error.response ? error.response.data : error.message);
        
    }
};


  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('There was an error deleting the product!', error);
    }
  };

  return (
    <>    <Navbar />
    <Container>
      <h1>Admin Dashboard</h1>
      <Button variant="primary" onClick={() => handleShow(null)}>Add Product</Button>
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Description</th>
            <th>Cost</th>
            <th>Image</th>
            <th>Category</th>
            <th>Actions</th>
            
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.productname}</td>
              <td>{product.description}</td>
              <td>{product.productCost}</td>
              <td><img src={product.productImage} alt={product.productname} style={{ width: '50px' }} /></td>
              <td>{product.category}</td>
              
              <td>
                <Button variant="warning" onClick={() => handleShow(product)}>Edit</Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(product._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editProduct ? 'Edit Product' : 'Add Product'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="productname">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="productname"
                value={productForm.productname}
                onChange={handleChange}
                placeholder="Enter product name"
              />
            </Form.Group>
            <Form.Group controlId="description" className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={productForm.description}
                onChange={handleChange}
                placeholder="Enter description"
              />
            </Form.Group>
            <Form.Group controlId="productCost" className="mt-3">
              <Form.Label>Cost</Form.Label>
              <Form.Control
                type="number"
                name="productCost"
                value={productForm.productCost}
                onChange={handleChange}
                placeholder="Enter product cost"
              />
            </Form.Group>
            <Form.Group controlId="productImage" className="mt-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="productImage"
                value={productForm.productImage}
                onChange={handleChange}
                placeholder="Enter image URL"
              />
            </Form.Group>
            <Form.Group controlId="category" className="mt-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={productForm.category}
                onChange={handleChange}
                placeholder="Enter product category"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {editProduct ? 'Save Changes' : 'Add Product'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
    </>

  );
};

export default AdminDashboard;
