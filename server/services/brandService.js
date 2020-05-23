// Dependencies
var mysql = require('mysql');
var q = require('q');

// Constructor
var brandService = function () { 
}

brandService.prototype.getBrands = function (dbContext) {
    var sql = 'SELECT BrandId, Name, Description FROM tblbrand WHERE deleted = 0 ORDER BY BrandId DESC';
    return dbContext.queryCommand(sql);
}

brandService.prototype.getBrandById = function (dbContext, brandId) {
    var sql = mysql.format('SELECT BrandId, Name, Description FROM tblbrand WHERE brandId = ?', [brandId]);
    return dbContext.queryCommand(sql);
}

brandService.prototype.updateBrand = function (dbContext, brand) {
    var sql = mysql.format('UPDATE tblbrand SET Name = ?, Description = ? WHERE BrandId = ?', [brand.Name, brand.Description, brand.BrandId]);
    return dbContext.executeCommand(sql);
}

// Export
module.exports = new brandService;
