
const express = require('express');
const connectDB = require('./db.js');
const { addProducts,getProducts,delProducts,editProducts } = require('./controller/productcontroller.js');
const userRegister = require('./controller/userRegister.js');
const userLogin = require('./controller/userLogin.js');
const logout = require('./controller/logoutcontroller.js');
const cors = require('cors'); 
const app = express();
const expressSession = require("express-session");
const cartcontroller = require('./controller/cartcontroller.js');



//cors
const allowedOrigins = ['http://localhost:3000']; // Add your client's origin here

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressSession({
  secret: 'secret',
}));
global.loggedIn =null;
app.use("*",(req,res,next)=>{
  loggedIn=req.session.user;
  next();
});



//db connect
connectDB();

//for admin 
//addproducts
app.post('/api/products', addProducts);
//get products
app.get('/api/products', getProducts);
//delete products
app.delete('/api/products/:id',delProducts);
//edit products
app.put('/api/products/:id',editProducts);

//register
app.post('/signup',userRegister)
//Login
app.post("/login", userLogin);
//logout
app.post('/logout',logout);

//cart
app.post('/cart',cartcontroller);


app.listen(4000,()=>{
    console.log("Server is running on port 4000");
})