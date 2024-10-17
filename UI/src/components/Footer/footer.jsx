import React from 'react';
import {Container,Grid,Typography,Link,Box,IconButton, } from '@mui/material';
import {Facebook,Twitter,Instagram,LinkedIn,} from "@mui/icons-material";

function Footer() {
  return (
    <Box
    sx={{
      backgroundColor: "#343a40",
      color: "white",
      padding: "40px 0",
      marginTop: "auto", 
    }}
  >
    <Container>
      <Grid container spacing={4}>

        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            Quick Links
          </Typography>
          <Link href="/" color="inherit" underline="hover">
            Home
          </Link>
          <br />
          <Link href="/features" color="inherit" underline="hover">
            Features
          </Link>
          <br />
          
        </Grid>

     
        <Grid item xs={1} sm={4}>
          <Typography variant="h6" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body2">
            Email: <Link href="mailto:support@example.com" color="inherit">NS@Gmail.com</Link>
          </Typography>
          <Typography variant="body2">
            Phone: (123) 456-7890
          </Typography>
          <Typography variant="body2">
            Address: 65,british Park,British columbia
          </Typography>
        </Grid>

        
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            Follow Us
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <IconButton color="inherit" aria-label="Facebook">
              <Facebook />
            </IconButton>
            <IconButton color="inherit" aria-label="Twitter">
              <Twitter />
            </IconButton>
            <IconButton color="inherit" aria-label="Instagram">
              <Instagram />
            </IconButton>
            <IconButton color="inherit" aria-label="LinkedIn">
              <LinkedIn />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

  
      <Box mt={3} textAlign="center">
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} Your Company Name. All Rights Reserved.
        </Typography>
        <Link href="#" color="inherit" underline="hover" sx={{ ml: 2 }}>
          Privacy Policy
        </Link>
        <Link href="#" color="inherit" underline="hover" sx={{ ml: 2 }}>
          Terms of Service
        </Link>
      </Box>
    </Container>
  </Box>
  )
}

export default Footer