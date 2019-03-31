angular.module('app')
// Creating the Angular Controller
    .controller('LoginController', ['$http', 'AuthService', 'data', 'modal', '$window', '$rootScope', '$state', '$scope', 'dateFilter',
        function ($http, AuthService, data, modal, $window, $rootScope, $state, $scope, dateFilter) {
            var vm = this;
            var todos = {};
            $scope.loading = false;
            $scope.loadingEmail = false;
            // $scope.hidden = true;
            // $scope.hiddenReset = false;
            // $scope.hiddenSend = true;
            // $scope.hiddenUser = false;
            // $scope.hiddenPass = false;

            vm.login = function () {
                $scope.loading = true;
                todos.username = $scope.username;
                todos.password = $scope.password;
                data.login(todos).then(function (res) {
                    $scope.password = null;

                    // checking if the token is available in the response
                    if (res.data.token) {

                        $scope.message = '';
                        // setting the Authorization Bearer token with JWT token
                        $http.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token;
                        // setting the user in AuthService
                        AuthService.setUser(res.data.user);
                        document.cookie = res.data.token + "$" + res.data.user.isStaft + "$" + res.data.user.username;
                        $rootScope.$broadcast('LoginSuccessful');
                        // going to the home page
                        $state.go('root.stock-trading');
                    } else {
                        $scope.loading = false;
                        // if the token is not present in the response then the
                        // authentication was not successful. Setting the error message.
                        $scope.message = 'Authetication Failed !';
                    }

                }, function (err) {
                    console.log(err);
                })

            };

            // vm.resetPass = function () {
            //     $scope.hidden = false;
            //     $scope.hiddenReset = true;
            //     $scope.hiddenSend = false;
            //     $scope.hiddenUser = true;
            //     $scope.hiddenPass = true;
            // }
            //
            // vm.sendMail = function () {
            //     var datas = {
            //         email : $scope.email
            //     }
            //     data.resetPass(datas).then(function (res) {
            //         alert(res.result);
            //     },function (err) {
            //         console.log(err);
            //     })
            // }
            vm.sendMail = function () {
                $scope.loadingEmail = true;
                var datas = {
                    email : $scope.email
                }
                data.resetPass(datas).then(function (res) {

                    $scope.loadingEmail = false;
                    vm.status = res.status;
                    if(res.data.result == null){
                        vm.messageStatusEmail = "Bạn chưa nhập email";
                    }else {
                        vm.messageStatusEmail = res.data.result;
                        $scope.email = '';
                    }
                },function (err) {
                    console.log(err);
                })
            }

            return;
        }
    ])