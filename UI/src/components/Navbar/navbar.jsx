import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { User, ShoppingCart } from "@phosphor-icons/react";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCart } from "../CartContext/cartcontext";
import axios from "axios";
import "./navbar.module.css";

function NavbarComponent() {
  const [searchproducts, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userFirstName, setUserFirstName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dataFiltered, setDataFiltered] = useState([]);
  const navigate = useNavigate();
  const { cartcount } = useCart();
  


  useEffect(() => {
    const firstName = sessionStorage.getItem("firstName");
    const isAuthenticated =
      sessionStorage.getItem("isAuthenticated") === "true";

    if (isAuthenticated && firstName) {
      setIsLoggedIn(true);
      setUserFirstName(firstName);
    }
  }, []);

 
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

  
  useEffect(() => {
    if (searchproducts.length) {
      setDataFiltered(filterData(searchQuery, searchproducts));
    }
  }, [searchQuery, searchproducts]);

  const filterData = (query, products) => {
    if (!query) {
      return []; 
    }
    return products.filter((product) => {
      const productName = product.productname || "";
      return productName.toLowerCase().includes(query.toLowerCase());
    });
  };

  
  const handleLogout = () => {
    sessionStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("firstName");
    setIsLoggedIn(false);
    setUserFirstName("");
    navigate("/");
  };

  
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary navcont">
      <Container fluid>
        <LinkContainer to="/">
          <Navbar.Brand className="navbar-logo">NS-Shop</Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle
          aria-controls="navbarScroll"
          onClick={() => setIsOpen(!isOpen)}
        />
        <Navbar.Collapse id="navbarScroll" in={isOpen}>
          <Nav className="me-auto ms-5">
            <LinkContainer to="/">
              <Nav.Link onClick={() => setIsOpen(false)}>Home</Nav.Link>
            </LinkContainer>

            <Nav.Link
              href="#featured-section"
              onClick={(e) => scrollToSection(e, "featured-section")}
            >
              Featured
            </Nav.Link>

            <NavDropdown title="Category" id="navbarScrollingDropdown">
              <LinkContainer to="/category/men">
                <NavDropdown.Item onClick={() => setIsOpen(false)}>
                  Men
                </NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/category/women">
                <NavDropdown.Item onClick={() => setIsOpen(false)}>
                  Women
                </NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <LinkContainer to="/category/sport-watches">
                <NavDropdown.Item onClick={() => setIsOpen(false)}>
                  Sport Watches
                </NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          </Nav>

          <div className="d-flex align-items-center ms-5 me-5 position-relative">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                marginRight: "10px",
                padding: "5px",
                width: "250px",
              }}
            />
            {dataFiltered.length > 0 && searchQuery && (
              <div
                className="search-results"
                style={{
                  position: "absolute",
                  top: "35px", 
                  left: "0",
                  backgroundColor: "white",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  zIndex: 1000,
                  width: "250px",
                  maxHeight: "200px",
                  overflowY: "auto",
                  cursor:"pointer"
                }}
              >
                {dataFiltered.map((product) => (
                  <LinkContainer to={`/details/${product._id}`} state={product}>
                    <div
                      className="search-result-item"
                      style={{
                        padding: "10px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setSearchQuery(""); 
                       
                      }}
                    >
                      {product.productname} 
                    </div>
                  </LinkContainer>
                ))}
              </div>
            )}
            <NavDropdown
              title={
                isLoggedIn ? (
                  userFirstName
                ) : (
                  <User size={24} className="user-icon ms-5" />
                )
              }
              id="user-dropdown"
              align="end"
            >
              {isLoggedIn ? (
                <>
                  <LinkContainer to="/profile">
                    <NavDropdown.Item onClick={() => setIsOpen(false)}>
                      Profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </>
              ) : (
                <LinkContainer to="/login">
                  <NavDropdown.Item onClick={() => setIsOpen(false)}>
                    Login
                  </NavDropdown.Item>
                </LinkContainer>
              )}
            </NavDropdown>

            <LinkContainer to="/cart">
              <Nav.Link
                className="position-relative"
                onClick={() => setIsOpen(false)}
              >
                <ShoppingCart size={24} className="ms-5 cart-icon" />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartcount}
                </span>
              </Nav.Link>
            </LinkContainer>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
