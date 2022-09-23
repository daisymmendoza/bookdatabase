// Import modules
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const ejs = require('ejs');
const methodOverride = require('method-override')

// App object of express
const app = express();

// Connect mongoose with localhost:27017
mongoose.connect('mongodb://localhost:27017/BookDB');

// Working with body-parser
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))

// Set port number
const port = 3000;

// Exports schema
const Book = require("./model/book");

// Set ejs engine
app.set("view engine", "ejs");

// Connect CSS
app.use(express.static('public'));

// Get index.ejs file
app.get('/' , (req , res)=>{
    res.render("index");
})

// Post the form values in the database
app.post('/',  async(req, res) =>{
    const data = new Book(req.body)
    await data.save()
    res.render("submit")
})

// Show the data (show.ejs)
app.get('/show', async(req,res)=>{
    const items = await Book.find({})
    res.render('show', {items :items})
})

// Edit the data (edit.ejs)
app.get('/show/:id/edit', async(req,res)=>{
    const {id} = req.params;
    const items = await Book.findById(id)
    res.render('edit', {items})
})

// Update with edited data (submission of edit.ejs)
app.put('/show/:id', async(req,res)=>{
    const {id} = req.params;
    const items = await Book.findByIdAndUpdate(id, req.body ,{runValidors :true , new :true})
    res.redirect('/show')
})

// Delete the data
app.delete('/show/:id', async(req,res)=> {
    const {id} = req.params;
    const deleteItem = await Book.deleteOne({ _id: id });
    res.redirect("/show")  
})

// Display search.ejs
app.get('/search', (req , res)=>{
    res.render('search', {item:""});
})

// Search database (search.ejs)
app.get('/searchdb', (req,res)=> {
    let search = {name : req.query.name};
    Book.findOne(search)
        .then(item => {
            res.render('search', {item:item});
        })
        .catch(err => {
            res.redirect('/');
        });
});

// Active server at port 3000
app.listen(port, ()=>{
    console.log(`App listening on port ${port}`)
})