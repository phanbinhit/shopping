const { response } = require("express")

module.exports = {
    singleProduct: (req, res, next) => {
        res.render('pages/product');
    }
}