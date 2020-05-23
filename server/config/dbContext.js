// Dependencies
var config = require('./config.js');
var mysql = require('mysql');
var q = require('q');   //https://www.npmjs.com/package/q

// Connection Pool
var pool = mysql.createPool({
    host            : config.host,
    user            : config.user,
    password        : config.password,
    database        : config.database,
    connectionLimit : config.connectionLimit,    
});

// Connection
var getConnection = function () {
    var defer = q.defer();
    pool.getConnection(function (err, connection) {
        if (err) defer.reject(err);
        else defer.resolve(new dbContext(connection));
    });
    return defer.promise;
}

// Data Access Layer
function dbContext(connection) {
    this.connection = connection;
}

dbContext.prototype.release = function () {
    this.connection.release();
}

dbContext.prototype.queryCommand = function (sql) {
    var defer = q.defer();
    this.connection.query(sql, function (error, rows) {
        if (error) defer.reject(error);
        else { defer.resolve(rows); }
    });
    return defer.promise;
}

dbContext.prototype.executeCommand = function (sql) {
    var defer = q.defer();
    this.connection.query(sql, function (error, result) {
        if (error) defer.reject(error);
        else defer.resolve(result);
    });
    return defer.promise;
}

dbContext.prototype.beginTransaction = function () {    
    if (!this.connection) throw new Error("Connection is closed");

    this.connection.beginTransaction(function (error) {
        if (error) throw error;
    });  
}

dbContext.prototype.rollbackTransaction = function () {        
    if (!this.connection) throw new Error("Connection is closed");

    this.connection.rollback(function (error) {
        if (error) throw error;        
    });
}

dbContext.prototype.commitTransaction = function () {
    if (!this.connection) throw new Error("Connection is closed");
    
    this.connection.commit(function (error) {
        if (error) throw error;
    });
}

// Export
module.exports = {
    getConnection: getConnection
};
