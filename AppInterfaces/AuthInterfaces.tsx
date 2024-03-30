
export interface Crypto {

}

export interface Shopping {
  amazon?: boolean;
  ebay?: boolean;
}

export interface Travel {
  kiwiFlight?: boolean;
  bookingCom?: boolean;
  flixBus?: boolean; // https://www.flixbus.de/unternehmen/partner/affiliate-partner
}

export interface Payment {
  pyaPal?: boolean;
  klarna?: boolean;
  stripe?: boolean;
  transferWise?: boolean;
  venmo?: boolean;
  coinbaseCommerce?: boolean;
  adyen?: boolean;
}

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
  data?: string; // available, inProgress, failed, unset
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
  payment?: Payment;
  crypto?: Crypto;
  shopping?: Shopping;
  travel?: Travel;
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


