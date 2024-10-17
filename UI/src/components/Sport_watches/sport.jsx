import React, { useEffect, useState } from "react";
import NavbarComponent from "../Navbar/navbar";
import {Container,Grid,Card,CardContent,CardMedia,Typography,Button,} from "@mui/material";
import { useCart } from "../CartContext/cartcontext";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";
import Footer from "../Footer/footer";
import styles from  './sport.module.css';


function Sport() {
  const [products, setProducts] = useState([]);

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


  const { dispatch } = useCart();

  const AddToCart = (product, quantity = 1) => {
    dispatch({ type: "ADD_TO_CART", payload: { ...product, quantity } });
  };

  return (
    <>
    <NavbarComponent />
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>
        Sport's Watches
      </Typography>
      <Grid container spacing={4}>
        {products.length > 0 ? (
          products
            .filter((product) => product.category === "Sports") 
            .map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product._id}>
                <Card variant="outlined">
                  <CardMedia
                    component="img"
                    height="250"
                    image={product.productImage} 
                    alt={product.productname} 
                    style={{ objectFit: "contain" }}
                  />
                  <CardContent style={{ cursor:'pointer' }}>
                    <Typography variant="h6" component="h3" gutterBottom className={styles.productTitle}>
                      {product.productname} 
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      ${product.productCost} 
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => AddToCart(product)} fullWidth
                      style={{ marginTop: "16px" }}
                    >
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
        ) : (
          <Typography variant="body1">
            No Sport's Watches products available at the moment.
          </Typography>
        )}
      </Grid>

    </Container>
    <Footer/>

  </>
  );
}

export default Sport;
