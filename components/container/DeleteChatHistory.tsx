import {DefaultContainer} from "./DefaultContainer";
import React from "react";
import {AreYouSureContainer} from "./AreYouSureContainer";

// @ts-ignore
export const DeleteChatHistory = () => {
  return(
    <DefaultContainer
      extraStyles={undefined}>
      <AreYouSureContainer />
    </DefaultContainer>
  );
}