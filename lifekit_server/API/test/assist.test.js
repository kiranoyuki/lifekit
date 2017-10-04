var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var should = chai.should();

chai.use(chaiHttp);

describe("Test API related with assist", () => {
    describe("/POST create assist with wrong access token", () => {
        it("it should GET 404 status", (done) => {
            chai.request(server)
                .post("/assist/create?accesstoken=this_is_not_test_access_token")
                .send({"emergencyid": "1", "response": "1"})
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.have.property("result").eql("access token invalid");
                    done();
                });
        });
    });
    describe("/POST create assist with right access token", () => {
        it("it should GET 200 status", (done) => {
            chai.request(server)
                .post("/assist/create?accesstoken=this_is_test_access_token")
                .send({"emergencyid": "1", "response": "1"})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property("result").eql("Acknowledged");
                    done();
                });
        });
    });
    describe("/PUT add comment with wrong emergency id", () => {
        it("it should GET 400 status", (done) => {
            chai.request(server)
                .put("/assist/comment?accesstoken=this_is_test_access_token")
                .send({"emergencyid": "test", "comment": "this is test comment"})
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property("result").eql("nothing found");
                    done();
                });
        });
    });
    describe("/PUT add comment with right emergency id", () => {
        it("it should GET 200 status", (done) => {
            chai.request(server)
                .put("/assist/comment?accesstoken=this_is_test_access_token")
                .send({"emergencyid": "1", "comment": "this is test comment"})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property("result").eql("Comment recorded");
                    done();
                });
        });
    });
});

