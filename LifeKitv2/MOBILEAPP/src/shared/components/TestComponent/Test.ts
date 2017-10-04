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

export class TestSuite{
  public tests:Test[] = [];
  public testSuiteName:String = "no name";
  constructor(testSuiteName:String){
    this.testSuiteName = testSuiteName;
  }
  addTest(testingFor:String, test:Promise<any>){
    this.tests.push(new Test(testingFor,test));
  }
  runAllTest(){
    this.tests.forEach(test=>{
      test.runTest();
    });
  }
}

export class Test{
  public TESTING_STATUS = {
    PENDING: 'PENDING',
    SUCCESS:'SUCCESS',
    FAILED: 'FAILED'
  };



  public status:String = this.TESTING_STATUS.PENDING;
  private test:Promise<any> = null;
  public testingForTitle:String = "no title";
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
  constructor(testingForBlank:String, test:Promise<any>){
    //takes the testingFor and creates the "Testing For: <your string>" to print ou
    //This prints out when the test is ran as the title and the status of the test.
    this.testingForTitle = "Testing For: " + testingForBlank;
    this.test = test;
  }

  runTest(){
    this.test.then(res=>{
      console.log(this.testingForTitle + 'testing has succeeded');
      this.status = this.TESTING_STATUS.SUCCESS;
    }).catch(error=>{
      console.log(this.testingForTitle + 'testing has failed');
      this.status = this.TESTING_STATUS.FAILED;
    });
  }
}
