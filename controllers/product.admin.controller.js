const express = require('express');
const mkdirp = require('mkdirp');
const fs = require('fs-extra');

const router = express.Router();

// Product model 
const Product = require("../models/product.model");

// Category model 
const Category = require("../models/category.model");



module.exports = {

    getAllProducts: async (req, res, next) => {
        let products = await Product.find();


        res.render('admin/products', {
            products: products
        });
    },
    addProduct: async (req, res, next) => {
        var title = "";
        var branch = "";
        var price = "";
        var inventoryNumber = "";
        var soldNumber = "";
        var desc = "";

        Category.find((err, categories) => {
            res.render('admin/add_product', {
                title: title,
                branch: branch,
                price: price,
                inventoryNumber: inventoryNumber,
                soldNumber: soldNumber,
                categories: categories,
                desc: desc
            });
        });
    },
    postProduct: async (req, res, next) => {
        if (!req.files) { imageFile = ""; }
        if (req.files) {
            imageFile = typeof (req.files.image) !== "undefined" ? req.files.image.name : "";
        }

        var title = req.body.title;
        var branch = req.body.branch;
        var price = req.body.price;
        var inventoryNumber = req.body.inventoryNumber;
        var soldNumber = req.body.soldNumber;
        var desc = req.body.desc;
        var category = req.body.category;

        Product.findOne({ title: title }, (err, product) => {
            if (product) {
                res.render('admin/add_product');
            }
            else {
                var price2 = parseFloat(price).toFixed(2);
                var product = new Product({
                    title: title,
                    branch: branch,
                    price: price2,
                    inventoryNumber: inventoryNumber,
                    soldNumber: soldNumber,
                    decription: desc,
                    type: category,
                    image: "/images/" + category + "/" + imageFile
                });
                product.save((err) => {
                    if (err) return console.log(err);
                    if (imageFile != "") {
                        var productImage = req.files.image;
                        var path = 'public/images/' + product.type + '/' + imageFile;

                        productImage.mv(path, (err) => {
                            return console.log(err);
                        });
                    }
                    res.redirect('/admin/products');
                });
            }
        });
    },

    editProduct: async (req, res, next) => {
        let categories = await Category.find();
        let product = await Product.findById(req.params.id);
        if (!product) { //if category not exist in db
            return res.status(404).send('Product not found');
        }
        res.render('admin/edit_product', { //category  exist
            title: product.title,
            branch: product.branch,
            price: product.price,
            inventoryNumber: product.inventoryNumber,
            soldNumber: product.soldNumber,
            desc: product.decription,
            type: product.category,
            id: product._id,
            categories: categories,
            category: product.type,
            image: product.image
        });
    },

    postEditProduct: async (req, res, next) => {
        if (!req.files) { imageFile = ""; }
        if (req.files) {
            imageFile = typeof (req.files.image) !== "undefined" ? req.files.image.name : "";
        }

        var title = req.body.title;
        var branch = req.body.branch;
        var price = req.body.price;
        var inventoryNumber = req.body.inventoryNumber;
        var soldNumber = req.body.soldNumber;
        var desc = req.body.desc;
        var category = req.body.category;
        var id = req.params.id;

        Product.findById({ _id: id }, (err, product) => {
            if (err) {
                console.log(err);
            }
            else {
              product.title = title;
              product.branch = branch;
              product.price = parseFloat(price).toFixed(2);
              product.inventoryNumber = inventoryNumber;
              product.soldNumber = soldNumber;
              product.decription = desc;
              product.type = category;
            }
            product.save((err) => {
                if (err) {
                    console.log(err);
                }
                res.redirect("/admin/products");
            });
        });
    },
    deleteProduct: async (req, res, next) => {
        Product.findById(req.params.id, (err, product) => {
            if (err) return console.log(err);
            fs.remove('public' + product.image, (err) => {
                if (err) console.log(err);
            });
        });
        Product.findByIdAndRemove(req.params.id, (err) => {
            if (err) {
                console.log(err);
            }
            res.redirect('/admin/products');
        });
    }
}