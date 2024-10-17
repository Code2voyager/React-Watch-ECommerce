
const CartItem = require('../models/cart'); 
const userModel = require('../models/user');
// const router = express.Router();

const cartcontroller = async (req, res) => {
    console.log("Received request:", req.body);
    const { userId, shippingAddress, cartvalue } = req.body; // Destructure from body
    
    // Validate the input
    if (!userId || !shippingAddress || !cartvalue || !cartvalue.length) {
        return res.status(400).json({ message: "User ID, shipping address, and cart items are required." });
    }

    try {
        const user = await userModel.findById(userId); // Find user by ID
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        let cartItem = await CartItem.findOne({ userId });
        if (cartItem) {
            cartItem.cartItems.push(...cartvalue.map(item => ({
                productName: item.productName,
                quantity: item.quantity,
                price: item.price,
                createdAt: new Date(),
            })));
            cartItem.shippingAddress = shippingAddress;
            await cartItem.save(); // Save the updated document
            return res.status(200).json({ message: "Cart updated successfully.", cartItem });
        } else {
            cartItem = new CartItem({
                userId,
                shippingAddress,
                cartItems: cartvalue.map(item => ({
                    productName: item.productName,
                    quantity: item.quantity,
                    price: item.price,
                    createdAt: new Date(),
                })),
            });
            await cartItem.save(); // Save the new cart item
            return res.status(201).json({ message: "New cart created with order.", cartItem });
        }
    } catch (error) {
        console.error(error); // Log error for debugging
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = cartcontroller;
