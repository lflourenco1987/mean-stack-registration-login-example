var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('perguntas');

var service = {};

service.create = _create;
service.get = _get;
service.delete = _delete;


module.exports = service;


function _create(pergunta) {
    var deferred = Q.defer();

    db.perguntas.insert(
        pergunta,
        function (err, doc) {
            if (err) deferred.reject(err.name + ': ' + err.message);
            deferred.resolve();
    });    

    return deferred.promise;
}

function _delete(_id) {
    var deferred = Q.defer();

    db.perguntas.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}

function _get() {
    var deferred = Q.defer();

    db.perguntas.find().toArray(function (err, perguntas) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (perguntas) {
        deferred.resolve(perguntas);
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}
