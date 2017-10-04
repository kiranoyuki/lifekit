/**
 * Created by roy_f on 4/26/2017.
 */
import {Component, Input} from "@angular/core";
import {TestSuite} from "./Test";
@Component({
  templateUrl:'TestComponent.html',
  selector:'TestComponent'
})

export class TestComponent{
  @Input() testSuite:TestSuite;
  constructor(){

  }
}
