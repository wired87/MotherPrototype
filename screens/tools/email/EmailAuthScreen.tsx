import React, {memo, useState} from "react";
import UniversalServiceScreen from "../UniversalServiceScreen";

const EmailAuthScreen:React.FC = () => {
  const [serviceUnlocked, setServiceUnLocked] = useState<boolean>(false);
  const unLockService = () => {};
  const lockService = () => {};
  return(
    <>
      <UniversalServiceScreen
        serviceUnLocked={false}
        serviceName={"Register for E-Mail support"}
        setServiceUnLocked={setServiceUnLocked}
        unLockService={unLockService}
        lockService={lockService}
      />
    </>
  );
}


export default memo(EmailAuthScreen);