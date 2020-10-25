const Product = require('../models/product.model');
const User = require('../models/user.model');

module.exports = {
    index: async (req, res, next) => {
        let user = await User.findById("5f9247eb873dd289ba2b9b32");
        let number = user.cart.length;
        
        let products = await Product.find();
        res.render('pages/index', { 
            products: products,
            number: number
         });
    },
    


}