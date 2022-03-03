const {Category} = require('../models/category');
const express = require('express');
const router = express.Router();

//To get the ouput list of categories
router.get(`/`, async (req, res) =>{
    const categoryList = await Category.find();//To make it wait till it gets the categories

    if(!categoryList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(categoryList);
})

//To get the ouput of single category
router.get('/:id', async (req, res) =>{
    const category = await Category.findById(req.params.id);

    if(!category){
        res.status(500).json({message: 'The category with the given ID was not found!'})
    }
    res.status(200).send(category);
})

//To get all the input to creat new categories
router.post('/', async (req, res) =>{
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color,
    })
    category = await category.save();

    if(!category)
    return res.status(400).send('The category cannot be created!')

    res.send(category);
})

//To updated a specific category
router.put('/:id', async (req, res)=> {
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color,
        },
        { new: true}
    )

    if(!category)
    return res.status(400).send('Category not found!')

    res.send(category);
})


//To delete a specific category
router.delete('/:id', (req, res) =>{
    Category.findByIdAndRemove(req.params.id).then(category =>{
        if(category) {
            return res.status(200).json({success: true, message: 'The category is deleted!'})
        }else {
            return res.status(404).json({success: false, message: 'Category not found!'}) 
        }
    }).catch(err=>{
        return res.status(400).json({success: false, error: err})
    })
})

module.exports =router;