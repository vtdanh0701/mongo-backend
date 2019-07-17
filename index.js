const express = require('express');
const mongoose = require('mongoose');

const app = express()
const Restaurant = require('./models/restaurant')
const Review = require('./models/review')

app.use(express.urlencoded({extended: false}));

//connect to mongodb
mongoose.connect('mongodb://localhost/mongo-backend');

// Mongoose event listeners
const db = mongoose.connection;
db.once('open', function() {
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});

db.on('error', function(err) {
    console.error(`Database error:\n${err}`);
});

//+++++++++++++++++++++++++++++++++++++++++++++

app.get('/', (req, res) =>{
    res.send('Hello')
})

app.post('/restaurants', (req, res) => {
    Restaurant.create({
        name: req.body.name,
        address: req.body.address
    }, function(err, restaurant){
        res.redirect('/restaurants')
    })
})

app.get('/restaurants/:id', (req, res) => {
    Restaurant.findById(req.params.id).populate('review').exec((err, restaurant) => {
        if(err) res.json(err)
        res.json(restaurant)
    })
})
app.put('/restaurants/:id', (req, res) =>{
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
app.delete('/restaurants/:id', (req,res) => {
    Restaurant.findByIdAndDelete(req.params.id, function(err) {
        if(err) res.json(err)
        res.redirect('/')
    })
})

// Get all Restaurants
app.get('/restaurants', (req,res) => {
    Restaurant.find({},function(err, restaurants){
        if(err) res.json(err)
        res.json(restaurants)
    })
})


app.post('/restaurants/:id/reviews', (req, res) =>{
    Restaurant.findById(req.params.id, (err, restaurant) => {
        let newReview = new Review({
            rate: req.body.rate,
            comment: req.body.comment
        });
        newReview.save((err,review) =>{
            restaurant.review.push(review);
            restaurant.save((err, restaurant) => {
                res.json(restaurant)
            })
        })
    })
})
app.delete('/restaurants/:id/reviews/:reviewId', (req, res) =>{
    Review.findByIdAndDelete(req.params.reviewId, function(err, review){
        Restaurant.findById(req.params.id, function(err, restaurant){
            restaurant.review.pull(review)
            restaurant.save(function(err, restaurant){
                if(err) res.json(err)
                res.json(restaurant.review)
            })
        })
    })
})
app.get('/restaurants/:id/reviews', (req, res) => {
    Restaurant.findById(req.params.id).populate('review').exec((err, restaurant) => {
        res.status(200).json(restaurant.review)
    })
})


app.listen(3001, () => {
    console.log('Up and running on 3000 🦞🦞🦞')
})