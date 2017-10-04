var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var should = chai.should();

chai.use(chaiHttp);

describe("Test API related with user", () => {
    describe("/GET user signup", () => {
        it("it should GET 200 status", (done) => {
            chai.request(server)
                .get("/user/signup?phone=0123456789")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property("result").eql("0000");
                    done();
                });
        });
    });

    describe("/GET user validate with invalide code", () => {
        it("it should GET 400 status and result is wrong code", (done) => {
            chai.request(server)
                .get("/user/validate?phone=0123456789&&code=1111")
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property("result").eql("Wrong code");
                    done();
                });
        });
    });
    describe("/GET user validate with valide code", () => {
        it("it should GET 200 status and result is refresh token", (done) => {
            chai.request(server)
                .get("/user/validate?phone=0123456789&&code=0000")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property("result").eql("this_is_test_refresh_token");
                    done();
                });
        });
    });

    describe("/GET user signin with invalide phone number", () => {
        it("it should GET 400 status and result is user not found", (done) => {
            chai.request(server)
                .get("/user/signin?phone=0000000000&&refreshtoken=this_is_test_refresh_token")
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property("result").eql("user not found");
                    done();
                });
        });
    });
    describe("/GET user signin with valide phone number and invalide refresh token", () => {
        it("it should GET 400 status and result is user not found", (done) => {
            chai.request(server)
                .get("/user/signin?phone=0123456789&&refreshtoken=this_is_not_test_refresh_token")
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property("result").eql("user not found");
                    done();
                });
        });
    });
    describe("/GET user signin with valide phone number and valide refresh token", () => {
        it("it should GET 200 status and result is access token", (done) => {
            chai.request(server)
                .get("/user/signin?phone=0123456789&&refreshtoken=this_is_test_refresh_token")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property("result").eql("this_is_test_access_token");
                    done();
                });
        });
    });
});

