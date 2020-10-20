const functions = require('firebase-functions');
const express = require('express');
const app = express();

const { getAllPosts, postOnePost, getPost, deletePost } = require('./handlers/posts');
const { signUp, logIn, addUserDetails, getAuthenticatedUser } = require('./handlers/users');
const FBAuth = require('./util/fbAuth');

const config = require('./util/config');

app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin","*");
    // res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-type, Accept");
    res.header("Access-Control-Allow-Method", "GET, POST");
    res.header("Access-Control-Allow-Headers", "Content-Type")
    next();
})

// Post routes
app.get('/posts', getAllPosts);
// app.post('/post', FBAuth, postOnePost);
app.post('/post', postOnePost);
app.get('/post/:postId', getPost);
app.delete('/post/:postId/', FBAuth, deletePost);


// tutorial # 8
// app.post('/user/image', uploadImage);

// users routes
app.post('/signup', signUp);
app.post('/login', logIn);
app.post('/user', FBAuth, addUserDetails);
app.get('/user', FBAuth, getAuthenticatedUser);


// requires '/api' in the url
exports.api = functions.https.onRequest(app);
