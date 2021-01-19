const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const connectDB = require('./config/connectDB')
require('dotenv').config({
    path: './config/config.env'
});

const app = express()
const PORT = process.env.PORT || 5000;

// Use bodyParser
app.use(bodyParser.json());

// Connect to Database
connectDB()

// Config for only development
if (process.env.NODE_ENV === 'development') {
    app.use(cors())
    

    //Morgan give information about each request
    //Cors it's allow to deal with react for localhost:3000 without any problem
    app.use(morgan('dev'))
}




// Load all routes
const allUserRouter = require('./routes/user.route');
const allColorRouter = require('./routes/color.route');
const allSizeRouter = require('./routes/size.route');
const allCategoryRouter = require('./routes/category.route');
const allProductRouter = require('./routes/product.route');
const allColorProductRouter = require('./routes/color_product');
const allReviewRouter = require('./routes/review.route');
const allSizeProductRouter = require('./routes/size_product');
const allCartRouter = require('./routes/cart.route');
const allSearchRouter = require('./routes/search.route');
const allHistoryRouter = require('./routes/history.route');
const allOrderRouter = require('./routes/order.route');

// User routes
app.use('/api/user',cors(),allUserRouter);
// Color routes
app.use('/api/color',cors(),allColorRouter);
// Size routes
app.use('/api/size',cors(),allSizeRouter);
// Category routes
app.use('/api/category',cors(),allCategoryRouter);
// Product routes
app.use('/api/product',cors(),allProductRouter);
// Color product routes
app.use('/api/colorProduct',cors(),allColorProductRouter);
// Review routes
app.use('/api/review',cors(),allReviewRouter);
// Size_product routes
app.use('/api/sizeProduct',cors(),allSizeProductRouter);
// Cart routes
app.use('/api/cart',cors(),allCartRouter);
// Search routes
app.use('/api/search',cors(),allSearchRouter);
// History routes
app.use('/api/history',cors(),allHistoryRouter);
// Order routes
app.use('/api/order',cors(),allOrderRouter);


app.use((req, res) => {
    res.status(404).json({
        success: false,
        msg: "Page not founded"
    })
})

app.get('/', (req, res) => { res.send('Hello from Express!')});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});