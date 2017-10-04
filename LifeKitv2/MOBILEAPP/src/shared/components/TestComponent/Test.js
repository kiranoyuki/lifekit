/**
 * Created by roy_f on 4/26/2017.
 */
//TEST SUITE{
// To make test suite:
// testSuite:TestSuite = new TestSuite()
//
// to add a new test:
// testSuite.add(<what are you testing for>, new Promise((resolve, reject)=>{
//    <your test function here> Call resolve when succeeded, Call reject when failed
// }));
//
// When the test succeeds, the test object's status member variable is marked success, otherwise it is marked
// failed or pending
// You can access the Test Array inside of the Test Suite to print out all the test or check their status
// }
"use strict";
var TestSuite = (function () {
    function TestSuite(testSuiteName) {
        this.tests = [];
        this.testSuiteName = "no name";
        this.testSuiteName = testSuiteName;
    }
    TestSuite.prototype.addTest = function (testingFor, test) {
        this.tests.push(new Test(testingFor, test));
    };
    TestSuite.prototype.runAllTest = function () {
        this.tests.forEach(function (test) {
            test.runTest();
        });
    };
    return TestSuite;
}());
exports.TestSuite = TestSuite;
var Test = (function () {
    //You don't use this though, you use the TEST SUITE, look above!
    //You give the test constructor a test you want to perform, if the test succeeds, you call resolve, otherwise
    //you call reject! Calling resolve initiates the then callback while calling reject initiates the
    //catch call back
    // Sample Implementation Below:
    //-----------------------------------------------------
    //Test = new Test(new Promise((resolve, reject)=>{
    //    //if Suceeded
    //      resolve();
    //    //if Failed
    //      reject();
    // }));
    //-----------------------------------------------------
    function Test(testingForBlank, test) {
        this.TESTING_STATUS = {
            PENDING: 'PENDING',
            SUCCESS: 'SUCCESS',
            FAILED: 'FAILED'
        };
        this.status = this.TESTING_STATUS.PENDING;
        this.test = null;
        this.testingForTitle = "no title";
        //takes the testingFor and creates the "Testing For: <your string>" to print ou
        //This prints out when the test is ran as the title and the status of the test.
        this.testingForTitle = "Testing For: " + testingForBlank;
        this.test = test;
    }
    Test.prototype.runTest = function () {
        var _this = this;
        this.test.then(function (res) {
            console.log(_this.testingForTitle + 'testing has succeeded');
            _this.status = _this.TESTING_STATUS.SUCCESS;
        }).catch(function (error) {
            console.log(_this.testingForTitle + 'testing has failed');
            _this.status = _this.TESTING_STATUS.FAILED;
        });
    };
    return Test;
}());
exports.Test = Test;
