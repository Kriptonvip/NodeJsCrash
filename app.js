const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose')
const Blog = require('./models/blog')




//express app
const app = express();

//connect to mongo db
const dbURI = 'mongodb+srv://kripton:romanyra@cluster0.spkbm.mongodb.net/blogs?retryWrites=true&w=majority';

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology:true})
.then(result => app.listen(3000))
.catch((err) => console.log('err'));

//register view engine
app.set('view engine', 'ejs');



//middleware & static files
app.use(express.static('public'));

//mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
    title: 'new blog 2',        
    snippet: 'about my blog',
    body: 'more about my blog'
    });

    blog.save()
    .then((result)=>{
        res.send(result)
    })
    .catch(err => console.log(err));
})
app.get('/all-blogs', (req,res)=> {
    Blog.find()
    .then((result)=>{
        res.send(result)
    })
    .catch(err => console.log(err));
})
app.get('/singe-blog', (req,res)=> {
    Blog.findById('61cb36ce3200df15f5e0741a')
    .then((result)=>{
        res.send(result)
    })
    .catch(err => console.log(err));
})

app.use(morgan('dev'));
app.get('/', (req, res) => {
    const blogs = [
    {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    ];
    res.render('index', { title: 'Home', blogs});
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About'});
});
app.get('/blogs/create', (req, res)=> {
    res.render('create', { title: 'Create'});
})

//app.use strartin on the all url get requests
app.use((req, res) => {
    res.status(404).render('404', { title: '404'});
});