const express = require('express');
const app = express();
const PORT = 5000 | process.env.PORT;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//router
const indexRouter = require('./routers/user/index.route');
const productRouter = require('./routers/user/product.route');
const cartRouter = require('./routers/user/cart.route');
const cartMiddleware = require('./middlewares/cart.middleware');
const adminCategories = require('./routers/admin/admin_categories');
const adminProducts = require('./routers/admin/admin_products');
const authRouter = require('./routers/user/auth.route');
const orderRouter = require('./routers/user/order.route');
//const adminProducts = require('./routers/admin/admin_products');


//set view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//set static folder
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//connect mongodb
mongoose.connect('mongodb+srv://admin:admin@cluster0.abxfv.mongodb.net/shopping?retryWrites=true&w=majority', {useNewUrlParser: true,  useUnifiedTopology: true }, () => {
    console.log('connect to mongo db');
})

app.use(cartMiddleware);
app.use('/', indexRouter);
app.use('/product', productRouter);
app.use('/cart', cartRouter);
app.use('/auth', authRouter);
app.use('/admin/categories', adminCategories);
app.use('/admin/products', adminProducts);
app.use('/order', orderRouter);

app.listen(PORT, () => {
    console.log('Server listening on port:' + PORT);
})