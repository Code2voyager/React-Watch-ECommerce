import React from 'react';
import {  useNavigate } from "react-router-dom";
import { Container,Row, Col, Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useCart } from '../CartContext/cartcontext';
import { useAuth } from "../Authenticate/auth";
import Navbar from '../Navbar/navbar';
import './cart.module.css';

function Cart() {
  const navigate = useNavigate();
  const { cart, dispatch } = useCart();
  const { isAuthenticated } = useAuth();


  //  total price
  const totalPrice = cart.reduce((acc, item) => acc + item.productCost * item.quantity, 0);


  const removeFromCart = (product) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { productname: product.productname } });
  };

  const handleCheckout = () => {
    if(!isAuthenticated){
      alert('Please login to checkout');
      navigate('/login');

    }else{
      navigate('/checkout');
    }
    
  };

  return (
    <>
      <Navbar />
      <Container className="mt-4">
        <h1 className="mb-4 text-center">Your Cart</h1>
        {cart.length === 0 ? (
          <p className="text-center">Your cart is empty</p>
        ) : (
          <>
            <Row>
              
              <Col md={8}>
                <ListGroup>
                  {cart.map((product, index) => (
                    <ListGroupItem key={index} className="mb-3">
                      <Row className="align-items-center">
                        <Col md={3}>
                          <Card.Img src={product.productImage} alt={product.productname} />
                        </Col>
                        <Col md={3}>
                          <h5>{product.productname}</h5>
                          <p>${product.productCost}</p>
                        </Col>
                        <Col md={3}>
                          <p>Quantity: {product.quantity}</p>
                        </Col>
                        <Col md={3}>
                          <Button variant="danger" onClick={() => removeFromCart(product)}>Remove</Button>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </Col>

              <Col md={4}>
                <Card>
                  <Card.Header as="h5">Order Summary</Card.Header>
                  <Card.Body>
                    <ListGroup variant="flush">
                      <ListGroupItem>
                        <Row>
                          <Col>Total Items</Col>
                          <Col>{cart.reduce((acc, item) => acc + item.quantity, 0)}</Col>
                        </Row>
                      </ListGroupItem>
                      <ListGroupItem>
                        <Row>
                          <Col>Total Price</Col>
                          <Col>${totalPrice.toFixed(2)}</Col>
                        </Row>
                      </ListGroupItem>
                    </ListGroup>
                    <Button variant="success" className="mt-3 w-100" size="lg" onClick={handleCheckout}>
                      Proceed to Checkout
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
}

export default Cart;