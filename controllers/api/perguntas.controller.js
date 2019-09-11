var config = require('config.json');
var express = require('express');
var router = express.Router();
var _perguntasService = require('services/perguntas.service');

// routes
router.post('/', _create);
router.delete('/:_id', _delete);
router.get('/', _get);


module.exports = router;

function _create(req, res) {
    _perguntasService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function _delete(req, res) {
    _perguntasService.delete(req.params._id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function _get(req, res){
    // getbyUser(req.session.userId)
    _perguntasService.get()  
    .then(function (perguntas) {
        if (perguntas) {
            res.send(perguntas);
        } else {
            res.sendStatus(404);
        }
    })
    .catch(function (err) {
        res.status(400).send(err);
    });
}