angular.module('app').factory('request',
    [
        '$http', '$q', '$timeout','$window',
        function ($http, $q, $timeout, $window) {
            var methods = {
                get: get,
                post: post,
                put: put,
                deletes: deletes
            };
            function post(url, data, header) {
                var _defer = $q.defer();
                var req = {
                    method: 'POST',
                    url: url,
                    headers: {
                    },
                    data: data,
                    timeout: 30000
                };
                if (header != null) {
                    req.headers.Accept = 'application/json';
                }
                $http(req).then(function (data) {
                    console.log("ok",data);
                    _defer.resolve(data);
                }, function (err) {
                    console.log("ok",err);
                    _defer.resolve(err)
                });
                return _defer.promise;
            }

            function deletes(url,params) {
                var defer = $q.defer();
                var config = {
                    url: url,
                    method: 'DELETE',
                    timeout: 20000,
                    params: params
                }
                $http(config).then(function (data) {
                    console.log(data)
                    defer.resolve(data.data)
                    // if (data.data.error == 0) {
                    //     defer.resolve(data.data);
                    // } else {
                    // }

                }, function (err) {
                    console.log(err)

                });
                return defer.promise;
            }

            function put(url, data, header) {
                var _defer = $q.defer();
                var req = {
                    method: 'PUT',
                    url: url,
                    headers: {
                    },
                    data: data,
                    timeout: 30000
                };
                if (header != null) {
                    req.headers.Accept = 'application/json';
                }
                $http(req).then(function (data) {

                    _defer.resolve(data.data);
                }, function (err) {
                    console.log("ffff",err)
                    _defer.resolve(err);
                });
                return _defer.promise;
            }

            function get(url) {
                var defer = $q.defer();
                var config = {
                    url: url,
                    method: 'GET',
                    timeout: 20000
                }
                $http(config).then(function (data) {
                    console.log(data)
                    defer.resolve(data.data)
                    // if (data.data.error == 0) {
                    //     defer.resolve(data.data);
                    // } else {
                    // }

                }, function (err) {
                    console.log(err)

                });
                return defer.promise;
            }
            function get(url,params) {
                            var defer = $q.defer();
                            var config = {
                                url: url,
                                method: 'GET',
                                timeout: 20000,
                                params: params
                            }
                            $http(config).then(function (data) {
                                console.log(data)

                                    defer.resolve(data)
                                    // if (data.data.error == 0) {
                                    //     defer.resolve(data.data);
                                    // } else {
                                    // }


                            }, function (err) {

                                console.log(err)
                                defer.resolve(err)

                            });
                            return defer.promise;
                        }
            function deletes(url) {
                var defer = $q.defer();
                var config = {
                    url: url,
                    method: 'DELETE',
                    timeout: 20000
                }
                $http(config).then(function (data) {
                    console.log(data)
                    defer.resolve(data.data)
                    // if (data.data.error == 0) {
                    //     defer.resolve(data.data);
                    // } else {
                    // }

                }, function (err) {
                    defer.resolve({
                        msg: err
                    });
                });
                return defer.promise;
            }
            return methods;
        }
    ]
);
