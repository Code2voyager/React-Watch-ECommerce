import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from './Reg.module.css';
import Footer from "../Footer/footer";
import NavbarComponent from "../Navbar/navbar";

function Register() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [age, setAge] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");

  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!firstName) {
      errors.firstName = "First name is required";
    } else if (!/^[^-\s\d][a-zA-Z\s-]+$/.test(firstName)) {
      errors.firstName = "First Name must contain only alphabetic characters";
    }
    if (!lastName) {
      errors.lastName = "Last name is required";
    } else if (!/^[^-\s\d][a-zA-Z\s-]+$/.test(lastName)) {
      errors.lastName = "Last Name must contain only alphabetic characters";
    }
    if (!email) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Invalid email address.";
    }

    if (!password) {
      errors.password = "Password is required.";
    }
    if (!phoneNumber) {
      errors.phoneNumber = "Phone number is required.";
    } else if (!/^\d{3}\d{4}\d{3}$/.test(phoneNumber)) {
      errors.phoneNumber = "Phone number must be in the format XXXXXXXXXX.";
    }
    if (!age) {
      errors.age = "Age is required.";
    } else if (age < 20 || age > 70) {
      errors.age = "Age must be between 20 and 70.";
    }
    if (!dob) {
      errors.dob = "Date of birth is required";
    }

    if (!gender) {
      errors.gender = "Gender is required";
    }

    if (!address) {
      errors.address = "Address is required";
    } else if (address.length < 10) {
      errors.address = "Address must be at least 10 characters long";
    }

    if (!city) {
      errors.city = "City is required";
    } else if (!/^[a-zA-Z\s]+$/.test(city)) {
      errors.city = "City must contain only alphabetic characters";
    }

    if (!zipCode) {
      errors.zipCode = "Zip code is required";
    } else if (!/^[A-Z]\d[A-Z] \d[A-Z]\d$/.test(zipCode)) {
      errors.zipCode = "Zip code must be in the format A1A 1A1";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  async function submit(e) {
    e.preventDefault();

    if (validateForm()) {
      const formData = {
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        age,
        dob,
        gender,
        address,
        city,
        zipCode
      };
      try {
        const response = await axios.post("http://localhost:4000/signup", formData);
        console.log("Response Data:", response.data);
        if (response.data === "user created") {
          console.log("Navigating to login");
          navigate("/login");
        } else {
          console.log("Unexpected response:", response.data);
        }
      } catch (error) {
        console.error("Error", error);
        alert("Something went wrong. Please try again later!!");
      }
    }
  }

  return (
    <>
    <NavbarComponent/>
    <div className={styles.container}>
      <h2 className={styles.title}>Register</h2>
      <form onSubmit={submit}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="firstName">First Name</label>
          <input
            className={styles.input}
            type="text"
            id="firstName"
            name="firstName"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          {formErrors.firstName && <p className={styles.errorMsg}>{formErrors.firstName}</p>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="lastName">Last Name</label>
          <input
            className={styles.input}
            type="text"
            id="lastName"
            name="lastName"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          {formErrors.lastName && <p className={styles.errorMsg}>{formErrors.lastName}</p>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="email">Email</label>
          <input
            className={styles.input}
            type="email"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {formErrors.email && <p className={styles.errorMsg}>{formErrors.email}</p>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="password">Password</label>
          <input
            className={styles.input}
            type="password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {formErrors.password && <p className={styles.errorMsg}>{formErrors.password}</p>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="phoneNumber">Phone Number</label>
          <input
            className={styles.input}
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          {formErrors.phoneNumber && <p className={styles.errorMsg}>{formErrors.phoneNumber}</p>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="age">Age</label>
          <input
            className={styles.input}
            type="text"
            id="age"
            name="age"
            onChange={(e) => setAge(e.target.value)}
            required
          />
          {formErrors.age && <p className={styles.errorMsg}>{formErrors.age}</p>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="dob">Date of Birth</label>
          <input
            className={styles.input}
            type="date"
            id="dob"
            name="dob"
            onChange={(e) => setDob(e.target.value)}
            required
          />
          {formErrors.dob && <p className={styles.errorMsg}>{formErrors.dob}</p>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="gender">Gender</label>
          <select
            className={styles.input}
            id="gender"
            name="gender"
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {formErrors.gender && <p className={styles.errorMsg}>{formErrors.gender}</p>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="address">Address</label>
          <input
            className={styles.input}
            type="text"
            id="address"
            name="address"
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          {formErrors.address && <p className={styles.errorMsg}>{formErrors.address}</p>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="city">City</label>
          <input
            className={styles.input}
            type="text"
            id="city"
            name="city"
            onChange={(e) => setCity(e.target.value)}
            required
          />
          {formErrors.city && <p className={styles.errorMsg}>{formErrors.city}</p>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="zipCode">Zip Code</label>
          <input
            className={styles.input}
            type="text"
            id="zipCode"
            name="zipCode"
            onChange={(e) => setZipCode(e.target.value)}
            required
          />
          {formErrors.zipCode && <p className={styles.errorMsg}>{formErrors.zipCode}</p>}
        </div>

        <div className={styles.formGroup}>
          <button className={styles.button} type="submit">Register</button>
        </div>
      </form>
      <div className={styles.loginLink}>
        <Link to="/login">Already have an account? Login here</Link>
      </div>
    </div>
    <Footer/>
    </>

  );
}

export default Register;
