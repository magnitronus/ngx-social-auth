import {BaseSocialAuthProvider} from "./_base.provider";

declare let FB: any;

export class FacebookAuthProvider extends BaseSocialAuthProvider {

  static load(config: {appId: string, apiVersion: string}) {
    let d = document, fbJs, id = 'facebook-jssdk', ref: any = d.getElementsByTagName('script')[0];
    fbJs = d.createElement('script');
    fbJs.id = id;
    fbJs.async = true;
    fbJs.src = "//connect.facebook.net/en_US/sdk.js";

    fbJs.onload = function() {
      FB.init({
        appId: config.appId,
        status: true,
        cookie: true,
        xfbml: true,
        version: config.apiVersion
      });
    };

    ref.parentNode.insertBefore(fbJs, ref);
  }

  auth() {
    FB.login((response: any) => {
      if(response.status === "connected"){
        FB.api('/me?fields=name,email,picture', (res: any) => {
          if(!res || res.error){
            this.authObserver.error(res.error);
          }else{
            let userDetails = {
              name: res.name,
              email: res.email,
              uid: res.id,
              provider: "facebook",
              image: res.picture.data.url,
              token: response.authResponse.accessToken
            };
            this.authObserver.next(userDetails);
            this.authObserver.complete();
          }
        });
      }
    }, {scope: 'email', auth_type: "rerequest"});
  }

}
