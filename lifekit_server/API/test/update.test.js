var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var should = chai.should();

chai.use(chaiHttp);

describe("Test API related with update", () => {
    describe("/POST update location with wrong access token", () => {
        it("it should GET 404 status", (done) => {
            chai.request(server)
                .post("/update/location?accesstoken=this_is_not_test_access_token")
                .send({lat: "123", lng: "456"})
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.have.property("result").eql("access token invalid");
                    done();
                });
        });
    });
    describe("/POST update location with right access token", () => {
        it("it should GET 200 status", (done) => {
            chai.request(server)
                .post("/update/location?accesstoken=this_is_test_access_token")
                .send({lat: "123", lng: "456"})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property("result").eql("updated location");
                    done();
                });
        });
    });
});

