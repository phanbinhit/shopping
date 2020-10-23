const express = require('express');
const app = express();
const PORT = 5000 | process.env.PORT;
const mongoose = require('mongoose');

//router
const indexRouter = require('./routers/index.route');
const productRouter = require('./routers/product.route');
const cartRouter = require('./routers/cart.route');

//set view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//set static folder
app.use(express.static('public'));

//connect mongodb
mongoose.connect('mongodb://localhost:27017/shopping-web', {useNewUrlParser: true,  useUnifiedTopology: true }, () => {
    console.log('connect to mongo db');
})

app.use('/', indexRouter);
app.use('/product', productRouter);
app.use('/cart', cartRouter);

app.listen(PORT, () => {
    console.log('Server listening on port:' + PORT);
})