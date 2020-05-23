// Dependencies
var mysql = require('mysql');
var q = require('q');

// Constructor
var dbHelper = function () { 
}

dbHelper.prototype.getError = function (error) {    
    var error = {
        code: error.code,
        message: error.message
    }
    return error;
}

// Export
module.exports = new dbHelper;
