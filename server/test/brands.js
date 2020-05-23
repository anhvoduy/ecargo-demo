﻿'use strict';
var expect  = require("chai").expect;
var supertest = require("supertest");
var server = 'http://localhost:3000';

describe("GET API: /api/brand/", function() {
    it("Get List Brands", function (done) {
        supertest(server)
			.get("/api/brand/items")
			.expect(200)
			.end(function (error, response) {
            
            if (error) {
                return done(error);
            }
            
            response.body.d.result.forEach(function (brand) {
                expect(brand).property('BrandId');
                expect(brand).property('Name');
                expect(brand).property('Description');
                
                expect(brand.BrandId).a('number');
                expect(brand.Name).a('string');
                expect(brand.Description).a('string');
            });
            done();
        })
    });
	
	var brandId = 10;
    it("Get Brand with BrandId = " + brandId, function (done) {
        supertest(server)
			.get("/api/brand/items/" + brandId)
			.expect(200)
			.end(function (error, response) {
            
            if (error) {
                return done(error);
            }
            
            var brand = response.body.d.result;
            expect(brand).property('BrandId');
            expect(brand).property('Name');
            expect(brand).property('Description');
            
            expect(brand.BrandId).a('number');
            expect(brand.Name).a('string');
            expect(brand.Description).a('string');
            done();
        })
    });
});

describe("PUT API: /api/brand/", function () {
    var brand = {
        BrandId: 10,
        Name: 'Brand 10xx',
        Description: 'Brand Level 10xx',					
    };
    it('PUT: update Brand with BrandId = 10', function (done) {
        supertest(server)
            .put("/api/brand/update")
            .send(brand)
            .expect(200)
            .end(function (error, response) {
            
            if (error) {
                return done(error);
            }
            
            var result = response.body.d.result;
            expect(result).property('affectedRows');
            expect(result).property('changedRows');
            
            expect(result.affectedRows).to.be.above(0);
            done();
        });
    });
});