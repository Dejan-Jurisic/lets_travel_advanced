let express = require('express'),
    app = express();
let mongoose = require('mongoose');
let Post = require('./models/posts').Post;

mongoose.connect('mongodb://localhost/travels', {
    useNewUrlParser: true
});
app.use(express.json())

let id = 1;

app.get('/posts', async (req, resp) => {
    let posts = await Post.find();
    resp.send(posts);
})

app.post('/posts', async (req, resp) => {
    let reqBody = req.body;
    let newPost = new Post({
        id: id++,
        title: reqBody.title,
        date: new Date,
        description: reqBody.description,
        text: reqBody.text,
        country: reqBody.country,
        imageURL: reqBody.imageUrl
    })
    await newPost.save();
    resp.send('Created');
})

app.use(express.static('public'));
app.listen(3000, () => console.log('Listening 3000... '));