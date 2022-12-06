const {Post} = require('../models/post')
const {User} = require('../models/user')


module.exports = {
    getAllPosts: async (req, res) => {
        try {
            const posts = await Post.findAll({
                where: {privateStatus: false},
                include: [{
                    model: User,
                    attributes: ['username'],
                    required: true
                }]
            })
            res.status(200).send(posts)
        } catch (error) {
            console.log('Error in Get All Posts')
            console.log(error)
            res.sendStatus(400)}
},
    getCurrentUserPosts: async (req, res) => {
        try {
            const {userID} = req.params
            const posts = await Post.findAll({
                where: {userID},
                include: [{
                    model: User,
                    attributes: ['username'],
                    required: true
                }]
            })
            res.status(200).send(posts)
        } catch (error) {
            console.log('Error in Get Current User Posts')
            console.log(error)
            res.sendStatus(400)
        }
    },
    addPost: async (req, res) => {
        try {
            const {userID, title, content, status} = req.body
            await Post.create({title, content, privateStatus: status, userId})
            res.sendStatus(200)
        } catch (error) {
            console.log('Error in Add Post')
            console.log(error)
            res.sendStatus(400)
        }
        
    },
    editPost: async (req, res) => {
        try {
            const {id} = req.params
            const {status} = req.body
            await Post.update({privateStatus: status}, {where: {id: +id}})
            res.sendStatus(200)
        } catch (error) {
            console.log('Error in Edit Post')
            console.log(error)
            res.sendStatus(400)
        }
    },
    deletePost: async (req, res) => {
        try {
            const {id} = req.params
            await Post.destroy({where: {id: +id}})
            res.sendStatus(200)
        } catch (error) {
            console.log('Error in Delete Post')
            console.log(error)
            res.sendStatus(400)
        }
    }
}