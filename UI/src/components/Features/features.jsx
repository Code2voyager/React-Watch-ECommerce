import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./features.module.css";

function Features() {
    const [featuredProducts, setFeaturedProducts] = useState([]);

  
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/products") // Assuming your API has an endpoint for featured products
      .then((response) => {
        setFeaturedProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching featured products", error);
      });
  }, []);
  return (
    <Container className="mt-5" id="featured-section">
   
    <div className="features-section">
    <h2 className="text-center mb-4">Why Choose Us</h2>
    <Row className="text-center">
        <Col md={4}>
            <div className={styles.feature}>
                <i className="fa fa-shield fa-3x mb-3" aria-hidden="true"></i>
                <h5>High Quality</h5>
                <p>Our products are crafted from the finest materials.</p>
            </div>
        </Col>
        <Col md={4}>
            <div className={styles.feature}>
                <i className="fa fa-truck fa-3x mb-3" aria-hidden="true"></i>
                <h5>Free Shipping</h5>
                <p>We offer free worldwide shipping on all orders.</p>
            </div>
        </Col>
        <Col md={4}>
            <div className={styles.feature}>
                <i className="fa fa-refresh fa-3x mb-3" aria-hidden="true"></i>
                <h5>30-Day Returns</h5>
                <p>No questions asked, hassle-free returns within 30 days.</p>
            </div>
        </Col>
    </Row>
</div>

    <h2 className="text-center mt-5 mb-4">Featured Products</h2>
    <Row>
      {featuredProducts.slice(9,14).map((product) => (
        <Col md={4} sm={6} xs={12} className="mb-4" key={product._id}>
          <Card
            className="shadow-sm h-100"
            style={{ borderRadius: "15px", overflow: "hidden" }}
          >
            <Card.Img
              variant="top"
              src={product.productImage}
              style={{
                height: "250px",
                objectFit: "cover",
                borderRadius: "15px 15px 0 0",
                background: "#f8f8f8",
              }}
            />
            <Card.Body>
              <Link to={`/details/${product._id}`} state={product}>
                <Card.Title
                  className="text-center"
                  style={{
                    cursor: "pointer",
                    textDecoration: "#023e8a",
                    fontWeight: "bold",
                  }}
                >
                  {product.productname}
                </Card.Title>
              </Link>
              <Card.Text className="text-center text-muted">
                {product.description}
              </Card.Text>
              <Card.Text className="text-center">
                <strong>${product.productCost}</strong>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
  )
}

export default Features