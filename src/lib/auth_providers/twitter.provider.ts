import {BaseSocialAuthProvider} from "./_base.provider";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";

export class TwitterAuthProvider extends BaseSocialAuthProvider {
  static authUrl: string = '';

  static load(config: {authUrl: string}) {
    TwitterAuthProvider.authUrl = config.authUrl;
  }

  auth() {
    let wnd = window.open(TwitterAuthProvider.authUrl)
    let sbj = new Subject();
    (<any>window).oauthResultSubject = sbj;
    sbj.subscribe((params) => {
      this.authObserver.next(params);
      this.authObserver.complete();
    });
  }


}
