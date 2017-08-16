import { Injectable } from '@angular/core';
import {SOCIAL_AUTH_PROVIDERS, SocialAuthProvider} from "../auth_providers/index";
import {Observable} from "rxjs/Observable";

@Injectable()
export class SocialAuthService {

  constructor() { }

  auth(provider_name: SocialAuthProvider) {
    let provider = SOCIAL_AUTH_PROVIDERS[provider_name];
    return Observable.create((observer: any) => {
      (new provider(observer)).auth();
    });
  }



}
