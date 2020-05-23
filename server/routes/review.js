// Dependencies
var express = require('express');
var router = express.Router();
var q = require('q');
var dbContext = require('../config/dbContext');
var productService = require('../services/productService');
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
router.post('/add', function (request, response) {
    // validate data at server side
    var review = {
        Rating: request.body.Rating,
        Comment: request.body.Comment,
        Created: new Date(),
        ProductId: request.body.ProductId,
        Email: request.body.Email
    }

    var connection = {};
    var sqlUser = dbContext.prepareQueryCommand("SELECT UserId, UserType, UserName, Email, DateOfBirth, Deleted FROM tbluser WHERE Email = ?", [review.Email]);
    var sqlCreateReview = dbContext.prepareQueryCommand("INSERT INTO tblreview(Rating, Comment, Created, ProductId, Email, Deleted)VALUES(?, ?, ?, ?, ?, 0)",
        [review.Rating, review.Comment, review.Created, review.ProductId, review.Email]);
    var sqlUpdateReview = '';

    q.when(dbContext.getConnection())
        .then(function (result) {
            connection = result;
            return userService.getUserByEmail(connection, sqlUser);
        }).then(function (user) {
            if (user) {
                review.UserName = user.UserName; // if User is existed: set UserName
                sqlUpdateReview = dbContext.prepareQueryCommand("UPDATE tblProduct SET LatestReviewInfo = ? WHERE ProductId = ?", [JSON.stringify(review), review.ProductId]);
                return dbContext.beginTransaction(connection);
            } else {
                throw { code: 'ERROR_EMAIL', message: 'Email does not existed.' };
            }
        }).then(function () {
            return productService.createReview(connection, sqlCreateReview);
        }).then(function () {
            return productService.updateReview(connection, sqlUpdateReview);
        }).then(function (result) {
            dbContext.commitTransaction(connection);

            response.status(201);
            response.json(result);
        }).catch(function (error) {
            dbContext.rollbackTransaction(connection);

            response.status(500);
            response.json(error);            
        }).done(function () {
            dbContext.release(connection);
        });
})

// return Router
module.exports = router;
