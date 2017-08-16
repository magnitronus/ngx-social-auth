import { NgModule, ModuleWithProviders } from '@angular/core';
import {SocialAuthService} from "./services/social-auth.service";
import {SOCIAL_AUTH_PROVIDERS} from "./auth_providers/index";

import './auth_providers';

@NgModule({
})
export class SocialAuthModule {

  static forRoot(config: any): ModuleWithProviders {

    Object.keys(config).forEach((key) => {
      SOCIAL_AUTH_PROVIDERS[key].load(config[key]);
    });

    return {
      ngModule: SocialAuthModule,
      providers: [SocialAuthService],
    };
  }
}
