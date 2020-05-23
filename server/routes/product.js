// Dependencies
var express = require('express');
var router = express.Router();
var dbContext = require('../config/dbContext');
var dbHelper = require('../config/dbHelper');
var productService = require('../services/productService');

/* Response:
 * 200: OK
 * 201: Created
 * 301: Moved Permanently
 * 401: Unauthorized
 * 404: Not found
 * 500: Internal Server Error
 * */

// Router
router.get('/items/:id', function (request, response) {
    var productId = request.params.id;
        
    var ctx = {};
    var sql = dbContext.prepareQueryCommand("CALL sp_product_byid(?);", [productId]);
    
    dbContext.getConnection().then(function (result) {
        ctx = result;
        return productService.getProductById(ctx, sql);
    }).then(function (product) {
        response.json(product);
    }).catch(function (error) {
        response.status(500);
        response.json(dbHelper.getError(error));        
    }).done(function () {
        ctx.release();
    });
});

router.get('/itemspaging/:id', function (request, response) {
    var pageIndex = request.params.id;
    if (pageIndex == undefined) pageIndex = 0;
    
    var ctx = {};
    var sql = dbContext.prepareQueryCommand("CALL sp_product_paging(?);", [pageIndex]);

    dbContext.getConnection().then(function (result) {
        ctx = result;
        return productService.getProductsPaging(ctx, sql);
    }).then(function (products) {        
        response.json(products)        
    }).catch(function (error) {
        response.status(500);
        response.json(dbHelper.getError(error));        
    }).done(function () {
        ctx.release();
    });    
});

router.get('/itemsbrand/:id', function (request, response) {
    var brandId = request.params.id;
    
    var ctx = {};
    dbContext.getConnection().then(function (result) {
        ctx = result;
        return productService.getProductsByBrand(ctx, brandId);
    }).then(function (products) {
        response.json(products)
    }).catch(function (error) {
        response.status(500);        
        response.json(dbHelper.getError(error));        
    }).finally(function () {
        ctx.release();
    });    
});

// return Router
module.exports = router;