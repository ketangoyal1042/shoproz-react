// const express = require('express')
// const colors = require('colors')  # this is not the ES6 way, so added "type": module

//Using ES6 imports
import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import morgan from 'morgan';
import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoute.js';
import productRoutes from './routes/productRoute.js';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
//config env
dotenv.config();

//database config
connectDB();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//rest object
const app = express();

//middleware
app.use(cors());
app.use(express.json()); // for req res we can send json data, previously we use bodyParser but express have this feature by default
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, './client/build')));

const port = process.env.PORT || 3000;

// all routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);

// app.get('/', (req, res) => {
//     res.send({ message: 'Hello World!' })
// })

app.use('*', function(req,res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"))
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`.bgCyan.green)
})