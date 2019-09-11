(function () {
    'use strict';

    angular
        .module('app')
        .factory('PerguntasService', Service);

    function Service($http, $q) {
        var service = {};

        service.Create = Create;
        service.Get = Get;
        service.Delete = Delete;

        return service;

        function Create(pergunta) {
            return $http.post('/api/perguntas', pergunta).then(handleSuccess, handleError);
        }

        function Delete(_id) {
            return $http.delete('/api/perguntas/' + _id).then(handleSuccess, handleError);
        }

        function Get() {
            return $http.get('/api/perguntas').then(handleSuccess, handleError);
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }

})();
