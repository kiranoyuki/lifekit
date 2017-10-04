var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var should = chai.should();

chai.use(chaiHttp);

describe("Test API related with emergency", () => {
    describe("/POST create emergency with wrong access token", () => {
        it("it should GET 404 status", (done) => {
            chai.request(server)
                .post("/emergency/start?accesstoken=this_is_not_test_access_token")
                .send({"user_nickname": "test", "lat": "39.9566", "lng": 75.1899, "address": "3141 Chestnut St, Philadelphia, PA 19104"})
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.have.property("result").eql("access token invalid");
                    done();
                });
        });
    });
    describe("/POST create emergency with right access token", () => {
        it("it should GET 200 status", (done) => {
            chai.request(server)
                .post("/emergency/start?accesstoken=this_is_test_access_token")
                .send({"user_nickname": "test", "lat": "39.9566", "lng": 75.1899, "address": "3141 Chestnut St, Philadelphia, PA 19104"})
                .end((err, res) => {
                    res.should.have.status(200);
                    // res.body.should.have.property("result").eql("access token invalid");
                    done();
                });
        });
    });
    describe("/PUT end emergency with wrong emergencyid", () => {
        it("it should GET 200 status", (done) => {
            chai.request(server)
                .put("/emergency/end?accesstoken=this_is_test_access_token")
                .send({"emergencyid": "test"})
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property("result").eql("failed to find emergency or error from db");
                    done();
                });
        });
    });
 
    describe("/PUT end emergency with right emergencyid", () => {
        it("it should GET 200 status", (done) => {
            chai.request(server)
                .put("/emergency/end?accesstoken=this_is_test_access_token")
                .send({"emergencyid": "1"})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property("result").eql("updated emergency");
                    done();
                });
        });
    });
});

