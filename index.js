const express = require('express');
const app = express();
const PORT = 9007 | process.env.PORT;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const path = require('path');

//router
const indexRouter = require('./routers/user/index.route');
const productRouter = require('./routers/user/product.route');
const cartRouter = require('./routers/user/cart.route');
const cartMiddleware = require('./middlewares/cart.middleware');
const adminCategories = require('./routers/admin/admin_categories');
const adminProducts = require('./routers/admin/admin_products');
const authRouter = require('./routers/user/auth.route');
const orderRouter = require('./routers/user/order.route');
const sessionMiddelware = require('./middlewares/session.middleware');
//const adminProducts = require('./routers/admin/admin_products');


//set view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//set static folder
app.use(express.static('public'));
app.use(cookieParser("dadsa"));

//check session
// app.all('/', sessionMiddelware);

app.use(cartMiddleware);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//connect mongodb
mongoose.connect('mongodb+srv://admin:admin@cluster0.abxfv.mongodb.net/shopping?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connect to mongo db');
})

// Express fileUpload middleware
app.use(fileUpload());

// Express Validator middleware
app.use(expressValidator({
    customValidators: {
        isImage: (value, filename) => {
            var extension = (path.extname(filename)).toLowerCase();
            switch (extension) {
                case '.jpg':
                    return '.jpg';
                case '.jpeg':
                    return '.jpeg';
                case '.png':
                    return '.png';
                default:
                    return false;
            }
        }
    }
}));


app.all('/', sessionMiddelware, indexRouter);
app.all('/product', sessionMiddelware, productRouter);
app.all('/cart', sessionMiddelware,cartRouter);
app.use('/auth', authRouter);
app.all('/admin/categories',sessionMiddelware, adminCategories);
app.all('/admin/products', sessionMiddelware,adminProducts);
app.all('/order', sessionMiddelware, orderRouter);

app.listen(PORT, () => {
    console.log('Server listening on port:' + PORT);
})