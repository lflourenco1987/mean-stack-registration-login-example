(function () {
    'use strict';

    angular
        .module('app')
        .controller('Perguntas.IndexController', Controller);

    function Controller(UserService, PerguntasService) {
        var vm = this;

        vm.user = null;
        vm.pergunta = null;
        vm.perguntas = null;

        vm.salvar = salvar;
        vm.excluir = excluir;

        initController();

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });

            getPerguntas();
        }

        function salvar() {
            if(!vm.pergunta || !vm.pergunta.titulo) return;

            PerguntasService.Create(vm.pergunta)
                .then(function () {
                    getPerguntas();
                    vm.pergunta = null;
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

        function excluir(elem) {
          console.log(elem);
            PerguntasService.Delete(elem.q._id)
                .then(function () {
                    getPerguntas();
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

        function getPerguntas(){
            PerguntasService.Get().then(function (pergunta) {
                vm.perguntas = pergunta;
            });
        }
    }

    

})();