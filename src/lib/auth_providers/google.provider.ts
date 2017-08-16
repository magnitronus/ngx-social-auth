import {BaseSocialAuthProvider} from "./_base.provider";

declare let gapi: any;

export class GoogleAuthProvider extends BaseSocialAuthProvider {

  gauth: any;

  static load(config: {clientId: string, scopes?: string[]}) {
    let d = document, gJs, ref: any = d.getElementsByTagName('script')[0];
    gJs = d.createElement('script');
    gJs.async = true;
    gJs.src = "//apis.google.com/js/platform.js";

    gJs.onload = function() {
      gapi.load('auth2', function() {
        gapi.auth2.init({
          client_id: config.clientId,
          scope: config.scopes.join(' ') || 'profile'
        })
      })
    };
    ref.parentNode.insertBefore(gJs, ref);
  }

  auth() {
    if (typeof(this.gauth) == "undefined"){
      this.gauth = gapi.auth2.getAuthInstance();
    }
    if(!this.gauth.isSignedIn.get()){
      this.gauth.signIn().then(() => {
        this.authObserver.next(this._fetchGoogleUserDetails());
        this.authObserver.complete();
      });
    }else{
      this.authObserver.next(this._fetchGoogleUserDetails());
      this.authObserver.complete();
    }
  }

  private _fetchGoogleUserDetails() {
    let currentUser = this.gauth.currentUser.get();
    let profile = currentUser.getBasicProfile();
    let idToken = currentUser.getAuthResponse().id_token;
    let accessToken = currentUser.getAuthResponse().access_token;
    return {
      token: accessToken,
      idToken: idToken,
      uid: profile.getId(),
      name: profile.getName(),
      email: profile.getEmail(),
      image: profile.getImageUrl(),
      provider: "google"
    };
  }

}
