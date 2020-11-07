const express = require('express');
const mkdirp = require('mkdirp');
const fs = require('fs-extra');

const router = express.Router();

// Category model 
const Category = require("../models/category.model");



module.exports = {

    getAllCategories: async (req, res, next) => {
        let categories = await Category.find();


        res.render('admin/categories', {
            categories: categories
        });
    },
    addCategory: async (req, res, next) => {
        var title = "";

        res.render('admin/add_category', {
            title: title
        });
    },
    postCategory: async (req, res, next) => {
        // req.checkBody('title', 'title must have a value').notEmpty();

        var title = req.body.title;
        var slug = title.replace(/\s+/g, '-').toLowerCase();

        //var errors = req.validationErrors();

        // if (errors) {
        //     console.log('errors');
        //     res.render('admin/add_category', {
        //         errors: errors,
        //         title: title
        //     });
        // } else {
        Category.findOne({ slug: slug }, (err, category) => {
            if (category) {
                // req.flash('danger', 'Category slug exists, choose another');
                res.render('admin/add_category', {
                    title: title
                });
            } else {
                var category = new Category({
                    title: title,
                    slug: slug
                });
                category.save((err) => {
                    if (err) return console.log(err);
                    Category.find((err, categories) => {
                        if (err) {
                            console.log(err);
                        } else {
                            req.app.locals.categories = categories;
                        }
                    });
                    fs.mkdir('public/images/' + category.title, (err) => {
                        if (err) { return console.log(err) }
                    });
                    // req.flash('Success', 'Category added!');
                    res.redirect('/admin/categories');
                });
            }
        });
        // }
    },

    editCategory: async (req, res, next) => {
        let category = await Category.findById(req.params.id);
        if (!category) { //if category not exist in db
            return res.status(404).send('Category not found');
        }
        res.render('admin/edit_category', { //category  exist
            title: category.title,
            id: category._id
        });




    },

    postEditCategory: async (req, res, next) => {
        //req.checkBody('title', 'title must have a value').notEmpty();

        var title = req.body.title;
        var slug = title.replace(/\s+/g, '-').toLowerCase();
        var id = req.params.id;

        // var errors = req.validationErrors();

        // if (errors) {
        //     // console.log('errors');
        //     res.render('admin/edit_category', {
        //         errors: errors,
        //         title: title,
        //         id: id
        //     });
        // } else {
        Category.findOne({ slug: slug, _id: { '$ne': id } }, (err, category) => {
            if (category) {
                // req.flash('danger', 'Category title exists, choose another');
                res.render('admin/edit_category', {
                    title: title,
                    id: id
                });
            } else {
                Category.findById(id, (err, category) => {
                    if (err) return console.log(err);
                    category.title = title;
                    category.slug = slug;
                    category.save((err) => {
                        if (err) return console.log(err);
                        Category.find((err, categories) => {
                            if (err) {
                                console.log(err);
                            } else {
                                req.app.locals.categories = categories;
                            }
                        });
                        // req.flash('success', 'Category added!');
                        res.redirect('/admin/categories/edit-category/' + id);
                    });
                });
            }
        });
        //}
    },
    deleteCategory: async (req, res, next) => {
        Category.findByIdAndRemove(req.params.id, (err, category) => {
            if (err) return console.log(err);
            Category.find((err, categories) => {
                if (err) {
                    console.log(err);
                }
                fs.rmdir('public/images/' + category.title, { recursive: true }, (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
                // } else {
                //     req.index.locals.categories = categories;
                // }
            });
            // req.flash('success', 'Category deleted!');

            res.redirect('/admin/categories/');
        });
    }
}