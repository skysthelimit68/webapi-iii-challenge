const express = require("express");
const User = require("./userDb.js");
const Post = require("../posts/postDb.js")
const router = express.Router();

router.post('/', validateUser, (req, res) => {
    const newUser = { name : req.body.name }
    User.insert(newUser)
    .then( response => {
        res.status(201).json(response)
    })
    .catch( error => {
        res.status(500).json({message : "There is an issue adding this user"})
    })
});

router.post('/:id/posts', ValidateUserId, validatePost, (req, res) => {
    const newPost = { text: req.body.text, user_id: req.params.id}
    Post.insert(newPost)
    .then( response => {
        res.status(201).json(response)
    })
    .catch( error => {
        res.status(500).json(error)
    })
});

router.get('/', (req, res) => {
    User.get()
    .then( users => {
        res.status(200).json(users)
    })
    .catch( error => {
        res.status(500).json({message: "Something went wrong while retrieving the users"})
    })
});

router.get('/:id', ValidateUserId ,(req, res) => {
    res.status(200).json(req.user)
});

router.get('/:id/posts', ValidateUserId, async (req, res) => {
    try {
        const getPosts =  await User.getUserPosts(req.params.id)
        if(getPosts) {
            res.status(200).json(getPosts);
        } else {
            res.status(404).json({message: "User posts not found!"})
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Error retrieving posts for this user"
        })
    }
});

router.delete('/:id', ValidateUserId, (req, res) => {
    User.remove(req.params.id)
    .then( response => {
        res.status(200).json(response)
    })
    .catch( error => {
        res.status(500).json(error)
    })
});

router.put('/:id', ValidateUserId, (req, res) => {
    User.update(req.params.id, req.body) 
    .then(result => {
        res.status(200).json(result)
    })
    .catch(error => {
        res.status(500).json(error)
    })
});

//custom middleware

function ValidateUserId(req, res, next) {
    User.getById(req.params.id)
    .then( user => {
        if(user) {
            req.user = user;
            next();
        }
        else res.status(404).json({message:"user not found."})
    })
    .catch( error => {
        res.status(500).json({message: error})
    })

};

function validateUser(req, res, next) {
    if(!req.body) {
        res.status(400).json({ message: "missing user data" })
    } else if (!req.body.name) {
        res.status(400).json({ message: "missing required name field" })
    } else {
        next();
    }
};

function validatePost(req, res, next) {
    if(!req.body) {
        res.status(400).json({ message: "missing post data" })
    } else if (!req.body.text) {
        res.status(400).json({ message: "missing text for your post" })
    } else {
        next();
    }
};

module.exports = router;
