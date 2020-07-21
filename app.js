let express = require('express'),
    app = express();
let mongoose = require('mongoose');
let Post = require('./models/posts').Post;
let multer = require('multer');

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

let id = 1;

app.get('/posts', async (req, resp) => {
    let posts = await Post.find();
    id = posts.length + 1;
    resp.send(posts);
})

app.post('/posts', async (req, resp) => {
    let reqBody = req.body;
    let imagePath;
    if (reqBody.imageUrl) {
        imagePath = reqBody.imageUrl;
    } else {
        imagePath = req.file.path.substring(req.file.path.indexOf('\\'), req.file.path.length);
    }

    let newPost = new Post({
        id: id++,
        title: reqBody.title,
        date: new Date(),
        description: reqBody.description,
        text: reqBody.text,
        country: reqBody.country,
        imageURL: imagePath
    })
    await newPost.save();
    resp.send('Created');
})

app.use(express.static('public'));
app.listen(3000, () => console.log('Listening 3000... '));