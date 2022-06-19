var express = require('express');
var router = express.Router();
let idCounter = 2;

const JsonObj = '[{"id":1,"title":"Rice","ingredients":"rice, water","instructions":"First put the rice into the ' +
    'rice cooker, then add some water, finally turn on the rice cooker. Wait and enjoy."},{"id":2,"title":"Tea",' +
    '"ingredients":"tea, water","instructions":"First boil some hot water, then add some tea. Wait and enjoy."}]'

var cards = JSON.parse(JsonObj);

/* GET cards listing. */
router.get('/', function (req, res, next) {
    return res.send(cards);
});

router.post('/', function (req, res, next) {
    if (!req.body.title) {
        return res.status(400).send({message: 'Card must have a title!'});
    }

    const newCard = {
        id: ++idCounter,
        title: req.body.title,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions
    }

    cards.push(newCard);
    return res.send(newCard);
})

router.patch('/', function (req, res) {
    if (!req.body.title) {
        return res.status(400).send({message: 'Card must have a title!'});
    }
    const editedCard = {
        id: req.body.id,
        title: req.body.title,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions
    }

    cards = cards.map((card) => {
        if (card.id === req.body.id) {
            return editedCard;
        } else {
            return card;
        }
    })
    return res.send(editedCard);
})


router.delete('/:id', function (req, res) {
    let id = Number(req.params.id);
    cards = cards.filter((card) => {
        return card.id !== id;
    })
    const response = {
        id: id
    }
    return res.send(response);
})

router.delete('/', function (req, res) {
    cards = [];
    return res.status(250).send("ALL CARDS DELETED");
})


module.exports = router;
