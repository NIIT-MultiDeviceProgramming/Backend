const express = require('express');
const req = require('express/lib/request');
const { json } = require('express/lib/response');
const app = express();
const morgan = require('morgan');
const mongoose =require('mongoose');
const { stringify } = require('nodemon/lib/utils');
const cors = require('cors');
require('dotenv/config');


app.use(cors());
app.options('*',cors());


//middleware
app.use(express.json());
app.use(morgan('tiny'));


//routes
const productsRoutes = require('./routes/products') ;
const categoriesRoutes = require('./routes/categories');
const ordersRoutes = require('./routes/orders');

const usersRoutes = require('./routes/users')

const api = process.env.API_URL;

app.use(`${api}/products`,productsRoutes);
app.use(`${api}/categories`,categoriesRoutes);
app.use(`${api}/orders`,ordersRoutes);
app.use(`${api}/users`,usersRoutes);

//database
mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>{
    console.log('MongoDB Database up and running!...')
})
.catch((err)=>{
    console.log(err)
})

//server
app.listen(8888, ()=>{
    console.log(api)
    console.log('Server running on http://127.0.0.1:8888');
})
