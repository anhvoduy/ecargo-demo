// Dependencies
var express = require('express');
var router = express.Router();
var dbContext = require('../config/dbContext');
var userService = require('../services/userService');

/* Response:
 * 200: OK
 * 201: Created
 * 301: Moved Permanently
 * 401: Unauthorized
 * 404: Not found
 * 500: Internal Server Error
 * */

// Router
router.get('/items', function (request, response) {
    var connection = {};
    var sql = 'SELECT UserId, UserType, UserName, Email, DateOfBirth, Deleted FROM tbluser WHERE deleted = 0 ORDER BY UserId DESC';
    
    dbContext.getConnection().then(function (result) {
        connection = result;
        return userService.getUsers(connection, sql);
    }).then(function (users) {
        response.json(users);
    }).catch(function (error) {
        response.status(500);
        response.json(error);
        next(error);
    }).done(function () {
        dbContext.release(connection);
    });
});

router.get('/items/:id', function (request, response) {
    var userid = request.params.id
    
    var connection = {};
    var sql = dbContext.prepareQueryCommand("SELECT UserId, UserType, UserName, Email, DateOfBirth, Deleted FROM tbluser WHERE userId = ?", [userid]);
    
    dbContext.getConnection().then(function (result) {
        connection = result;
        return userService.getUserById(connection, sql);
    }).then(function (user) {
        response.json(user);
    }).catch(function (error) {
        response.status(500);
        response.json(error);
        next(error);
    }).done(function () {
        dbContext.release(connection);
    });
});

// return Router
module.exports = router;
