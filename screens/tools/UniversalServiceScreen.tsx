import {Dispatch, memo, SetStateAction, useCallback, useContext, useState} from "react";
import {SafeAreaView, View} from "react-native";
import React from "react";
import {ScrollView} from "react-native-gesture-handler";
import {StyleProps} from "react-native-reanimated";
import {PrimaryContext, ThemeContext} from "../Context";
import {DefaultButton} from "../../components/buttons/DefaultButton";
import {uniStyles as us} from "../universalStyles";
import LockModal from "../../components/modals/LockModal";
import TextStream from "../../components/text/TextStream";
import {DefaultInput} from "../../components/input/DefaultInput";
import {useEmailAuth} from "../mother/ToolScreens/Hooks";
import {REGISTER_EMAIL_ACCOUNT} from "@env";
import {useSynonym} from "../../AppHooks/MotherHooks/EmailHooks";
import {LockObjectTypes, UniversalServiceScreenTypes, UnlockObjectTypes} from "../../AppInterfaces/MotherInterfaces";
import {lockServiceObject, unlockServiceObject} from "../../AppFunctions/GetObjectFunctions";

// STRINGS
const unLabel: string = "Service Username";
const pwLabel: string = "Service Password"
const unPlaceholder: string = "Email or Username";
const pwPlaceholder: string = "Your Service Password...";

// NUMBERS
const serviceInputLen:number = 100;


// BOOLS
// TODO
const serviceUnlocked:boolean = true;



const UniversalServiceScreen: React.FC<UniversalServiceScreenTypes> = (

  {
    serviceUnLocked,
    serviceName,
    setServiceUnLocked,
    unLockService,
    lockService,
  }

) => {

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [response, setResponse] = useState<string>("");

  const [passwordError, setPasswordError] = useState<string>("");
  const [userNameError, setUserNameError] = useState<string>("");
  const [requestError, setRequestError] = useState<string>("");

  const [animationVisible, setAnimationVisible] =
    useState<boolean>(false);

  const { synonym, setSynonym, updateSynonym } = useSynonym();

  const { setLoading, defaultPostRequest } = useContext(PrimaryContext);

  // STYLES
  const { customTheme } = useContext(ThemeContext);
  const standardContainer:StyleProps[]  = [
    us.justifyAlignCenter,
    us.fullScreenWidth,
    us.paddingH20,

  ];

  const backgroundColor:StyleProps  = {backgroundColor: customTheme.primary};
  const mainContainerStyles:StyleProps[]  = [us.scrollMain, us.paddingV50, backgroundColor, us.justifyAlignCenter];
  const carouselContainerStyles:StyleProps[] = [
    standardContainer,
    {
      marginVertical: 30,
    }
  ];

  const {
    serviceUserNameOrEmail, setServiceUserNameOrEmail,
    password, setPassword
  } = useEmailAuth();

  // STRINGS
  const buttonIcon:string = serviceUnLocked ? "lock-open-outline" : "lock-outline";
  const buttonText:string = serviceUnLocked ? "Lock Service" : "Unlock Service" ;
  const confirmText:string = serviceUnLocked ? "Service Successfully locked" : "Service Successfully unlocked" ;
  const modalHeadingText: string = serviceUnLocked ? `lock ${serviceName}` : `unlock ${serviceName}`;

  const { jwtToken } = useContext(PrimaryContext);

  const changeModalVisibility = useCallback(() => {
    setModalVisible(!modalVisible);
  }, [modalVisible]);


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
    setModalVisible(false);
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


  return(
    <SafeAreaView style={mainContainerStyles}>

        <View style={standardContainer}>
          <TextStream message={serviceName} />
        </View>

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

        <DefaultButton
          extraStyles={undefined}
          onPressAction={changeModalVisibility}
          text={buttonText}
          secondIcon={buttonIcon}
        />

        <LockModal
          changeModalVisibility={changeModalVisibility}
          modalVisible={modalVisible}
          headingText={modalHeadingText}
          icon={buttonIcon}
          handleConfirmationClick={handleConfirmationClick}
          buttonText={buttonText}
        />

    </SafeAreaView>
  );
}

export default memo(UniversalServiceScreen);