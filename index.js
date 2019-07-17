const express = require('express');
const mongoose = require('mongoose');

const app = express()
const Restaurant = require('./models/restaurant')
const Review = require('./models/review')

app.use(express.urlencoded({extended: false}));

//connect to mongodb
mongoose.connect('mongodb://localhost/mongo-backend');

app.post('/restaurant', (req, res) => {
    Restaurant.create({
        name: req.body.name,
        address: req.body.address
    }, function(err, restaurant){
        res.redirect('/')
    })
})

app.get('/restaurant/:id', (req, res) => {
    Restaurant.findById(req.params.id, function(err, restaurant){
        if(err) res.json(err)
        res.json(restaurant)
    })
})
app.put('/restaurant/:id', (req, res) =>{
    Restaurant.findByIdAndUpdate(req.params.id, 
        {$set:
            {
                name: req.body.name,
                address: req.body.address
            }}, function(err){
                if(err) res.json(err)
                res.redirect('/')
            })
})
app.delete('/restaurant/:id', (req,res) => {
    Restaurant.findByIdAndDelete(req.params.id, function(err) {
        if(err) res.json(err)
        res.redirect('/')
    })
})
app.get('/', (req,res) => {
    Restaurant.find({},function(err, restaurants){
        if(err) res.json(err)
        res.json(restaurants)
    })
})




app.listen(3000, () => {
    console.log('Up and running on 3000 🦞🦞🦞')
})