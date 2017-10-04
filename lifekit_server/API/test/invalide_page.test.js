var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var should = chai.should();

chai.use(chaiHttp);

describe("Test invalide URL", () => {
    describe("/GET invalide page", () => {
        it("it should GET 404 status", (done) => {
            chai.request(server)
                .get("/invalide_url")
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });
});

