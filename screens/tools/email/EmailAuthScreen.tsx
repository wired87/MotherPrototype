import React, {memo} from "react";
import UniversalServiceScreen from "../UniversalServiceScreen";

const EmailAuthScreen:React.FC = () => {






  return(
    <>
      <UniversalServiceScreen
        serviceUnLocked={false}
        serviceName={"Register for E-Mail support"}
        actionButton={() => {
          return <></>
        }}
        children={undefined}
        confirmClick={() => {}}
      />
    </>
  );
}


export default memo(EmailAuthScreen);