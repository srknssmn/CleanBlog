const express = require('express');
const mongoose = require('mongoose')
const ejs = require('ejs');
const app = express();

const Post = require('./models/Post')

mongoose.connect('mongodb://127.0.0.1:27017/cleanblog-test-db');

// Dinamik dosyalar views klasöründe aktif edildi.
app.set("view engine" , "ejs");

// Statik dosyalar public klasöründe aktif edildi.
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/', async (req, res) => {
  const posts = await Post.find({})
  res.render('index', {
    posts
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add_post', (req, res) => {
  res.render('add_post');
});

app.get('/post', (req, res) => {
  res.render('post');
});

app.post('/posts', async (req, res) => {
  // console.log(req.body);  //Yapılan isteğin body kısmı console a yazdırılıyor.
  await Post.create(req.body) // Post.js e formdan gelen bilgi gönderiliyor.
  res.redirect('/') // Ana sayfaya yönlendiriyor ve işlemi kapatıyor.
});

app.get('/posts/:id', async (req, res) => {
  const post = await Post.findById(req.params.id)
  res.render('post', {
    post
  });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda baslatildi.`);
});