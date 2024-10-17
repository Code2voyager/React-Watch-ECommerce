import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/navbar";
import { Container, Row, Col, Image, Card, Button, Form } from "react-bootstrap";
import { useCart } from "../CartContext/cartcontext";
import Footer from "../Footer/footer";

function ProductDetails() {
  const location = useLocation();
  const product = location.state;
  const [quantity, setQuantity] = useState(1);
  const { dispatch } = useCart();
  const navigate = useNavigate();

  
  if (!product) {
    return <div>Product not found</div>; 
  }

  const { productname, productCost, description, productImage } = product;

  // Add to cart
  const addToCart = () => {
    if (quantity > 0) {
      dispatch({ type: 'ADD_TO_CART', payload: { productname, productCost, productImage, quantity } });
      navigate("/cart");
    }
  };

  return (
    <>
      <Navbar />
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={10}>
            <Card className="shadow-lg p-4 rounded product-card">
              <Row>
                <Col md={6}>
                  <Image src={productImage} alt={productname} fluid className="product-image" />
                </Col>
                <Col md={6} className="d-flex flex-column justify-content-between">
                  <div>
                    <Card.Title className="product-title">{productname}</Card.Title>
                    <Card.Text className="product-price">
                      <strong>Price:</strong> ${productCost}
                    </Card.Text>
                    <Card.Text className="product-description">{description}</Card.Text>
                  </div>
                  <div className="mt-4">
                    <div className="quantity-controls d-flex align-items-center">
                      <Button className="quantity-btn" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>-</Button>
                      <Form.Control type="number" value={quantity} readOnly className="quantity-input mx-2" />
                      <Button className="quantity-btn" onClick={() => setQuantity((q) => q + 1)}>+</Button>
                    </div>
                    <Button className="mt-3 w-100 add-to-cart-btn" onClick={addToCart}>Add to Cart</Button>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer/>
    </>
  );
}

export default ProductDetails;
