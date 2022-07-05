var express = require('express');
var router = express.Router();

const Recipe = require('../database/model/recipe')
const Mongoose = require("mongoose");



/* GET cards listing. */
router.get('/', function (req, res, next) {
    const keywords = req.query.keywords;
    if(req.query.type === "title") {
        Recipe.find({title: {$regex: keywords , $options : 'i'}} , (err, recipes) => {
            if (err){
                console.log(err);
            }
            else{
                return res.send(recipes);
            }})

    } else if (req.query.type === "ingredient") {
        Recipe.find({ingredients: {$regex: keywords, $options : 'i'}} , (err, recipes) => {
            if (err){
                console.log(err);
            }
            else{
                return res.send(recipes);
            }})
    }
    else {
        Recipe.find({}, (err, recipes) => {
            if (err){
                console.log(err);
            }
            else{
                return res.send(recipes);
            }
        })
    }

});

router.post('/', function (req, res, next) {
    if (!req.body.title) {
        return res.status(400).send({message: 'Card must have a title!'});
    }

    const newRecipe = new Recipe({
        title: req.body.title,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions
    });

    newRecipe.save().then((data) => {
        return res.send(data);
    }).catch((err) => {res.json({message: err})});



})

router.patch('/', function (req, res) {
    if (!req.body.title) {
        return res.status(400).send({message: 'Card must have a title!'});
    }
    const editedCard = {
        title: req.body.title,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions
    }

    Recipe.findByIdAndUpdate(req.body.id, editedCard, (err, recipe) => {
        if (err){
            console.log(err)
        }
        else{
            Recipe.findById(req.body.id,(err, updatedRecipe) => {
                if (err){
                    console.log(err)
                } else {
                    return res.send(updatedRecipe)
                }
            });
        }
    })
})


router.delete('/:id', function (req, res) {
    let id = req.params.id

    Recipe.findByIdAndRemove(Mongoose.Types.ObjectId(id), (err, recipe) => {
        if (err){
            console.log(err)
        }
        else{
            const response = {
                id: id
            }
            return res.send(response)

        }})
})

router.delete('/', function (req, res) {
    Recipe.remove({}, (err, obj)=> {
        if (err){
            console.log(err)
        }
        else{
            return res.status(250).send("ALL CARDS DELETED");
    }});

})


module.exports = router;
