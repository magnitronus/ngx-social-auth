
import {ISocialAuthProvider} from "../interfaces";
import {Observer} from "rxjs/Observer";


export abstract class BaseSocialAuthProvider implements ISocialAuthProvider {

  constructor(protected authObserver: Observer<any>) { }

  static load(...args: any[]) {

  }

  auth() {
    throw "Please implement auth() method";
  }

}
