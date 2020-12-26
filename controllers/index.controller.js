const Product = require('../models/product.model');
const User = require('../models/user.model');
const Category = require('../models/category.model');

module.exports = {
    index: async (req, res, next) => {
        let user = await User.findById("5fe6d6dc2040797fac54da43");
        let number = user.cart.length;
        let catelogy = await Category.find();
        
        let products = await Product.find();
        res.render('pages/index', { 
            products: products,
            number: number,
            catelogy: catelogy
         });
    },
    


}