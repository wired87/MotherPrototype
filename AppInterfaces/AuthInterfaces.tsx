


export interface UserEmailObject {
  outlook?: boolean;
  gmail?: boolean;

}
export interface GoogleServices {
  photos?: boolean;
  youtube?: boolean;
  calendar?: boolean;
  drive?: boolean;
  map?: boolean;
  gmail?: boolean;
  signedIn?: boolean;
  data?: boolean;
}

interface SocialMediaInterface {
  facebook?: boolean;
  instagram?: boolean;
  tiktok?: boolean;
}

interface MicroSoftInterface {
  outlook?: boolean
}

interface ServicesInterface {
  googleServices?: GoogleServices;
  steam?: boolean;
  socialMedia?: SocialMediaInterface;
  microsoft?: MicroSoftInterface;
}

interface FeedSpotInterface {
  microsoft?: boolean;
  google?: boolean;
  apple?: boolean;
  meta?: boolean;
}

export interface UserObjectInterface {
  uid?: string;
  email?: UserEmailObject;
  emailService?: boolean;
  services?: ServicesInterface;
  feedSpot?: FeedSpotInterface;
}





export interface JwtToken {
  access: string;
  refresh: string;
}


