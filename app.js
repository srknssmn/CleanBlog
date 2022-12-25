const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');

const postControl = require('./controllers/postControl');
const pageControl = require('./controllers/pageControl');

const ejs = require('ejs');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/cleanblog-test-db');

// Dinamik dosyalar views klasöründe aktif edildi.
app.set('view engine', 'ejs');

// Statik dosyalar public klasöründe aktif edildi.
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

app.get('/', postControl.getAllPosts);
app.post('/posts', postControl.createPost);
app.get('/posts/:id', postControl.getPost);
app.put('/posts/:id', postControl.updatePost);
app.delete('/posts/:id', postControl.deletePost);

app.get('/about', pageControl.aboutPage);
app.get('/add_post', pageControl.addPostPage);
app.get('/posts/edit/:id', pageControl.editPostPage);

/*
app.post('/posts', async (req, res) => {
  // console.log(req.body);  //Yapılan isteğin body kısmı console a yazdırılıyor.
  await Post.create(req.body) // Post.js e formdan gelen bilgi gönderiliyor.
  res.redirect('/') // Ana sayfaya yönlendiriyor ve işlemi kapatıyor.
});
*/

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda baslatildi.`);
});