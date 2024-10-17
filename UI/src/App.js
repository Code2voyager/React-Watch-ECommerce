
  import './App.module.css';
  import Homepage from './components/Homepage/homepage';
  import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import AdminDashboard from './components/Admin/admindashboard';
  import ProductDetails from './components/ProductDetails/productdetails';
  import Register from './components/Reg/Reg';
  import Login from './components/Login/Log';
  import Cart from './components/Cart/cart';
  import {CartProvider} from './components/CartContext/cartcontext';
  import Checkout from './components/Checkout/checkout';
  import { AuthProvider } from './components/Authenticate/auth';
import Message from './components/Message/message';
import Women from './components/Women/women';
import Men from './components/Men/men';
import Sport from './components/Sport_watches/sport';
import Footer from './components/Footer/footer';


  function App() {
    
    return (
      <div className="App">
        <AuthProvider>
        <CartProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Homepage/>}/>
            <Route path='/admin' element={<AdminDashboard/>}/>
            <Route path='/reg' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/details/:id' element={<ProductDetails/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/checkout' element={<Checkout/>}/>
            <Route path='/message' element={<Message/>}/>
            <Route path='category/women' element={<Women/>}/>
            <Route path='category/men' element={<Men/>}/>
            <Route path='category/sport-watches' element={<Sport/>}/>
            <Route path='footer' element={<Footer />}/>



            

          </Routes>
        </Router>
        </CartProvider>
        </AuthProvider>
      </div>
    );
  }

  export default App;
