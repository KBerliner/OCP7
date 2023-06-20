// Importing Dependencies

const Post = require('../models/post');
const fs = require('fs');

// The "See" Function

exports.see = (req, res, next) => {
    Post.findOne({ _id: req.params.id }).then(
        (post) => {
            // console.log('USERS SEEN ARRAY', req.body);
            post.usersSeen.push(req.body.userId);
            Post.updateOne({ _id: req.params.id }, post).then(
                () => {
                    res.status(201).json({
                        message: 'Seen!',
                    });
                }
            ).catch(
                (error) => {
                    res.status(400).json({
                        error: error
                    });
                }
            );
        }
    ).catch(
        (error) => {
            res.status(500).json({
                error: error
            });
        }
    )
}

// The "Like" and "Dislike" Function

exports.likePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id }).then(
        (post) => {
            console.log(post);
            if (req.body.like == 1) {
                    post.likes++;
                    post.usersLiked.push(req.body.userId);
            } else if (req.body.like == -1) {
                post.dislikes++;
                post.usersDisliked.push(req.body.userId);
            } else {
                
                    if (post.usersLiked.includes(req.body.userId)) {
                        let idKeyStart = post.usersLiked.indexOf(req.body.userId);
                        let idKeyEnd = idKeyStart + 1;
                        post.usersLiked.splice(idKeyStart, idKeyEnd);
                        post.likes--;
                    } else if (post.usersDisliked.includes(req.body.userId)) {
                        let idKeyStart = post.usersDisliked.indexOf(req.body.userId);
                        let idKeyEnd = idKeyStart + 1;
                        post.usersDisliked.splice(idKeyStart, idKeyEnd);
                        post.dislikes--;
                    };
            };
            Post.updateOne({ _id: req.params.id }, post).then(
                () => {
                    res.status(201).json({
                        message: 'Liked!'
                    });
                }
            ).catch(
                (error) => {
                    res.status(400).json({
                        error: error
                    });
                }
            );
        }
    );
};

// The "Create" Function

exports.createPost = (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    // req.body.post = JSON.parse(req.body.post);
    if (req.body.image && req.file) {
        // console.log(req.file);
        const post = new Post({
            title: req.body.title,
            username: req.body.username,
            caption: req.body.caption,
            creatorId: req.body.creatorId,
            image: url + '/images/' + req.file.filename,
            likes: 0,
            dislikes: 0,
            usersLiked: [],
            usersDisliked: []
        });
        post.save().then(
            () => {
                res.status(201).json({
                    message: 'Created!'
                });
            }
        ).catch(
            (error) => {
                res.status(400).json({
                    error: error
                })
            }
        );
    } else {
        console.log(req.body);
        const post = new Post({
            title: req.body.title,
            username: req.body.username,
            caption: req.body.caption,
            creatorId: req.body.creatorId,
            likes: 0,
            dislikes: 0,
            usersLiked: [],
            usersDisliked: []
        });
        post.save().then(
            () => {
                res.status(201).json({
                    message: 'Created!',
                    message: req.body
                });
            }
        ).catch(
            (error) => {
                res.status(400).json({
                    error: error
                })
            }
        );
    };
};

// The function to retrieve ONE post

exports.getOnePost = (req, res, next) => {
    Post.findOne({
        _id: req.params.id
    }).then(
        (post) => {
            res.status(200).json(post)
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            })
        }
    );
}

// The function to update ONE post

exports.updatePost = (req, res, next) => {
    let post = new Post({ _id: req.params.id });
    if (req.file) {
        const url = req.protocol + '://' + req.get('host');
        req.body.post = JSON.parse(req.body.post);
        post = {
            title: req.body.title,
            username: req.body.username,
            caption: req.body.caption,
            image: url + '/images/' + req.file.filename,
        };

    } else {
        post = {
            title: req.body.title,
            username: req.body.username,
            caption: req.body.caption,
            image: req.body.image
        };
    }

    Post.updateOne({ _id: req.params.id }, post).then(
        () => {
            res.status(201).json({
                message: 'Post updated successfully!'
            })
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}

// The "Delete" Function

exports.deletePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id }).then(
        (post) => {
            if (!post) {
                return res.status(404).json({
                    error: new Error('No such thing!')
                });
            }
            if (post.creatorId !== req.auth.userId) {
                return res.status(400).json({
                    error: new Error('Unauthorized request!')
                });
            }
        }
    )
    Post.findOne({ _id: req.params.id }).then(
        (post) => {
            const filename = post.image.split('/images/')[1];
            fs.unlink('images/' + filename, () => {
                Post.deleteOne({ _id: req.params.id }).then(
                    () => {
                        res.status(200).json({
                            message: 'Deleted!'
                        });
                    }
                ).catch(
                    (error) => {
                        res.status(400).json({
                            error: error
                        });
                    }
                );
            });
        }
    );
}

// The function to retrieve ALL posts

exports.allPosts = (req, res, next) => {
    Post.find().then(
        (posts) => {
            res.status(200).json(posts);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};