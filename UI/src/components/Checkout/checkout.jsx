import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, ListGroup, ListGroupItem, Form, Nav, Alert } from "react-bootstrap";
import { useAuth } from "../Authenticate/auth";
import { useCart } from "../CartContext/cartcontext";
import Navbar from "../Navbar/navbar";
import axios from "axios";
import "./checkout.module.css";

function Checkout() {
  const navigate = useNavigate();
  const { cart } = useCart();
  const { isAuthenticated } = useAuth();
  const totalPrice = cart.reduce((acc, item) => acc + item.productCost * item.quantity, 0);
  const [step, setStep] = useState(1);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    streetAddress: "",
    apartmentNumber: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState({});

  const validateShippingAddress = () => {
    const newErrors = {};
    const nameRegex = /^[a-zA-Z]+$/; 
    const digiRegex = /^\d+$/;
    const zipCodeRegex = /^\d{5}$/; // 5-digit zip code
 
    if (!shippingAddress.firstName || !nameRegex.test(shippingAddress.firstName)) {
      newErrors.firstName = "First name is required and must contain only letters.";
    }
    if (!shippingAddress.lastName || !nameRegex.test(shippingAddress.lastName)) {
      newErrors.lastName = "Last name is required and must contain only letters.";
    }
    if (!shippingAddress.streetAddress) {
      newErrors.streetAddress = "Street address is required.";
    }
    if (!shippingAddress.apartmentNumber || digiRegex.test(shippingAddress.apartmentNumber)) {
      newErrors.streetAddress = "Apartment Number is required and should be digits only!";
    }
    if (!shippingAddress.city) {
      newErrors.city = "City is required.";
    }
    if (!shippingAddress.state) {
      newErrors.state = "State is required.";
    }
    if (!shippingAddress.zipCode || !zipCodeRegex.test(shippingAddress.zipCode)) {
      newErrors.zipCode = "Zip code is required and must be a 5-digit number.";
    }
    if (!shippingAddress.country) {
      newErrors.country = "Country is required.";
    }
    return newErrors;
  };

  const handleShippingAddress = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handleNextShippingAddress = () => {
    const validationErrors = validateShippingAddress();
    if (Object.keys(validationErrors).length === 0) {
      setStep(2);
    } else {
      setErrors(validationErrors);
    }
  };

  const handlePaymentMethod = (e) => {
    setPaymentMethod(e.target.value);
    setStep(3);
  };

  const handleCardInfo = (e) => {
    e.preventDefault();
    setStep(4);
  };

  const handlePayment = async () => {
    const checkoutData = {
      userId: sessionStorage.getItem("userId"),
      shippingAddress,
      cartvalue: cart.map((item) => ({
        productName: item.productname,
        quantity: item.quantity,
        price: item.productCost,
      })),
    };
    try {
      const response = await axios.post("http://localhost:4000/cart", checkoutData);
      if (response.data === "cart created") {
        navigate("/message");
      } else {
        console.log("Unexpected response:", response.data);
      }
    } catch (error) {
      console.error("Error", error);
      alert("Something went wrong. Please try again later!!");
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const steps = [
    { step: 1, label: "Shipping" },
    { step: 2, label: "Payment Method" },
    { step: 3, label: "Card Information" },
    { step: 4, label: "Confirm" },
  ];

  return isAuthenticated ? (
    <>
      <Navbar />
      <Container className="mt-4">
        <h1 className="mb-4 text-center">Checkout</h1>
        <Nav className="justify-content-center mb-4 stepper">
          {steps.map((item, index) => (
            <Nav.Item key={index}>
              <Nav.Link
                className={`stepper-link ${item.step <= step ? "active" : ""} ${item.step < step ? "completed" : ""}`}
                disabled={item.step > step}
              >
                Step {item.step}: {item.label}
              </Nav.Link>
              {index < steps.length - 1 && <div className="step-line" />}
            </Nav.Item>
          ))}
        </Nav>
        {cart.length === 0 ? (
          <p className="text-center">Your cart is empty</p>
        ) : (
          <Row>
            <Col md={4}>
              <Card>
                <Card.Header as="h5">Cart Summary</Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
                    {cart.map((item, index) => (
                      <ListGroupItem key={index}>
                        <Row>
                          <Col xs={3}>
                            <Card.Img width={55} src={item.productImage} alt={item.productname} />
                          </Col>
                          <Col xs={3}>{item.productname}</Col>
                          <Col xs={3}>x{item.quantity}</Col>
                          <Col xs={3}>${(item.productCost * item.quantity).toFixed(2)}</Col>
                        </Row>
                      </ListGroupItem>
                    ))}
                    <ListGroupItem>
                      <Row>
                        <Col>State Tax (5%)</Col>
                        <Col>${(totalPrice * 0.05).toFixed(2)}</Col>
                      </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                      <Row>
                        <Col>Local Tax (3%)</Col>
                        <Col>${(totalPrice * 0.03).toFixed(2)}</Col>
                      </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                      <Row>
                        <Col>
                          <strong>Total with Tax</strong>
                        </Col>
                        <Col>
                          <strong>${(totalPrice * 1.08).toFixed(2)}</strong>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} offset={1}>
              <Card>
                <Card.Header as="h5">Checkout Steps</Card.Header>
                <Card.Body>
                  {step === 1 && (
                    <ListGroup variant="flush">
                      <ListGroupItem>
                        <Row>
                          <Col>Shipping Address</Col>
                          <Col>
                            <Form>
                              <Form.Group controlId="firstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                  type="text"
                                  name="firstName"
                                  value={shippingAddress.firstName}
                                  onChange={handleShippingAddress}
                                  isInvalid={!!errors.firstName}
                                  required
                                />
                                <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
                              </Form.Group>
                              <Form.Group controlId="lastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                  type="text"
                                  name="lastName"
                                  value={shippingAddress.lastName}
                                  onChange={handleShippingAddress}
                                  isInvalid={!!errors.lastName}
                                />
                                <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
                              </Form.Group>
                              <Form.Group controlId="streetAddress">
                                <Form.Label>Street Address</Form.Label>
                                <Form.Control
                                  type="text"
                                  name="streetAddress"
                                  value={shippingAddress.streetAddress}
                                  onChange={handleShippingAddress}
                                  isInvalid={!!errors.streetAddress}
                                />
                                <Form.Control.Feedback type="invalid">{errors.streetAddress}</Form.Control.Feedback>
                              </Form.Group>
                              <Form.Group controlId="apartmentNumber">
                                <Form.Label>Apartment Number</Form.Label>
                                <Form.Control
                                  type="text"
                                  name="apartmentNumber"
                                  value={shippingAddress.apartmentNumber}
                                  onChange={handleShippingAddress}
                                  isInvalid={!!errors.streetAddress}
                                />
                              </Form.Group>
                              <Form.Group controlId="city">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                  type="text"
                                  name="city"
                                  value={shippingAddress.city}
                                  onChange={handleShippingAddress}
                                  isInvalid={!!errors.city}
                                />
                                <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
                              </Form.Group>
                              <Form.Group controlId="state">
                                <Form.Label>State</Form.Label>
                                <Form.Control
                                  type="text"
                                  name="state"
                                  value={shippingAddress.state}
                                  onChange={handleShippingAddress}
                                  isInvalid={!!errors.state}
                                />
                                <Form.Control.Feedback type="invalid">{errors.state}</Form.Control.Feedback>
                              </Form.Group>
                              <Form.Group controlId="zipCode">
                                <Form.Label>Zip Code</Form.Label>
                                <Form.Control
                                  type="text"
                                  name="zipCode"
                                  value={shippingAddress.zipCode}
                                  onChange={handleShippingAddress}
                                  isInvalid={!!errors.zipCode}
                                />
                                <Form.Control.Feedback type="invalid">{errors.zipCode}</Form.Control.Feedback>
                              </Form.Group>
                              <Form.Group controlId="country">
                                <Form.Label>Country</Form.Label>
                                <Form.Control
                                  type="text"
                                  name="country"
                                  value={shippingAddress.country}
                                  onChange={handleShippingAddress}
                                  isInvalid={!!errors.country}
                                />
                                <Form.Control.Feedback type="invalid">{errors.country}</Form.Control.Feedback>
                              </Form.Group>
                              <Button variant="primary" onClick={handleNextShippingAddress}>
                                Next
                              </Button>
                            </Form>
                          </Col>
                        </Row>
                      </ListGroupItem>
                    </ListGroup>
                  )}
                  {step === 2 && (
                    <ListGroup variant="flush">
                      <ListGroupItem>
                        <Row>
                          <Col>Payment Method</Col>
                          <Col>
                            <Form>
                              <Form.Group controlId="paymentMethod">
                                <Form.Label>Payment Method</Form.Label>
                                <Form.Control as="select" value={paymentMethod} onChange={handlePaymentMethod}>
                                  <option value="">Select Payment Method</option>
                                  <option value="creditCard">Credit Card</option>
                                  <option value="paypal">PayPal</option>
                                </Form.Control>
                              </Form.Group>
                              <Button variant="primary" onClick={handlePaymentMethod}>
                                Next
                              </Button>
                            </Form>
                          </Col>
                        </Row>
                      </ListGroupItem>
                    </ListGroup>
                  )}
                  {step === 3 && (
                    <ListGroup variant="flush">
                      <ListGroupItem>
                        <Row>
                          <Col>Card Information</Col>
                          <Col>
                            <Form>
                              <Form.Group controlId="cardNumber">
                                <Form.Label>Card Number</Form.Label>
                                <Form.Control
                                  type="text"
                                  name="cardNumber"
                                  value={cardNumber}
                                  onChange={(e) => setCardNumber(e.target.value)}
                                />
                              </Form.Group>
                              <Form.Group controlId="expirationDate">
                                <Form.Label>Expiration Date</Form.Label>
                                <Form.Control
                                  type="text"
                                  name="expirationDate"
                                  value={expirationDate}
                                  onChange={(e) => setExpirationDate(e.target.value)}
                                />
                              </Form.Group>
                              <Form.Group controlId="cvv">
                                <Form.Label>CVV</Form.Label>
                                <Form.Control
                                  type="text"
                                  name="cvv"
                                  value={cvv}
                                  onChange={(e) => setCvv(e.target.value)}
                                />
                              </Form.Group>
                              <Button variant="primary" onClick={handleCardInfo}>
                                Submit Payment Info
                              </Button>
                            </Form>
                          </Col>
                        </Row>
                      </ListGroupItem>
                    </ListGroup>
                  )}
                  {step === 4 && (
                    <ListGroup variant="flush">
                      <ListGroupItem>
                        <Row>
                          <Col>Review Order &amp; Complete Purchase</Col>
                          <Col>
                            <Button variant="success" onClick={handlePayment}>
                              Confirm and Pay
                            </Button>
                          </Col>
                        </Row>
                      </ListGroupItem>
                    </ListGroup>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </>
  ) : null;
}

export default Checkout;
