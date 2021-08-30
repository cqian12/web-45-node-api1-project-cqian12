// BUILD YOUR SERVER HERE
const express = require('express')
const User = require('./users/model.js')
const server = express()
server.use(express.json())

server.get('/api/users', (req,res) => {
    User.find()
    .then(users => res.status(200).json(users))
    .catch(err => {
        console.log(err)
        res.status(500).json({message:'The users information could not be retrieved'})
    })
})

server.get('/api/users/:id', (req,res) => {
    User.findById(req.params.id)
    .then(user => user ? res.status(200).json(user) : res.status(404).json({message: "The user with the specified ID does not exist"}))
    .catch(err => {
        console.log(err)
        res.status(500).json({message:'The user information could not be retrieved'})
    })
})

server.post('/api/users', (req,res) => {
    User.insert(req.body)
    .then(newUser => newUser ? res.status(201).json(newUser): res.status(400).json({ message: "Please provide name and bio for the user" }))
    .catch(err => {
        console.log(err)
        res.status(500).json({message:'There was an error while saving the user to the database'})
    })
})

server.delete('/api/users/:id', (req,res) => {
    User.remove(req.params.id)
    .then(user => user ? res.status(200).json(user) : res.status(404).json({message: "The user with the specified ID does not exist"}))
    .catch(err => {
        console.log(err)
        res.status(500).json({message:'The user could not be removed'})
    })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
