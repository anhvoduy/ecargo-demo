﻿'use strict';
var expect  = require("chai").expect;
var supertest = require("supertest");
var server = 'http://localhost:3000';

describe("GET API: /api/product/", function () {
    var pageIndex = 0;
    it("Get List Products with Page Index = " + pageIndex, function (done) {
        supertest(server)
			.get("/api/product/itemspaging/" + pageIndex)
			.expect(200)
			.end(function (error, response) {
            
            if (error) {
                return done(error);
            }
            
            response.body.d.result.forEach(function (product) {
                expect(product).property('ProductId');
                expect(product).property('ProductName');
                expect(product).property('Description');
                expect(product).property('Price');
                expect(product).property('Colour');
                expect(product).property('Status');
                
                expect(product.ProductId).a('number');
                expect(product.ProductName).a('string');
                expect(product.Description).a('string');
                expect(product.Price).a('number');
                expect(product.Colour).a('string');
                expect(product.Status).a('string');
            });
            done();
        })
    });
    
    var productId = 2;
    it("Get Product with ProductId = " + productId, function (done) {
        supertest(server)
			.get("/api/product/items/" + productId)
			.expect(200)
			.end(function (error, response) {
            
            if (error) {
                return done(error);
            }
            
            var product = response.body.d.result;
            expect(product).property('ProductId');
            expect(product).property('ProductName');
            expect(product).property('Description');
            expect(product).property('BrandId');
            expect(product).property('BrandName');
            expect(product).property('Price');
            expect(product).property('Colour');
            expect(product).property('Status');
            
            expect(product.ProductId).a('number');
            expect(product.ProductName).a('string');
            expect(product.Description).a('string');
            expect(product.BrandId).a('number');
            expect(product.BrandName).a('string');
            expect(product.Price).a('number');
            expect(product.Colour).a('string');
            expect(product.Status).a('string');
            done();
        })
    });
});


describe("POST API: /api/review/", function () {
    var review = {
        Rating: 2,
        Comment: 'Test Rating 2xx - Product Id = 2',
        Created: '',
        ProductId: 2,
        Email: 'anhvod@hvn.com',						
    };
    // valid Email  :  anhvod@hvn.com
    // invalid Email:  anhvod@csc.com
    
    it('post /api/review/add', function (done) {
        supertest(server)
            .post("/api/review/add")
            .send(review)
            .expect(201)
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
