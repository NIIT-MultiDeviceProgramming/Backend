const {Product} = require('../models/product');
const express = require('express');
const {Category} = require('../models/category');
const router = express.Router();
const mongoose = require('mongoose');

//To get the ouput list of product
router.get(`/`, async (req, res) =>{
    //localhost:<port>/api/v1/products?categories = 2222,5555
    let filter ={};
    if(req.query.categories)
    {
        filter = {category:req.query.categories.split(',')}
    }

    const productList = await Product.find(filter).populate('category');

    if(!productList) {
        res.status(500).json({success: false})
    } 
    res.send(productList);
})

//To get the ouput of single product
router.get(`/:id`, async (req, res) =>{
    const product = await Product.findById(req.params.id).populate('category');

    if(!product) {
        res.status(500).json({success: false})
    } 
    res.send(product);
})

//To get all the input to creat new product
router.post(`/`, async (req, res) =>{
    const category = await Category.findById(req.body.category);
    if(!category) return res.status(400).send('Invalid Category')//To get a valid category

    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
    })

    product = await product.save();

    if(!product) 
    return res.status(500).send('The product cannot be created!')

    res.send(product);
})

//To updated a specific product
router.put('/:id',async (req, res)=> {
    if(!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid Product Id!')
    }
    const category = await Category.findById(req.body.category);
    if(!category) return res.status(400).send('Invalid Category!')

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
        },
        { new: true}
    )

    if(!product)
    return res.status(500).send('The product cannot be updated!')

    res.send(product);
})

//To delete a specific product
router.delete('/:id', (req, res)=>{
    Product.findByIdAndRemove(req.params.id).then(product =>{
        if(product) {
            return res.status(200).json({success: true, message: 'The product is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "PSroduct not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})

//TO get count of all products
router.get(`/get/count`, async (req, res) =>{
    const productCount = await Product.countDocuments()

    if(!productCount) {
        console.log('I ')
        res.status(500).json({success: false})
    } 
    res.send({
        productCount: productCount
    });
})

//TO get count of all featured products
router.get(`/get/featured/:count`, async (req, res) =>{
    const count = req.params.count ? req.params.count : 0 
    const products = await Product.find({isFeatured:true}).limit(+count)

    if(!products) {
        res.status(500).json({success: false})
    } 
    res.send(products);
})
module.exports =router;