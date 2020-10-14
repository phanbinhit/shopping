const express = require('express');
const app = express();
const PORT = 5000 | process.env.PORT;

//router
const indexRouter = require('./routers/index.route');

//set view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//set static folder
app.use(express.static('public'));

app.use('/', indexRouter);

app.listen(PORT, () => {
    console.log('Server listening on port:' + PORT);
})