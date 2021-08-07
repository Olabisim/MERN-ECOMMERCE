import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";


// @desc        Fetch all products
// @routes      Get /api/products
// @access      Public

export const getProducts = asyncHandler(async (req, res) => {
    // Product.find({}) means find all
    const products = await Product.find({});
    
    res.json(products);
    //will send api format
})



// @desc        Fetch single product
// @routes      Get /api/products/:id
// @access      Public

export const getProductById = asyncHandler(async (req, res) => {
    
    const product = await Product.findById(req.params.id);

    if (product) {
        //will send api format
        res.json(product);
    } else {
        res.status(404)
        throw new Error('Product not found');
    }
}) 


// @desc        Delete a product
// @routes      DELETE /api/products/:id
// @access      Private/Admin

export const deleteProduct = asyncHandler(async (req, res) => {
    
    const product = await Product.findById(req.params.id);

    if (product) {

        await product.remove()
        res.json({ message: 'Product removed' });

    } else {
        res.status(404)
        throw new Error('Product not found');
    }
}) 
