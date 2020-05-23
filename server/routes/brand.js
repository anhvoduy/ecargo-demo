// Dependencies
var express = require('express');
var router = express.Router();
var dbContext = require('../config/dbContext');
var dbHelper = require('../config/dbHelper');
var brandService = require('../services/brandService');

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
    var ctx = {};
    dbContext.getConnection().then(function (result) {
        ctx = result;
        return brandService.getBrands(ctx);
    }).then(function (brands) {
        response.json(brands);
    }).catch(function (error) {
        response.status(500);
        response.json(dbHelper.getError(error));        
    }).finally(function () {
        ctx.release();
    });
});

router.get('/items/:id', function (request, response) {
    var brandId = request.params.id;

    var ctx = {};            
    dbContext.getConnection().then(function (result) {
        ctx = result;
        return brandService.getBrandById(ctx, brandId);
    }).then(function (brands) {
        if (brands.length === 0) {
            response.status(404);
            response.json(dbHelper.getError({ code: 'ERROR_BRAND', message: 'Brand Id does not existed.' }));
        } else {
            response.status(200);
            response.json(brands[0]);
        }        
    }).catch(function (error) {
        response.status(500);
        response.json(dbHelper.getError(error));
    }).finally(function () {
        ctx.release();
    });   
});

router.put('/update', function (request, response) {
    // validate data at server side
    var brand = {
        BrandId: request.body.BrandId,
        Name: request.body.Name,
        Description: request.body.Description
    };

    var ctx = {};
    dbContext.getConnection().then(function (result) {
        ctx = result;
        return ctx.beginTransaction();
    }).then(function () {
        return brandService.updateBrand(ctx, brand);
    }).then(function () {
        return ctx.commitTransaction();
    }).then(function () {
        response.status(200);
        response.json({ code: 'ERROR_BRAND', message: 'Brand Id does not existed.' });      
    }).then(function (result) {
        return brandService.getBrandById(ctx, brandId);
        response.status(200);
        response.json({ code: 'ERROR_BRAND', message: 'Brand Id does not existed.' });
    }).catch(function (error) {
        ctx.rollbackTransaction();

        response.status(500);
        response.json(dbHelper.getError(error));
    }).finally(function () {
        ctx.release();
    });
});

// return Router
module.exports = router;
