const Product = require('../models/product');


//admin : add products
    const addProducts = async(req,res) =>{
        try {
            const products = req.body; // Assume an array of product objects is sent in the request body
            const insertedProducts = await Product.insertMany(products);
            res.status(201).json(insertedProducts);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

//admin:delete products
const delProducts = async(req,res) =>{
    try {
        const id = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if(!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
            }
            res.status(200).json({ message: "Product deleted successfully" });
            } catch (error) {
                res.status(500).json({ message: error.message });
                }
            
    };

// admin:edit products
const editProducts = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedProduct = req.body;

        // Ensure that the updatedProduct contains valid data
        if (!updatedProduct) {
            return res.status(400).json({ message: "Invalid product data" });
        }

        // Use async/await instead of callbacks
        const product = await Product.findByIdAndUpdate(id, updatedProduct, { new: true }).exec();

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




//To fetch products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addProducts,
    getProducts,
    delProducts,
    editProducts
};