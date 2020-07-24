let express = require('express'),
    app = express();
let mongoose = require('mongoose');
let multer = require('multer');
let postsRouter = require('./routes/posts');
let callbackRequestRouter = require('./routes/callback-requests');
let emailsRouter = require('./routes/emails');
const {
    response
} = require('express');

app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/travels', {
    useNewUrlParser: true
});
app.use(express.json());
let imageStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/images'),
    filename: (req, file, cb) => cb(null, file.originalname)
})

app.use(multer({
    storage: imageStorage
}).single('imageFile'));
app.use(express.static('public'));
app.use('/posts', postsRouter);
app.use('/callback-requests', callbackRequestRouter);
app.use('/emails', emailsRouter);

app.get('/sight', (req, resp) => {
    resp.render('sight', {
        title:'placeholder',
        imageURL:'https://lp-cms-production.imgix.net/news/2017/08/London.jpg?auto=format&fit=crop&q=40&sharp=10&vib=20&ixlib=react-8.6.4&w=2618',
        date:'placeholder',
        text:'placeholder'
    })
})

app.listen(3000, () => console.log('Listening 3000... '));