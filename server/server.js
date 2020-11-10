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
    app.use(cors({
        origin: process.env.CLIENT_URL
    }))

    //Morgan give information about each request
    //Cors it's allow to deal with react for localhost:3000 without any problem
    app.use(morgan('dev'))
}




// Load all routes
const allUserRouter = require('./routes/user.route');
const allColorRouter = require('./routes/color.route');

// User routes
app.use('/api/user',allUserRouter);
// Color routes
app.use('/api/color',allColorRouter);


app.use((req, res) => {
    res.status(404).json({
        success: false,
        msg: "Page not founded"
    })
})

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});