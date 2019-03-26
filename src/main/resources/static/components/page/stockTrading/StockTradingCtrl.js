angular.module('app').controller('stockTradingCtrl',
    ['data', 'modal', '$window', '$rootScope', '$state', '$scope', 'dateFilter', '$interval',
        function (data, modal, $window, $rootScope, $state, $scope, dateFilter, $interval) {
            var todos = {};
            var vm = this;
            var stompClient = null;
 //----------------get thong tin chung-----------------
            const getttchung = function () {
                data.ttchung().then(function (result) {

                    vm.ttchung = result;

                }, function (err) {
                    console.log(err);
                })
            };
            //----------------get thong tin ty le-----------------
            const getttTyle = function () {
                data.tttyle().then(function (result) {
                    vm.tttyle = result;

                }, function (err) {
                    console.log(err);
                })
            };
            getttchung();
            getttTyle();
            data.getTime().then(function (res) {
                console.log(moment(res.time).format("HH:mm:ss"));
                vm.hour = moment(res.time).format("HH:mm:ss");

            })

            var fromDate = moment($scope.THAMSO_NGAY1).format("YYYYMMDD");
            var toDate = moment($scope.THAMSO_NGAY2).format("YYYYMMDD");
            var todo = {
                ngay1: fromDate,
                ngay2: toDate,
                exectype: ($scope.THAMSO_EXECTYPE) ? $scope.THAMSO_EXECTYPE : "",
                symbol: ($scope.THAMSO_SYMBOL) ? $scope.THAMSO_SYMBOL : ""

            };
            // // listen stomp api
//             function conn() {
//             console.log ("start connect sockjs!");
//             var socket = new SockJS('/gs-guide-websocket');
//             stompClient = Stomp.over(socket);
//             stompClient.connect({}, function (frame) {
//                 console.log('Connected: ' + frame);
//                 stompClient.subscribe('/topic/trading', function (result) {
//                     vm.history = result.rowList
//                 });
//             });
////             $interval(function () {
////             stompClient.send('/db');
////                         }, 3000);
//             }
//             vm.conn = function () {
//             stompClient.send('/app/db',{},null);
//             }

             $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                 if (stompClient !== null) {
                     stompClient.disconnect();
                 }
             });

            data.history(todo).then(function (result) {
                $scope.loading = false;
                vm.history = result.rowList

            }, function (err) {
                console.log(err);
            });

            vm.seHistory = function () {
                var todoo = {
                    ngay1: moment($scope.THAMSO_NGAY1).format("YYYYMMDD"),
                    ngay2: moment($scope.dateString).format("YYYYMMDD"),
                    exectype: ($scope.THAMSO_EXECTYPE) ? $scope.THAMSO_EXECTYPE : "",
                    symbol: ($scope.THAMSO_SYMBOL) ? $scope.THAMSO_SYMBOL : ""

                }
                data.history(todoo).then(function (result) {
                    vm.history = result.rowList

                }, function (err) {
                    console.log(err);
                })
                getttchung();
                getttTyle();
            }
//            $interval(function () {
//                vm.seHistory();
//                vm.getttchung();
//                vm.getttTyle()
//            }, 3000);

//----------------------------get view data--------------------------------------

            vm.getViewData = function () {
                var todo = {
                    symbol: $scope.formData.symbol,
                }
                console.log(todo)
                data.floorName(todo.symbol).then(function (result) {
                    console.log(result)

                    todos.floor = result.floorCode;
                    todos.ceM = result.ceil / 1000;

                    vm.floorNamess = result;

                }).catch(function (err) {
                    console.log(err);
                    console.log(err);
                })
                data.priceView(todo.symbol).then(function (result) {

                    vm.priceView = result;
                    todos.m1 = result.m1;

                });
            };



            //----------------dat lenh mua-----------------------
            vm.createTodos = function () {

                var t = confirm('Bạn có chắc chắn muốn thực hiện');
                if (t === true) {

                    todos.command = $scope.formData.command,
                        todos.symbol = $scope.formData.symbol,
                        todos.quantity = $scope.formData.quantity,
                        todos.price = $scope.formData.price * 1000,
                        todos.orderType = $scope.formData.orderType,
                        todos.expiredDate = $scope.formData.expiredDate


                    if ($scope.formData.price === undefined) {
                        if (todos.orderType === 'PLO') {
                            todos.price = todos.m1 * 1000;
                            data.createNormal(todos).then(function (result) {

                                if (result.result == "Order successfully") {
                                    alert("Đặt lệnh thành công");
                                    $scope.formData.command = "";
                                    $scope.formData.symbol = "";
                                    $scope.formData.quantity = "";
                                    $scope.formData.price = "";
                                    $scope.formData.orderType = "";
                                    $scope.formData.expiredDate = "";
                                    //$window.location.href = '/back';
                                } else {
                                    alert("Lỗi");
                                    $scope.formData.command = "";
                                    $scope.formData.symbol = "";
                                    $scope.formData.quantity = "";
                                    $scope.formData.price = "";
                                    $scope.formData.orderType = "";
                                    $scope.formData.expiredDate = "";
                                }
                            }, function (err) {
                                console.log(err);
                            })
                        } else {
                            todos.price = todos.ceM * 1000;
                            data.createNormal(todos).then(function (result) {

                                if (result.result == "Order successfully") {
                                    alert("Đặt lệnh thành công");
                                    $scope.formData.command = "";
                                    $scope.formData.symbol = "";
                                    $scope.formData.quantity = "";
                                    $scope.formData.price = "";
                                    $scope.formData.orderType = "";
                                    $scope.formData.expiredDate = "";
                                    //$window.location.href = '/back';
                                } else {
                                    alert("Lỗi");
                                    $scope.formData.command = "";
                                    $scope.formData.symbol = "";
                                    $scope.formData.quantity = "";
                                    $scope.formData.price = "";
                                    $scope.formData.orderType = "";
                                    $scope.formData.expiredDate = "";
                                }
                            }, function (err) {
                                console.log(err);
                            })
                        }
                    } else {

                        data.createNormal(todos).then(function (result) {


                            if (result.result == "Order successfully") {
                                alert("Đặt lệnh thành công");
                                $scope.formData.command = "";
                                $scope.formData.symbol = "";
                                $scope.formData.quantity = "";
                                $scope.formData.price = "";
                                $scope.formData.orderType = "";
                                $scope.formData.expiredDate = "";
                                // $window.location.href = '/back';
                            } else {
                                alert("Lỗi");
                                $scope.formData.command = "";
                                $scope.formData.symbol = "";
                                $scope.formData.quantity = "";
                                $scope.formData.price = "";
                                $scope.formData.orderType = "";
                                $scope.formData.expiredDate = "";
                            }
                        }, function (err) {
                            console.log(err);
                        })
                    }
                } else {
                    alert('Lệnh đã được hủy');
                }
            };

            vm.deleteTodo = function (todo) {
                var t = confirm('Bạn có chắc chắn muốn thực hiện');
                if (t === true) {
                    data.deletes(todo.orderid).then(function (result) {
                        alert('Bạn đã hủy thành công');
                        data.history().then(function (result) {

                            vm.history = result
                        })
                    }, function (err) {
                        console.log(err);
                    });
                } else {
                    alert('Lệnh đã được hủy');
                }
            }

            //-------Closed lenh-------------------
            vm.createNormalBan = function (todo) {
                var t = confirm('Bạn có chắc chắn muốn thực hiện');
                if (t === true) {
                    var request = {
                        execqtty: todo.execqtty,
                        closedqtty: todo.closedqtty,
                        oderid: todo.orderid,
                        price: 0,
                        symbol: todo.codeid,
                        orderType: todo.pricetype
                    }
                    console.log(request)
                    data.createNormalBan(request).then(function (result) {
                        data.history().then(function (result) {
                            // console.log(result)
                            vm.history = result
                        })
                    }, function (err) {
                        console.log(err)
                    }).catch(function (callback) {
                        console.log(callback);

                    })
                } else {
                    alert('Lệnh đã được hủy');
                }
            }

            $scope.date = new Date();
            $scope.$watch('date', function (date) {


                $scope.THAMSO_NGAY1 = new Date(dateFilter(moment(new Date(moment().toDate())).format('MM/DD/YYYY'), 'yyyy/MM/dd'));
                $scope.dateString = new Date(dateFilter(date, 'yyyy/MM/dd'));
            });
        }
    ])

