import {memo, useCallback, useContext} from "react";
import {View} from "react-native";
import React from "react";
import {StyleProps} from "react-native-reanimated";
import {PrimaryContext, ThemeContext} from "../Context";
import {uniStyles as us} from "../universalStyles";
import TextStream from "../../components/text/TextStream";

import {UniversalServiceScreenTypes} from "../../AppInterfaces/MotherInterfaces";
import SwipeModal from "../../components/modals/SwipeModal";
import LockContent from "../../components/modals/LockContent";
import ToolIndicator from "../../components/indicators/ToolIndIcator";

const ModalConfirmLock: React.FC<UniversalServiceScreenTypes> = (

  {
    serviceUnLocked,
    serviceName,
    actionButton,
    children,
    confirmClick,
    statusChildren,
    sheetRef
  }

) => {
  // strings
  const streamAssets = useCallback(() => {
    if (serviceUnLocked) {
      return (
        <View style={standardContainer}>
          <TextStream message={`${serviceName} services are unlocked!`} icon={"lock-open"}/>
        </View>
      )
    }
    return(
      <View style={standardContainer}>
        <TextStream message={`Unlock ${serviceName} services!`} icon={"lock"}/>
      </View>
      )
  }, [serviceUnLocked])

  const closeSheet = () => {
    if (sheetRef?.current) {
      sheetRef?.current.close()
    }
  }

  // STYLES
  const { customTheme } = useContext(ThemeContext);
  const { loading, user } = useContext(PrimaryContext);
  const standardContainer:StyleProps[]  = [
    us.justifyAlignCenter,
    us.fullScreenWidth,
    us.paddingH20,
  ];

  const backgroundColor:StyleProps  = {backgroundColor: customTheme.primary};
  const mainContainerStyles:StyleProps[]  = [us.scrollMain, us.paddingV50, backgroundColor, us.justifyAlignCenter];
  const modalHeadingText:string = serviceUnLocked? `Lock ${serviceName} services?` : `Unlock ${serviceName} services?`


  const bottomSheet = useCallback(() => {
    if (sheetRef) {
      return(
        <SwipeModal
          bottomSheetRef={sheetRef}
          modalIndex={-1}
          Content={
            statusChildren? (
              statusChildren
            ) : loading? (
              <ToolIndicator />
            ):(
              <LockContent
                changeModalVisibility={closeSheet}
                headingText={modalHeadingText}
                handleConfirmationClick={confirmClick}/>
            )
          }
        />
      )
    }
  }, [sheetRef, statusChildren, loading, confirmClick, user, user?.services?.googleServices]);


  return(
    <View style={mainContainerStyles}>

      {
        streamAssets()
      }

      {
        children
      }

      <View>
        {
          actionButton()
        }
      </View>
      {
        bottomSheet()
      }
    </View>
  );
}

export default memo(ModalConfirmLock);


/*
 <DefaultInput
        onChangeAction={setServiceUserNameOrEmail}
        value={serviceUserNameOrEmail}
        placeholder={unPlaceholder}
        editable={serviceUnlocked}
        keyboardType={"email-address"}
        max_length={serviceInputLen}
        label={unLabel}
      />

      <DefaultInput
        placeholder={pwPlaceholder}
        editable={serviceUnlocked}
        keyboardType={"visible-password"}
        max_length={serviceInputLen}
        label={unLabel}
        onChangeAction={setPassword}
        value={password}
      />

      <DefaultInput
        placeholder={"Synonym"}
        editable={serviceUnlocked}
        keyboardType={"default"}
        max_length={serviceInputLen}
        label={unLabel}
        onChangeAction={setSynonym}
        value={synonym}
      />

      const checkInputValue = () => {
    if (password.trim().length === 0) {
      console.log("Password is not long enough...");
      setPasswordError("Please provide a valid Password...");
      return false
    }else if (serviceUserNameOrEmail.trim().length === 0) {
      console.log("Credentials are not long enough...");
      setUserNameError("Please provide valid credentials...");
      return false
    }else{
      return true
    }
  }

  const postRequest = async (sendObject:LockObjectTypes | UnlockObjectTypes) => {
    console.log("Send the credentials...");
    await defaultPostRequest(
      REGISTER_EMAIL_ACCOUNT,
      sendObject,
      setRequestError,
      setResponse,
  )
  };

  const sendRequest = async (infoObject: LockObjectTypes | UnlockObjectTypes) => {
    console.log("infoObject:", infoObject)
    if (infoObject["type"] === "unlock"){
      console.log("Try unlock service...")
      if (checkInputValue()) {
        await postRequest(infoObject);
      }
    } else {
      await postRequest(infoObject);
    }
  }

  const handleConfirmationClick = useCallback(async() => {
    setLoading(true);
    updateVisible();
    if (serviceUnLocked) {
      try {
        await sendRequest(lockServiceObject())
      }catch(e:unknown) {
        if(e instanceof Error) {
          console.log("Error occurred while try lock a Service:", e);
        }
      } finally {
        setLoading(false);
      }
    }else{
      try {
        await sendRequest(unlockServiceObject(serviceUserNameOrEmail, password, synonym))
      }catch(e:unknown) {
        if(e instanceof Error) {
          console.log("Error occurred while try unLock a Service:", e);
        }
      } finally {
        setLoading(false);
      }
    }
  }, [serviceUnLocked]);


  const animationHandler = useCallback(() => {
    const animationSource:string = serviceUnLocked ? "" : "";
    if (animationVisible){
      return(
          <></>
      );
    }else{
      return <></>
    }
  }, [animationVisible, serviceUnLocked]);
 */