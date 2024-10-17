const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    productname:{
        type: String,
        required: true
      },
    description:{
        type: String,
        required: true
      },
    productCost:{
        type: Number,
        required: true
      },
    productImage:{
        type: String,
        required: true
      },
      category:{
        type: String,
        required: true
      }

});
productSchema.pre("save",function(next){
    this.productname = this.productname.toLowerCase();
    next();
});
const productModel = new mongoose.model("product",productSchema);
module.exports = productModel;