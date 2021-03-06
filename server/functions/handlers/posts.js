const { db } = require('../util/admin')

exports.getAllPosts = (req, res) => {
    db
        .collection('posts')
        .orderBy('createdAt','desc')
        .get()
        .then(data => {
            let posts = [];
            data.forEach(doc => {
                posts.push({
                    postId: doc.id,
                    title: doc.data().title,
                    body: doc.data().body,
                    userHandle: doc.data().userHandle,
                    createdAt: doc.data().createdAt
                });
            });
            return res.json(posts);
        })
        .catch(err => res.error(err));
}

exports.postOnePost = (req,res) => {
    // res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    const newPost = {
        title: req.title.title,
        body: req.body.body,
        userHandle: req.user.handle,
        createdAt: new Date().toISOString()
    };

    db
        .collection('posts')
        .add(newPost)
        .then(doc => {
            res.json({ message: `document ${doc.id} created successfully`});
        })
        .catch(err => {
            res.status(500).json({ error: `something went wrong`});
            console.error(err);
        })
}

exports.getPost = (req,res) => {
    let postData = {};
    db.doc(`/posts/${req.params.postId}`).get()
        .then(doc => {
            if (!doc.exists) {
                return res.status(404).json({ error: 'Post not found'})
            }
            postData = doc.data();
            postData.postId = doc.id;
            return res.json(postData);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error : err.code});
        });
}

exports.deletePost = (req, res) => {
    const document = db.doc(`/posts/${req.params.postId}`);

    document.get()
        .then (doc => {
            if (!doc.exists) {
                return res.status(404).json({ error: "Post not found"});
            }
            if (doc.data().userHandle !== req.user.handle) {
                return res.status(403).json({ error: 'Unauthorized'});
            } else {
                return document.delete();
            }
        })
        .then(() => {
            res.json({ message: "Post deleted successfully"});
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: err.code});
        })
}