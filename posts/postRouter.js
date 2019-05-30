const express = require('express');
const router = express.Router();
const Post = require("../posts/postDb.js")

router.get('/', (req, res) => {
    Post.get()
    .then( posts => {
        res.status(200).json(posts)
    })
    .catch( err => {
        res.status(500).json({message: "Something went wrong while retrieving the posts", error : err})
    })
});

router.get('/:id', async (req, res) => {
    try {
        const getPost = await Post.getById(req.params.id)
        if(getPost) {
            res.status(200).json(getPost);
        } else {
            res.status(404).json({message: "Post not found!"})
        }
    }
    catch (err) {
        res.status(500).json({
            message: "Error retrieving the Post",
            error: err
        })
    }
});

router.delete('/:id', validatePostId, (req, res) => {
    Post.remove(req.params.id) 
    .then( response => {
        res.status(200).json(response)
    })
    .catch( err => {
        res.status(500).json({message: "Something happened when trying to remove the post", error: err})
    })
});

router.put('/:id', validatePostId, (req, res) => {
    Post.update(req.params.id, req.body)
    .then( response => {
        res.status(200).json(response)
    })
    .catch( err => {
        res.status(500).json({message: "Something happened when trying to update the post", error: err})
    })
});

// custom middleware

function validatePostId(req, res, next) {
    Post.getById(req.params.id)
    .then( post => {
        if(post) { 
            req.post = post;
            next();
        }
        else res.status(404).json({message:"post not found."})
    })
    .catch( error => {
        res.status(500).json({message: error})
    })
};

module.exports = router;