import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Authenticate/auth";
import axios from "axios";
import styles from "./Log.module.css";
import NavbarComponent from "../Navbar/navbar";
import Footer from "../Footer/footer";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(false);  // Loading state

    const {login} = useAuth();

    const validateForm = () => {
        const errors = {};

        if (!email) {
            errors.email = 'Email is required.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.email = 'Invalid email address.';
        }

        if (!password) {
            errors.password = 'Password is required.';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    }

    const submit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const userinfo = {
                email,
                password
            };

            setLoading(true);  
            try {
                const response = await axios.post("http://localhost:4000/login", userinfo);

                if (response.data.length > 0) {
                    const user = response.data[0];

                    // Store firstName and isAuthenticated in sessionStorage
                sessionStorage.setItem("firstName", user.firstName);
                sessionStorage.setItem("userId", user._id);
                sessionStorage.setItem("isAuthenticated", "true");

                    login();

                    // Navigate based on user role
                    if (user.firstName === 'admin') {
                        navigate("/admin", { state: user });
                    }
                     else {
                       
                       navigate("/", { state: user });
                    }
                }else if (response.data === "incorrectPassword"){
                    console.log("Incorrect Password");

                }else if(response.data === "notExists") {
                    alert("User not exists please try again");
                    
                }
                else {
                    
                    alert("Invalid login credentials.");
                }

            } catch (error) {
                console.error("Error:", error);
                alert("Something went wrong. Please try again.");
            } finally {
                setLoading(false);  
            }
        }
    }

    return (
        <>
        <NavbarComponent/>
        <div className={styles.container}>
            <div className={styles.Login}>
                <h1>Login</h1>
                <form onSubmit={submit}>
                    <input
                        type="email"
                        onChange={(e) => { setEmail(e.target.value) }}
                        placeholder="Email address"
                        name="email"
                        aria-label="Email address"
                    />
                    {formErrors.email && <p className={styles.errorMsg}>{formErrors.email}</p>}
                    <input
                        type="password"
                        onChange={(e) => { setPassword(e.target.value) }}
                        placeholder="Enter your Password"
                        name="password"
                        aria-label="Password"
                    />
                    {formErrors.password && <p className={styles.errorMsg}>{formErrors.password}</p>}
                    <input type="submit" value={loading ? "Logging in..." : "Login"} disabled={loading} />
                </form>
                <br />
                <p>OR</p>
                <Link to="/reg">Register Here</Link>
            </div>
        </div>
        <Footer/>
        </>
    )
}

export default Login;
