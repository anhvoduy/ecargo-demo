// Dependencies
var mysql = require('mysql');
var q = require('q');

// Constructor
var userService = function () { 
}

userService.prototype.getUsers = function (connection, sql) {
    var defer = q.defer();
    connection.query(sql, function (error, rows) {
        if (error) defer.reject(error);
        else defer.resolve(rows);
    });
    return defer.promise;
}

userService.prototype.getUserById = function (connection, sql) {
    var defer = q.defer();
    connection.query(sql, function (error, rows) {
        if (error) defer.reject(error);
        else defer.resolve(rows[0]);
    });
    return defer.promise;       
}

userService.prototype.getUserByEmail = function (connection, sql) {
    var defer = q.defer();
    connection.query(sql, function (error, rows) {
        if (error) defer.reject(error);
        else defer.resolve(rows[0]);
    });
    return defer.promise;
}

// Export
module.exports = new userService;
