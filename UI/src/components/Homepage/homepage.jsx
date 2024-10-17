import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar/navbar";
import Features from "../Features/features";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useCart } from "../CartContext/cartcontext";
import video2 from "../../assets/videos/video2.mp4";
import video1 from "../../assets/videos/video1.mp4";
import video3 from "../../assets/videos/video3.mp4";
import styles from "./homepage.module.css"; 
import Footer from "../Footer/footer";

function Homepage() {
  const [products, setProducts] = useState([]);
  const { dispatch } = useCart();

  
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  // Quantity 
  const updateQuantity = (index, value) => {
    setProducts((prevProducts) => {
      const newProducts = [...prevProducts];
      const product = newProducts[index];

      if (value === 1) {
        product.quantity = (product.quantity || 0) + 1;
      } else if (value === -1) {
        product.quantity = Math.max(1, (product.quantity || 1) - 1);
      }

      return newProducts;
    });
  };

  // Add to cart
  const AddToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity: product.quantity || 1 } });
  };

  return (
    <>
      <Navbar />
    
      <div className={styles.bannerContainer}>
        <Carousel fade>
          {[
            { src: video1, title: "Rolex Watch", text: "A symbol of timeless luxury and precision in watchmaking." },
            { src: video2, title: "Omega", text: "Renowned for its innovation and space exploration heritage." },
            { src: video3, title: "Tag Heuer", text: "Blending sporty designs with Swiss craftsmanship." },
          ].map((video, index) => (
            <Carousel.Item key={index}>
              <video className="d-block w-100" src={video.src} autoPlay loop muted style={{ maxHeight: "400px", objectFit: "cover" }} />
              <Carousel.Caption>
                <h3>{video.title}</h3>
                <p>{video.text}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

     
      <Container className="mt-4">
        <h1 className="text-center">Our Products</h1>
        <Row>
          {products.slice(0, 9).map((product, index) => (
            <Col md={4} sm={6} xs={12} className="mb-4" key={product._id}>
              <Card className={`shadow-sm h-100 ${styles.productCard}`}>
                <Card.Img variant="top" src={product.productImage} className={styles.productImage} />
                <Card.Body>
                  <Link to={`/details/${product._id}`} state={product} className={styles.productLink}>
                    <Card.Title className="text-center">{product.productname}</Card.Title>
                  </Link>
                  <Card.Text className="text-center">
                    <strong>${product.productCost}</strong>
                  </Card.Text>
                  <div className={`d-flex align-items-center justify-content-center mb-2`}>
                    <Button variant="outline-secondary" onClick={() => updateQuantity(index, -1)} size="sm">-</Button>
                    <span className="mx-2">{product.quantity || 1}</span>
                    <Button variant="outline-secondary" onClick={() => updateQuantity(index, 1)} size="sm">+</Button>
                  </div>
                  <Button className={`w-100 ${styles.addToCartBtn}`} onClick={() => AddToCart(product)}>Add to Cart</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Features />
      <Footer/>
    </>
  );
}

export default Homepage;
