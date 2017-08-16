import {BaseSocialAuthProvider} from "./_base.provider";

declare let VK: any;

export class VkAuthProvider extends BaseSocialAuthProvider {

  static load(config: {appId: string}) {
    let d = document, vkJs, id = 'vk-jssdk', ref: any = d.getElementsByTagName('script')[0];
    vkJs = d.createElement('script');
    vkJs.id = id;
    vkJs.async = true;
    vkJs.src = "//vk.com/js/api/openapi.js";

    vkJs.onload = function() {
      VK.init({
        apiId: config.appId
      });
    };

    ref.parentNode.insertBefore(vkJs, ref);
  }

  auth() {
    console.log(VK)
    VK.Auth.login((response: any) => {
      if(response.status === "connected"){
        this.authObserver.next({'token': response.session.sid});
        this.authObserver.complete();
      }
    }, 4194304);
  }

}
