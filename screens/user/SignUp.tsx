import React from "react";

import {AuthUniversal} from "./AuthUniversal";

export const SignUp = (
    // @ts-ignore
    {navigation}
) => {

  return(
    <AuthUniversal
      navigation={navigation}
      googleAuthButtonAction={undefined} // change later to google auth signup
    />
  );
}

