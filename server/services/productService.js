// Dependencies
var mysql = require('mysql');
var q = require('q');

// Constructor
var productService = function () { 
}

productService.prototype.getProductsPaging = function (connection, sql) {
    var defer = q.defer();
    connection.query(sql, function (error, rows) {
        if (error) defer.reject(error);
        else defer.resolve(rows[0]);
    });
    return defer.promise;
}

productService.prototype.getProductById = function (connection, sql) {
    var defer = q.defer();
    connection.query(sql, function (error, rows) {
        if (error) defer.reject(error);
        else defer.resolve(rows[0][0]);
    });
    return defer.promise;
}

productService.prototype.getProductsByBrand = function (dbContext, brandId) {
    var sql = mysql.format(
        "SELECT	prod.ProductId, prod.ProductName, prod.Description, " +
        "         prod.Price, prod.Colour, prod.Created, prod.Status, " +
        "         prod.BrandId, bra.Name AS BrandName,prod.LatestReviewInfo " +
        "FROM  tblproduct prod inner join tblbrand bra " +
        "WHERE bra.brandId = prod.brandId AND bra.brandId = ? " +
        "ORDER BY prod.ProductId DESC", [brandId])
    return dbContext.queryCommand(sql);
}

productService.prototype.createReview = function (connection, sql) {
    var defer = q.defer();
    connection.query(sql, function (error, rows) {
        if (error) defer.reject(error);
        else defer.resolve(rows);
    });
    return defer.promise;
}

productService.prototype.updateReview = function (connection, sql) {
    var defer = q.defer();
    connection.query(sql, function (error, rows) {
        if (error) defer.reject(error);
        else defer.resolve(rows);
    });
    return defer.promise;
}

// Export
module.exports = new productService;
