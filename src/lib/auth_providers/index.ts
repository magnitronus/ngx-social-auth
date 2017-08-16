import {GoogleAuthProvider} from "./google.provider";
import {FacebookAuthProvider} from "./facebook.provider";
import {TwitterAuthProvider} from "./twitter.provider";
import {VkAuthProvider} from "./vk.provider";

function strEnum<T extends string>(o: Array<T>): {[K in T]: K} {
  return o.reduce((res, key) => {
    res[key] = key;
    return res;
  }, Object.create(null));
}

export const SOCIAL_AUTH_PROVIDERS = {
  google: GoogleAuthProvider,
  facebook: FacebookAuthProvider,
  twitter: TwitterAuthProvider,
  vk: VkAuthProvider
};

export const SocialAuthProvider = strEnum(Object.keys(SOCIAL_AUTH_PROVIDERS));

export type SocialAuthProvider = keyof typeof SocialAuthProvider;
